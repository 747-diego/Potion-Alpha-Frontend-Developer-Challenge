
export interface Trader {
  rank: number;
  name: string;
  walletAddress: string;
  profilePicture: string;
  followers: number;
  tokens: number;
  winRate: number;
  trades: {
    won: number;
    total: number;
  };
  avgBuy: number;
  avgEntry: number;
  avgHold: string;
  realizedPNL: number;
}

export type TimeFrame = 'daily' | 'weekly' | 'monthly' | 'all-time';
export type ViewMode = 'traders' | 'groups';
