
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
import { Share2 } from "lucide-react";
import { Button } from "../components/ui/button";

const Profile = () => {
  const { id } = useParams();
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("daily");
  const [searchQuery, setSearchQuery] = useState("");
  
  const trader = mockTraders.find(t => t.walletAddress === id);

  if (!trader) {
    toast.error("Trader not found");
    return (
      <div className="min-h-screen bg-background p-4">
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

  const handleShare = () => {
    const tweetText = `Check out ${trader.name}'s trading profile! Win Rate: ${trader.winRate}% 🚀`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
    toast.success("Opening X/Twitter share dialog");
  };
  
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
    <div className="min-h-screen bg-background p-3 sm:p-4">
      <Header />
      <main className="max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8">
          <ProfileHeader trader={trader} />
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <TimeFrameSelector 
                selectedTimeFrame={timeFrame}
                onTimeFrameChange={setTimeFrame}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
            <ProfileStats stats={stats} />
          </div>
        </div>
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
