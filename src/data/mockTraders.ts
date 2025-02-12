
import { Trader } from '../types/trader';

export const mockTraders: Trader[] = [
  {
    rank: 1,
    name: "Orangie",
    walletAddress: "6sdE9C...dD4Sca",
    profilePicture: "https://api.dicebear.com/7.x/pixel-art/svg?seed=1",
    followers: 279000,
    twitterHandle: "@orangie",
    tokens: 104,
    winRate: 74,
    trades: { won: 201, total: 321 },
    avgBuy: 2346,
    avgEntry: 212000,
    avgHold: "32m",
    realizedPNL: 23276
  },
  {
    rank: 2,
    name: "RandomGuy420",
    walletAddress: "3hF8P2...kL9Wqb",
    profilePicture: "https://api.dicebear.com/7.x/pixel-art/svg?seed=2",
    followers: 156000,
    twitterHandle: "@randomguy420",
    tokens: 89,
    winRate: 68,
    trades: { won: 178, total: 262 },
    avgBuy: 1892,
    avgEntry: 185000,
    avgHold: "45m",
    realizedPNL: 19845
  },
  {
    rank: 3,
    name: "CryptoWizard",
    walletAddress: "9nM4R7...pH2Vxc",
    profilePicture: "https://api.dicebear.com/7.x/pixel-art/svg?seed=3",
    followers: 98000,
    twitterHandle: "@cryptowizard",
    tokens: 67,
    winRate: 71,
    trades: { won: 156, total: 220 },
    avgBuy: 2103,
    avgEntry: 195000,
    avgHold: "28m",
    realizedPNL: 21567
  },
  {
    rank: 4,
    name: "TradeQueen",
    walletAddress: "5kL2J8...tN7Ymp",
    profilePicture: "https://api.dicebear.com/7.x/pixel-art/svg?seed=4",
    followers: 82000,
    twitterHandle: "@tradequeen",
    tokens: 45,
    winRate: 65,
    trades: { won: 124, total: 191 },
    avgBuy: 1756,
    avgEntry: 168000,
    avgHold: "39m",
    realizedPNL: 17234
  }
];
