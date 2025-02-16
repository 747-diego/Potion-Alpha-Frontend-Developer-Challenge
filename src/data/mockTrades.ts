import { Trade } from "../types/trade";

const tokenInfo = [
  {
    name: "Bonk",
    symbol: "BONK",
    image: "https://cryptologos.cc/logos/bonk-bonk-logo.png",
    contract: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    marketCap: "$234.5M"
  },
  {
    name: "Jupiter",
    symbol: "JUP",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/25968.png",
    contract: "JUP6LkbvG1xHSM9c1cDoNw9tk2zsjK3NxMgks9uHu7L",
    marketCap: "$2.1B"
  },
  {
    name: "Famous Fox Federation",
    symbol: "FFF",
    image: "https://arweave.net/E8hAJDNzHWrwFJ1UP4yOcQHHUqFKrmbg9c8FaAf9okA",
    contract: "F4XFQyv94V7q7QVe7393Mm5SqmcjzkYQt7JoVJyJjZ4e",
    marketCap: "$45.2M"
  },
  {
    name: "Mad Lads",
    symbol: "MLAD",
    image: "https://i.imgur.com/BoQY5Qb.png",
    contract: "J3dE9idnyG7Jp6Vs5ydqe5z5Z9wWmR5wNeGyjt9iQWzk",
    marketCap: "$156.7M"
  },
  {
    name: "Tensor",
    symbol: "TNSR",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/28344.png",
    contract: "TNSR9hb3UeaGTff6tBqtbQW9piYGeuVMkyfhnbzfhYq",
    marketCap: "$89.3M"
  },
  {
    name: "Kamino",
    symbol: "KMNO",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/28355.png",
    contract: "KMNO5pYRkW47ogZ9E9HRDxvCbtvm8F5czn839RjFUNG",
    marketCap: "$42.8M"
  },
  {
    name: "Drift Protocol",
    symbol: "DRIFT",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/27966.png",
    contract: "DriftyQwertyUiop123456789DriftyQwertyU",
    marketCap: "$156.4M"
  },
  {
    name: "Marinade",
    symbol: "MNDE",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/11181.png",
    contract: "MNDEFzGvMt87ueuHvVU9VcTqsTmwZvrGVjTbaxJYNxE",
    marketCap: "$78.5M"
  },
  {
    name: "Step Finance",
    symbol: "STEP",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/9443.png",
    contract: "StepExrTAiQeC5o9G64PPCiJ9S4xGuRUp3rEUL4ymV",
    marketCap: "$12.3M"
  },
  {
    name: "Star Atlas",
    symbol: "ATLAS",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/11212.png",
    contract: "ATLASXmbPQxBUY6iVfWqxR1H4kK9oomjn3JkUEo3Ckx",
    marketCap: "$183.7M"
  },
  {
    name: "Render",
    symbol: "RNDR",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/7887.png",
    contract: "RNDRfgx98gsjKeqomojwYt1ZS9f6Xp8K6rbQEqap9uL",
    marketCap: "$3.2B"
  },
  {
    name: "Pyth Network",
    symbol: "PYTH",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/27974.png",
    contract: "HZ1JovE3q9MGvj3tNZDyjjvbzciViccbiwZojyEcnvG",
    marketCap: "$698.4M"
  },
  {
    name: "Raydium",
    symbol: "RAY",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/8526.png",
    contract: "4k3DyjSE6e8iLDzcD2Bw9iGeqLhoJ8P77x7QSBzEqsH",
    marketCap: "$245.6M"
  },
  {
    name: "Helium",
    symbol: "HNT",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/5665.png",
    contract: "hnT1y5X7hxUJpakZvDnrRYmBKWU4Lw8QWvf7ZJ1",
    marketCap: "$723.5M"
  },
  {
    name: "Parcl Protocol",
    symbol: "PARCL",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/23467.png",
    contract: "PARCLVWQpz8E4FHjbQapYVPooN5QopF8MQxLm8n5",
    marketCap: "$45.8M"
  },
  {
    name: "Solend",
    symbol: "SLND",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/14524.png",
    contract: "SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC8x7F",
    marketCap: "$132.7M"
  },
  {
    name: "DeFi Land",
    symbol: "DFL",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/14012.png",
    contract: "DFLv2SNbACdZkbHJz6E8MxiVtKCuJ7V6CKgZ8F",
    marketCap: "$28.4M"
  },
  {
    name: "Genopets",
    symbol: "GENE",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/14968.png",
    contract: "GENEtH8amKuYZaXzUWZuqkMW4JqJGnGqCk9K7E",
    marketCap: "$84.6M"
  },
  {
    name: "Orca",
    symbol: "ORCA",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/11165.png",
    contract: "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
    marketCap: "$156.9M"
  },
  {
    name: "Serum",
    symbol: "SRM",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/6187.png",
    contract: "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt",
    marketCap: "$245.3M"
  }
];

function generateMockTrade(id: string, tokenData: typeof tokenInfo[0]): Trade {
  const invested = {
    sol: Number((Math.random() * 100).toFixed(1)),
    usd: 0
  };
  invested.usd = Math.round(invested.sol * 230);

  const winRate = Math.random();
  const totalTrades = Math.floor(Math.random() * 15) + 5;
  const wonTrades = Math.floor(totalTrades * winRate);

  const pnlPercentage = Number((Math.random() * 100 - 30).toFixed(1));
  const realizedPNL = {
    sol: Number((invested.sol * pnlPercentage / 100).toFixed(1)),
    usd: Math.round(invested.sol * 230 * pnlPercentage / 100),
    percentage: pnlPercentage
  };

  const hours = Math.floor(Math.random() * 8);
  const minutes = Math.floor(Math.random() * 60);
  const holding = `${hours}h ${minutes}m`;

  const avgBuy = {
    sol: Number((invested.sol / totalTrades).toFixed(2)),
    usd: Math.round(invested.sol * 230 / totalTrades)
  };

  const avgSell = {
    sol: Number((invested.sol * (1 + pnlPercentage/100) / totalTrades).toFixed(2)),
    usd: Math.round(invested.sol * 230 * (1 + pnlPercentage/100) / totalTrades)
  };

  // Generate more realistic last trade times
  const now = new Date();
  const randomTimeAgo = Math.floor(Math.random() * 14400); // Random seconds up to 4 hours ago
  let lastTrade: string;
  
  if (randomTimeAgo < 60) {
    // Less than a minute ago
    lastTrade = `${randomTimeAgo} sec ago`;
  } else if (randomTimeAgo < 3600) {
    // Less than an hour ago
    const minutes = Math.floor(randomTimeAgo / 60);
    lastTrade = `${minutes} min ago`;
  } else {
    // Hours ago
    const hours = Math.floor(randomTimeAgo / 3600);
    lastTrade = `${hours}h ago`;
  }

  return {
    id,
    tokenName: tokenData.name,
    tokenSymbol: tokenData.symbol,
    tokenImage: tokenData.image,
    contractAddress: tokenData.contract,
    lastTrade,
    marketCap: tokenData.marketCap,
    invested,
    realizedPNL,
    roi: `${pnlPercentage > 0 ? '+' : ''}${pnlPercentage}%`,
    trades: {
      won: wonTrades,
      total: totalTrades
    },
    holding,
    avgBuy,
    avgSell
  };
}

export const mockTrades: Trade[] = tokenInfo.map((token, index) => 
  generateMockTrade(`${index + 1}`, token)
);
