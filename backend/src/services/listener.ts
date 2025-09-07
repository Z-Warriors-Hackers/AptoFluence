import { aptos, moduleAddr, moduleName } from "../aptos.js";
import { notify } from "./notifier.js";
import { payInfluencer, maybeTopupAlert } from "./treasury.js";

type Event = {
  guid: { creation_number: string; account_address: string };
  sequence_number: string;
  type: string;
  data: any;
};

let cursor: string | undefined;

export async function startListener() {
  setInterval(async () => {
    try {
      const events = await aptos.getEventsByEventHandle({
        accountAddress: moduleAddr,
        eventHandleStruct: `${moduleAddr}::${moduleName}::EventHandles`,
        fieldName: "payout_evt",
        options: {
          start: cursor ? Number(cursor) + 1 : 0,
          limit: 100,
        },
      }) as unknown as Event[];

      if (events.length > 0) {
        cursor = events.at(-1)!.sequence_number;
      }

      for (const e of events) {
        if (e.type.endsWith("::PayoutReleased")) {
          const { campaign_id, influencer, amount, reason } = e.data as any;
          await notify(
            `✅ Payout event: Campaign #${campaign_id} → ${influencer} amount=${amount} reason=${reason}`
          );
          await payInfluencer(influencer, BigInt(amount), Number(campaign_id), reason);
        }
      }

      await maybeTopupAlert();
    } catch (err) {
      console.error("Listener error", err);
    }
  }, 4000);
}
