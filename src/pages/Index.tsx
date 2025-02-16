
import { useState } from "react";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import LeaderboardTable from "../components/LeaderboardTable";
import { TimeFrame, ViewMode } from "../types/trader";
import { mockTraders } from "../data/mockTraders";
import { Filters } from "../components/FilterDrawer";
import { useWallet } from "../contexts/WalletContext";

const Index = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("traders");
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("daily");
  const [searchQuery, setSearchQuery] = useState("");
  const { showConnectModal, isConnected } = useWallet();
  const [filters, setFilters] = useState<Filters>({
    minFollowers: 0,
    maxFollowers: 1000000,
    minWinRate: 0,
    minTokens: 0,
    minTrades: 0,
    minPNL: 0,
  });

  const handleProtectedAction = (action: () => void) => {
    if (!isConnected) {
      showConnectModal();
      return;
    }
    action();
  };

  const filteredTraders = mockTraders.filter((trader) => {
    const matchesSearch = searchQuery
      ? trader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trader.walletAddress.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return (
      matchesSearch &&
      trader.followers >= filters.minFollowers &&
      trader.followers <= filters.maxFollowers &&
      trader.winRate >= filters.minWinRate &&
      trader.tokens >= filters.minTokens &&
      trader.trades.total >= filters.minTrades &&
      trader.realizedPNL >= filters.minPNL
    );
  });

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4">
      <Header />
      <main className="max-w-[1400px] mx-auto">
        <FilterBar
          viewMode={viewMode}
          setViewMode={(mode) => handleProtectedAction(() => setViewMode(mode))}
          timeFrame={timeFrame}
          setTimeFrame={(frame) => handleProtectedAction(() => setTimeFrame(frame))}
          onFiltersChange={(f) => handleProtectedAction(() => setFilters(f))}
          searchQuery={searchQuery}
          setSearchQuery={(query) => handleProtectedAction(() => setSearchQuery(query))}
          isWalletConnected={isConnected}
        />
        <LeaderboardTable 
          traders={filteredTraders} 
          isWalletConnected={isConnected}
          onProtectedAction={handleProtectedAction}
        />
      </main>
    </div>
  );
};

export default Index;
