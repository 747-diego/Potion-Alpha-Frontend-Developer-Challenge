
import { Trade } from "../types/trade";

export const mockTrades: Trade[] = [
  {
    id: "1",
    tokenName: "Bonk",
    tokenSymbol: "BONK",
    tokenImage: "https://cryptologos.cc/logos/bonk-bonk-logo.png",
    lastTrade: "2 min ago",
    marketCap: "$234.5M",
    invested: {
      sol: 23.4,
      usd: 5382
    },
    realizedPNL: {
      sol: 12.3,
      usd: 2829,
      percentage: 52.6
    },
    roi: "+52.6%",
    trades: {
      won: 8,
      total: 12
    },
    holding: "1h 23m",
    avgBuy: {
      sol: 1.95,
      usd: 448.5
    },
    avgSell: {
      sol: 2.98,
      usd: 685.4
    }
  },
  {
    id: "2",
    tokenName: "Famous Fox Federation",
    tokenSymbol: "FFF",
    tokenImage: "https://arweave.net/E8hAJDNzHWrwFJ1UP4yOcQHHUqFKrmbg9c8FaAf9okA",
    lastTrade: "15 min ago",
    marketCap: "$45.2M",
    invested: {
      sol: 45.2,
      usd: 10396
    },
    realizedPNL: {
      sol: -5.3,
      usd: -1219,
      percentage: -11.7
    },
    roi: "-11.7%",
    trades: {
      won: 3,
      total: 5
    },
    holding: "45m",
    avgBuy: {
      sol: 9.04,
      usd: 2079.2
    },
    avgSell: {
      sol: 7.98,
      usd: 1835.4
    }
  },
  {
    id: "3",
    tokenName: "Mad Lads",
    tokenSymbol: "MLAD",
    tokenImage: "https://i.imgur.com/BoQY5Qb.png",
    lastTrade: "1h ago",
    marketCap: "$156.7M",
    invested: {
      sol: 89.6,
      usd: 20608
    },
    realizedPNL: {
      sol: 34.2,
      usd: 7866,
      percentage: 38.2
    },
    roi: "+38.2%",
    trades: {
      won: 15,
      total: 18
    },
    holding: "2h 15m",
    avgBuy: {
      sol: 4.98,
      usd: 1145.4
    },
    avgSell: {
      sol: 6.88,
      usd: 1582.4
    }
  }
];

