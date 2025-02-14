
export interface Trade {
  id: string;
  tokenName: string;
  tokenSymbol: string;
  tokenImage: string;
  contractAddress: string;
  lastTrade: string;
  marketCap: string;
  invested: {
    sol: number;
    usd: number;
  };
  realizedPNL: {
    sol: number;
    usd: number;
    percentage: number;
  };
  roi: string;
  trades: {
    won: number;
    total: number;
  };
  holding: string;
  avgBuy: {
    sol: number;
    usd: number;
  };
  avgSell: {
    sol: number;
    usd: number;
  };
}
