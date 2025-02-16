
import { Trade } from "../types/trade";
import { TradeFilters } from "../components/profile/TradeFilterDrawer";

export const getTimeInSeconds = (timeString: string): number => {
  const match = timeString.match(/(\d+)\s*(sec|min|h)/);
  if (!match) return 0;

  const value = parseInt(match[1]);
  const unit = match[2];

  if (unit === 'sec') return value;
  if (unit === 'min') return value * 60;
  if (unit === 'h') return value * 3600;
  return 0;
};

export const getTimeInMinutes = (timeString: string): number => {
  return Math.floor(getTimeInSeconds(timeString) / 60);
};

export const formatLastTradeTime = (timeString: string): string => {
  const seconds = getTimeInSeconds(timeString);
  
  if (seconds < 60) {
    return `${seconds} sec ago`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min ago`;
  } 
  
  const match = timeString.match(/(\d+)\s*(h)/);
  if (match) {
    return `${match[1]}h ago`;
  }
  
  return timeString;
};

export const sortTrades = (
  trades: Trade[], 
  sortConfig: { key: keyof Trade | null; direction: "asc" | "desc" }
): Trade[] => {
  return [...trades].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.key === "lastTrade") {
      const aTime = getTimeInSeconds(a.lastTrade);
      const bTime = getTimeInSeconds(b.lastTrade);
      return sortConfig.direction === "asc" ? aTime - bTime : bTime - aTime;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });
};

export const filterTrades = (
  trades: Trade[],
  searchQuery: string,
  filters: TradeFilters
): Trade[] => {
  return trades.filter((trade) => {
    const searchMatch = 
      trade.tokenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.contractAddress.toLowerCase().includes(searchQuery.toLowerCase());

    const winRate = (trade.trades.won / trade.trades.total) * 100;
    const pnlInUSD = trade.realizedPNL.usd;

    return (
      searchMatch &&
      winRate >= filters.minWinRate &&
      trade.trades.total >= filters.minTrades &&
      pnlInUSD >= filters.minPNL
    );
  });
};
