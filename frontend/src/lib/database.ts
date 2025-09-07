// Browser-compatible database using localStorage
// This replaces the Node.js-specific better-sqlite3 implementation

interface User {
  id: number;
  email: string;
  password: string;
  type: 'seller' | 'influencer';
  created_at: string;
  updated_at: string;
}

interface Seller {
  id: number;
  user_id: number;
  business_name: string;
  product_category: string;
  phone?: string;
  website?: string;
  description?: string;
  wallet_address?: string;
}

interface Influencer {
  id: number;
  user_id: number;
  location: string;
  niche: string;
  bio?: string;
  wallet_address?: string;
  credibility_score: number;
}

interface SocialPlatform {
  id: number;
  influencer_id: number;
  platform: string;
  handle: string;
  followers: number;
}

// Helper functions for localStorage operations
const getFromStorage = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveToStorage = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

const generateId = (): number => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

// User management functions
export const userService = {
  // Create new user
  createUser: (email: string, password: string, type: 'seller' | 'influencer') => {
    const users = getFromStorage<User>('aptofluence_users');
    const newUser: User = {
      id: generateId(),
      email,
      password,
      type,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    users.push(newUser);
    saveToStorage('aptofluence_users', users);
    
    return { lastInsertRowid: newUser.id };
  },

  // Find user by email
  findUserByEmail: (email: string) => {
    const users = getFromStorage<User>('aptofluence_users');
    return users.find(user => user.email === email) || null;
  },

  // Authenticate user
  authenticateUser: (email: string, password: string) => {
    const users = getFromStorage<User>('aptofluence_users');
    return users.find(user => user.email === email && user.password === password) || null;
  },

  // Get user with profile data
  getUserWithProfile: (userId: number) => {
    const users = getFromStorage<User>('aptofluence_users');
    const user = users.find(u => u.id === userId);
    if (!user) return null;

    if (user.type === 'seller') {
      const sellers = getFromStorage<Seller>('aptofluence_sellers');
      const seller = sellers.find(s => s.user_id === userId);
      return { ...user, profile: seller };
    } else {
      const influencers = getFromStorage<Influencer>('aptofluence_influencers');
      const influencer = influencers.find(i => i.user_id === userId);
      const platforms = getFromStorage<SocialPlatform>('aptofluence_social_platforms');
      const userPlatforms = platforms.filter(p => p.influencer_id === influencer?.id);
      return { ...user, profile: influencer, platforms: userPlatforms };
    }
  }
};

// Seller management functions
export const sellerService = {
  createSeller: (userId: number, data: any) => {
    const sellers = getFromStorage<Seller>('aptofluence_sellers');
    const newSeller: Seller = {
      id: generateId(),
      user_id: userId,
      business_name: data.businessName,
      product_category: data.productCategory,
      phone: data.phone || undefined,
      website: data.website || undefined,
      description: data.description || undefined,
      wallet_address: data.walletAddress
    };
    
    sellers.push(newSeller);
    saveToStorage('aptofluence_sellers', sellers);
    
    return { lastInsertRowid: newSeller.id };
  },

  updateSeller: (userId: number, data: any) => {
    const sellers = getFromStorage<Seller>('aptofluence_sellers');
    const sellerIndex = sellers.findIndex(s => s.user_id === userId);
    
    if (sellerIndex === -1) return null;
    
    sellers[sellerIndex] = {
      ...sellers[sellerIndex],
      business_name: data.businessName,
      product_category: data.productCategory,
      phone: data.phone,
      website: data.website,
      description: data.description,
      wallet_address: data.walletAddress
    };
    
    saveToStorage('aptofluence_sellers', sellers);
    return { changes: 1 };
  }
};

// Influencer management functions
export const influencerService = {
  createInfluencer: (userId: number, data: any) => {
    const influencers = getFromStorage<Influencer>('aptofluence_influencers');
    const newInfluencer: Influencer = {
      id: generateId(),
      user_id: userId,
      location: data.location,
      niche: data.niche,
      bio: data.bio || 'Passionate content creator focused on engaging audiences with authentic and creative content.',
      wallet_address: data.walletAddress,
      credibility_score: Math.floor(Math.random() * 50) + 50 // Random score 50-100
    };
    
    influencers.push(newInfluencer);
    saveToStorage('aptofluence_influencers', influencers);
    
    // Add social platforms
    const platforms = getFromStorage<SocialPlatform>('aptofluence_social_platforms');
    
    Object.entries(data.socialHandles).forEach(([platform, handle]: [string, any]) => {
      if (handle.handle) {
        const newPlatform: SocialPlatform = {
          id: generateId(),
          influencer_id: newInfluencer.id,
          platform,
          handle: handle.handle,
          followers: parseInt(handle.followers) || 0
        };
        platforms.push(newPlatform);
      }
    });
    
    saveToStorage('aptofluence_social_platforms', platforms);
    
    return { lastInsertRowid: newInfluencer.id };
  },

  updateInfluencer: (userId: number, data: any) => {
    const influencers = getFromStorage<Influencer>('aptofluence_influencers');
    const influencerIndex = influencers.findIndex(i => i.user_id === userId);
    
    if (influencerIndex === -1) return null;
    
    const influencer = influencers[influencerIndex];
    
    influencers[influencerIndex] = {
      ...influencer,
      location: data.location,
      niche: data.niche,
      bio: data.bio,
      wallet_address: data.walletAddress
    };
    
    saveToStorage('aptofluence_influencers', influencers);
    
    // Update social platforms
    const platforms = getFromStorage<SocialPlatform>('aptofluence_social_platforms');
    const filteredPlatforms = platforms.filter(p => p.influencer_id !== influencer.id);
    
    Object.entries(data.socialHandles).forEach(([platform, handle]: [string, any]) => {
      if (handle.handle) {
        const newPlatform: SocialPlatform = {
          id: generateId(),
          influencer_id: influencer.id,
          platform,
          handle: handle.handle,
          followers: parseInt(handle.followers) || 0
        };
        filteredPlatforms.push(newPlatform);
      }
    });
    
    saveToStorage('aptofluence_social_platforms', filteredPlatforms);
    
    return { changes: 1 };
  }
};

export default null; // No database connection needed for localStorage implementation