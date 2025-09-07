module contract_deployer::influencer_mkt {
    use std::signer;
    use std::vector;
    use aptos_std::string;
    use aptos_framework::timestamp;

    /// ---------- Error codes ----------
    const E_ALREADY_INIT: u64 = 1;
    const E_EMPTY_INFLUENCERS: u64 = 2;
    const E_CLOSED_DURING_SALE: u64 = 3;
    const E_NOT_FOUND_CAMPAIGN: u64 = 2000;
    const E_NOT_FOUND_CAMPAIGN_MUT: u64 = 2001;
    const E_NOT_FOUND_INFLUENCER: u64 = 1000;
    const E_NOT_ADMIN: u64 = 9000;
    const E_NOT_MERCHANT: u64 = 9001;
    const E_ALREADY_CLOSED: u64 = 9002;

    /// ---------- Influencers ----------
    struct Influencer has store, drop {
        owner: address,
        contact: string::String,      // telegram/email for demo
        category: string::String,     // Youtube/Instagram/TikTok/Twitter
        followers: u64,               // provided or oracle-fed
        location: string::String,
        base_price: u64,              // quoted off-chain
        credibility: u8,              // 0-100
        active: bool,
    }

    struct Registry has key, store {
        addrs: vector<address>,
        profiles: vector<Influencer>,
    }

    /// ---------- Campaigns ----------
    struct Campaign has store, drop {
        id: u64,
        merchant: address,
        title: string::String,
        description: string::String,
        image: string::String,
        kpi_target: u64,              // sales target (amount or count)
        window_secs: u64,             // time per influencer window
        base_fee: u64,                // base payout
        bonus_fee: u64,               // bonus if KPI met
        budget_hint: u64,             // UI hint (no on-chain enforcement)
        thresholds: vector<u64>,      // optional tiers (unused in logic here)
        influencers: vector<address>, // ranked list
        current_idx: u64,
        start_sec: u64,               // start of current window
        sales_per_influencer: vector<u64>,
        is_closed: bool,
    }

    struct Book has key, store {
        next_id: u64,
        campaigns: vector<Campaign>,
    }

    struct Global has key, store {
        reg: Registry,
        book: Book,
    }

    /// ---------- Utils ----------
    fun admin_assert(s: &signer) {
        assert!(signer::address_of(s) == @contract_deployer, E_NOT_ADMIN);
    }

    /// ---------- Init (no events) ----------
    public entry fun init(creator: &signer) {
        admin_assert(creator);
        let a = signer::address_of(creator);
        assert!(!exists<Global>(a), E_ALREADY_INIT);

        move_to(creator, Global{
            reg:  Registry{ addrs: vector::empty<address>(), profiles: vector::empty<Influencer>() },
            book: Book{ next_id: 0, campaigns: vector::empty<Campaign>() }
        });
    }

    /// ---------- Influencer registry (admin-only for hackathon) ----------
    public entry fun register_influencer(
        admin: &signer,
        influencer: address,
        contact: string::String,
        category: string::String,
        followers: u64,
        location: string::String,
        base_price: u64,
        credibility: u8
    ) acquires Global {
        admin_assert(admin);
        let g = borrow_global_mut<Global>(@contract_deployer);
        vector::push_back(&mut g.reg.addrs, influencer);
        vector::push_back(&mut g.reg.profiles, Influencer{
            owner: influencer, contact, category, followers, location, base_price, credibility, active: true
        });
    }

    public entry fun set_influencer_state(
        admin: &signer,
        influencer: address,
        active: bool,
        credibility: u8
    ) acquires Global {
        admin_assert(admin);
        let g = borrow_global_mut<Global>(@contract_deployer);
        let len = vector::length(&g.reg.addrs);
        let i = 0;
        while (i < len) {
            if (*vector::borrow(&g.reg.addrs, i) == influencer) {
                let prof = vector::borrow_mut(&mut g.reg.profiles, i);
                prof.active = active;
                prof.credibility = credibility;
                return
            };
            i = i + 1;
        };
        abort E_NOT_FOUND_INFLUENCER;
    }

    /// ---------- Campaign lifecycle ----------
    public entry fun create_campaign(
        admin: &signer,                 // admin-only for hackathon
        merchant: address,
        title: string::String,
        description: string::String,
        image: string::String,
        kpi_target: u64,
        window_secs: u64,
        base_fee: u64,
        bonus_fee: u64,
        budget_hint: u64,
        thresholds: vector<u64>,
        ranked_influencers: vector<address>
    ) acquires Global {
        admin_assert(admin);
        let g = borrow_global_mut<Global>(@contract_deployer);
        let id = g.book.next_id;
        g.book.next_id = id + 1;

        let n = vector::length(&ranked_influencers);
        assert!(n > 0, E_EMPTY_INFLUENCERS);
        let sales = empty_u64_vec(n);
        let now = timestamp::now_seconds();

        vector::push_back(&mut g.book.campaigns, Campaign{
            id, merchant, title, description, image,
            kpi_target, window_secs, base_fee, bonus_fee,
            budget_hint, thresholds, influencers: ranked_influencers,
            current_idx: 0, start_sec: now, sales_per_influencer: sales, is_closed: false
        });
    }

    /// Merchant/checkout server calls on each confirmed sale (attributed to current influencer)
    public entry fun record_sale(
        merchant_sig: &signer,
        campaign_id: u64,
        amount: u64
    ) acquires Global {
        let g = borrow_global_mut<Global>(@contract_deployer);
        let c = find_campaign_mut(&mut g.book.campaigns, campaign_id);
        assert!(!c.is_closed, E_CLOSED_DURING_SALE);
        assert!(signer::address_of(merchant_sig) == c.merchant, E_NOT_MERCHANT);

        let idx = c.current_idx;
        let prev = *vector::borrow(&c.sales_per_influencer, idx);
        *vector::borrow_mut(&mut c.sales_per_influencer, idx) = prev + amount;
    }

    /// Anyone can call; rotates after window if KPI underperforms.
    public entry fun evaluate_and_maybe_reassign(
        _caller: &signer,
        campaign_id: u64
    ) acquires Global {
        let g = borrow_global_mut<Global>(@contract_deployer);
        let c = find_campaign_mut(&mut g.book.campaigns, campaign_id);
        assert!(!c.is_closed, E_ALREADY_CLOSED);

        let now = timestamp::now_seconds();
        let elapsed = now - c.start_sec;
        let idx = c.current_idx;
        let sales = *vector::borrow(&c.sales_per_influencer, idx);
        let expected = proportional_target(c.kpi_target, elapsed, c.window_secs);

        if (elapsed >= c.window_secs && sales < expected) {
            let n = vector::length(&c.influencers);
            if (idx + 1 < n) {
                c.current_idx = idx + 1;
                c.start_sec = now;
            } else {
                c.is_closed = true;
            }
        }
    }

    /// Finalizes; calculate payout intent with bonus if KPI met. (Merchant or admin)
    public entry fun finalize_and_payout(
        caller: &signer,
        campaign_id: u64
    ) acquires Global {
        let g = borrow_global_mut<Global>(@contract_deployer);
        let c = find_campaign_mut(&mut g.book.campaigns, campaign_id);
        assert!(!c.is_closed, E_ALREADY_CLOSED);

        let caller_addr = signer::address_of(caller);
        assert!(caller_addr == c.merchant || caller_addr == @contract_deployer, E_NOT_MERCHANT);

        let idx = c.current_idx;
        let cur = *vector::borrow(&c.sales_per_influencer, idx);
        let _infl = *vector::borrow(&c.influencers, idx);
        let _final_amount =
            if (cur >= c.kpi_target) { c.base_fee + c.bonus_fee } else { c.base_fee };

        c.is_closed = true;
    }

    /// ---------- Helpers ----------
    fun empty_u64_vec(n: u64): vector<u64> {
        let v = vector::empty<u64>();
        let i = 0;
        while (i < n) { vector::push_back(&mut v, 0); i = i + 1; };
        v
    }

    fun current_influencer_addr(camps: &vector<Campaign>, id: u64): address {
        let c = find_campaign(camps, id);
        *vector::borrow(&c.influencers, c.current_idx)
    }

    fun proportional_target(total: u64, elapsed: u64, window: u64): u64 {
        if (elapsed >= window) { total } else { (total * elapsed) / window }
    }

    fun find_campaign(camps: &vector<Campaign>, id: u64): &Campaign {
        let n = vector::length(camps); let i = 0;
        while (i < n) {
            let c = vector::borrow(camps, i);
            if (c.id == id) return c;
            i = i + 1;
        };
        abort E_NOT_FOUND_CAMPAIGN
    }

    fun find_campaign_mut(camps: &mut vector<Campaign>, id: u64): &mut Campaign {
        let n = vector::length(camps); let i = 0;
        while (i < n) {
            let c = vector::borrow_mut(camps, i);
            if (c.id == id) return c;
            i = i + 1;
        };
        abort E_NOT_FOUND_CAMPAIGN_MUT
    }
}
