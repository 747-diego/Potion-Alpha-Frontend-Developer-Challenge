
import { Trade } from "../types/trade";
import { TradeFilters } from "../components/profile/TradeFilterDrawer";

export const getTimeInMinutes = (timeString: string): number => {
  const minutes = parseInt(timeString.match(/\d+/)?.[0] || "0");
  if (timeString.includes("min")) return minutes;
  if (timeString.includes("h")) return minutes * 60;
  return minutes;
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
      const aTime = getTimeInMinutes(a.lastTrade);
      const bTime = getTimeInMinutes(b.lastTrade);
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
