
import { Trade } from "../../types/trade";
import { useState } from "react";
import { Filters } from "../FilterDrawer";
import { TradesHeader } from "./TradesHeader";
import { TradesTable } from "./TradesTable";
import { sortTrades, filterTrades } from "../../utils/tradeUtils";

interface TradesSectionProps {
  trades: Trade[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const TradesSection = ({ trades, searchQuery, onSearchChange }: TradesSectionProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Trade | null;
    direction: "asc" | "desc";
  }>({ key: "lastTrade", direction: "asc" });

  const [filters, setFilters] = useState<Filters>({
    minFollowers: 0,
    maxFollowers: 1000000,
    minWinRate: 0,
    minTokens: 0,
    minTrades: 0,
    minPNL: 0,
  });

  const handleSort = (key: keyof Trade) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const sortedAndFilteredTrades = filterTrades(
    sortTrades(trades, sortConfig),
    searchQuery,
    filters
  );

  return (
    <>
      <TradesHeader
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onFiltersChange={handleFiltersChange}
      />
      <TradesTable
        trades={sortedAndFilteredTrades}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
    </>
  );
};

export default TradesSection;
