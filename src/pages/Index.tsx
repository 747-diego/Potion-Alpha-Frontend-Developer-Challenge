
import { useState } from "react";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import LeaderboardTable from "../components/LeaderboardTable";
import { TimeFrame, ViewMode } from "../types/trader";
import { mockTraders } from "../data/mockTraders";
import { Filters } from "../components/FilterDrawer";

const Index = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("traders");
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("daily");
  const [filters, setFilters] = useState<Filters>({
    minFollowers: 0,
    maxFollowers: 1000000,
    minWinRate: 0,
    minTokens: 0,
    minTrades: 0,
    minPNL: 0,
  });

  const filteredTraders = mockTraders.filter((trader) => {
    return (
      trader.followers >= filters.minFollowers &&
      trader.followers <= filters.maxFollowers &&
      trader.winRate >= filters.minWinRate &&
      trader.tokens >= filters.minTokens &&
      trader.trades.total >= filters.minTrades &&
      trader.realizedPNL >= filters.minPNL
    );
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <Header />
      <main className="max-w-[1400px] mx-auto">
        <FilterBar
          viewMode={viewMode}
          setViewMode={setViewMode}
          timeFrame={timeFrame}
          setTimeFrame={setTimeFrame}
          onFiltersChange={setFilters}
        />
        <LeaderboardTable traders={filteredTraders} />
      </main>
    </div>
  );
};

export default Index;
