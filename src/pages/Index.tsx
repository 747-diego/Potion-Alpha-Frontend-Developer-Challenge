
import { useState } from "react";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import LeaderboardTable from "../components/LeaderboardTable";
import { TimeFrame, ViewMode } from "../types/trader";
import { mockTraders } from "../data/mockTraders";

const Index = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("traders");
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("daily");

  return (
    <div className="min-h-screen bg-background p-6">
      <Header />
      <main className="max-w-[1400px] mx-auto">
        <FilterBar
          viewMode={viewMode}
          setViewMode={setViewMode}
          timeFrame={timeFrame}
          setTimeFrame={setTimeFrame}
        />
        <LeaderboardTable traders={mockTraders} />
      </main>
    </div>
  );
};

export default Index;
