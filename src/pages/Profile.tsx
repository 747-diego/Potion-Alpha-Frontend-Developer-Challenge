
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { TimeFrame } from "../types/trader";
import { mockTraders } from "../data/mockTraders";
import { mockTrades } from "../data/mockTrades";
import ProfileHeader from "../components/profile/ProfileHeader";
import TimeFrameSelector from "../components/profile/TimeFrameSelector";
import ProfileStats from "../components/profile/ProfileStats";
import TradesSection from "../components/profile/TradesSection";
import { toast } from "sonner";

const Profile = () => {
  const { id } = useParams(); // Get the wallet address from URL
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("daily");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Find the trader by their wallet address
  const trader = mockTraders.find(t => t.walletAddress === id);

  // If trader not found, show error
  if (!trader) {
    toast.error("Trader not found");
    return (
      <div className="min-h-screen bg-background p-6">
        <Header />
        <main className="max-w-[1400px] mx-auto">
          <div className="text-center mt-20">
            <h1 className="text-2xl font-bold mb-4">Trader not found</h1>
            <p className="text-muted-foreground">The trader you're looking for doesn't exist.</p>
          </div>
        </main>
      </div>
    );
  }
  
  // Mock data for the statistics based on the current trader
  const stats = {
    tokens: trader.tokens,
    winRate: trader.winRate,
    trades: trader.trades,
    averageBuy: { sol: trader.avgBuy / 230, usd: trader.avgBuy },
    averageEntry: `$${trader.avgEntry.toLocaleString()}`,
    averageHold: trader.avgHold,
    totalInvested: `$${(trader.avgBuy * trader.trades.total).toLocaleString()}`,
    roi: `+${((trader.realizedPNL / (trader.avgBuy * trader.trades.total)) * 100).toFixed(0)}%`,
    realizedPNL: { 
      sol: trader.realizedPNL / 230,
      usd: trader.realizedPNL
    }
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

