
import { useState } from "react";
import Header from "../components/Header";
import { TimeFrame } from "../types/trader";
import { mockTraders } from "../data/mockTraders";
import { mockTrades } from "../data/mockTrades";
import ProfileHeader from "../components/profile/ProfileHeader";
import TimeFrameSelector from "../components/profile/TimeFrameSelector";
import ProfileStats from "../components/profile/ProfileStats";
import TradesSection from "../components/profile/TradesSection";

const Profile = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("daily");
  const [searchQuery, setSearchQuery] = useState("");
  
  // For demo purposes, we'll use the first trader as the profile
  const trader = mockTraders[0];
  
  // Mock data for the statistics
  const stats = {
    tokens: 104,
    winRate: 74,
    trades: { won: 201, total: 321 },
    averageBuy: { sol: 10.2, usd: 2346 },
    averageEntry: "$212K",
    averageHold: "32m",
    totalInvested: "$23,460",
    roi: "+304%",
    realizedPNL: { sol: 301.3, usd: 69420 }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <Header />
      <main className="max-w-[1400px] mx-auto">
        {/* Profile Overview Section */}
        <div className="flex gap-8 mb-8">
          {/* Left Column - Profile Info */}
          <ProfileHeader trader={trader} />

          {/* Right Column - Stats */}
          <div className="flex-1 flex flex-col">
            <TimeFrameSelector 
              selectedTimeFrame={timeFrame}
              onTimeFrameChange={setTimeFrame}
            />
            <ProfileStats stats={stats} />
          </div>
        </div>

        {/* Trades Section */}
        <TradesSection 
          trades={mockTrades}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </main>
    </div>
  );
};

export default Profile;
