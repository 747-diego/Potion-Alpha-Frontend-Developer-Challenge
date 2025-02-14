
import { useState } from "react";
import Header from "../components/Header";
import { TimeFrame } from "../types/trader";
import { mockTraders } from "../data/mockTraders";
import { Search, ChevronDown, Share2, ExternalLink } from "lucide-react";

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
        <div className="flex items-start gap-8 mb-8">
          <div>
            <div className="flex gap-6 mb-6">
              <img 
                src={trader.profilePicture} 
                alt={trader.name} 
                className="w-24 h-24 rounded-full border-2 border-primary/20"
              />
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl font-bold mb-1">Orangie</h1>
                <span className="text-muted-foreground text-sm">
                  {trader.walletAddress}
                </span>
              </div>
            </div>
            <div className="grid gap-3">
              <div className="glass-card p-4 rounded-lg w-[320px]">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">X Account</span>
                  <div className="flex items-center gap-2">
                    <span>@orangie</span>
                    <span className="text-muted-foreground">279K followers</span>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4 rounded-lg w-[320px]">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last Trade</span>
                  <div className="flex items-center gap-2">
                    <span>30 min ago</span>
                    <ExternalLink className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Time Frame Tabs */}
        <div className="flex gap-2 mb-8">
          {(["daily", "weekly", "monthly", "all-time"] as TimeFrame[]).map(
            (frame) => (
              <button
                key={frame}
                onClick={() => setTimeFrame(frame)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  timeFrame === frame
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {frame.charAt(0).toUpperCase() + frame.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Tokens</span>
              <div className="flex items-center gap-2">
                <span>{stats.tokens}</span>
              </div>
            </div>
          </div>
          <div className="glass-card p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Win Rate</span>
              <span className="text-green-400">{stats.winRate}%</span>
            </div>
          </div>
          <div className="glass-card p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Trades</span>
              <div>
                <span className="text-green-400">{stats.trades.won}</span>
                <span className="text-muted-foreground mx-1">/</span>
                <span>{stats.trades.total}</span>
              </div>
            </div>
          </div>
          <div className="glass-card p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Invested</span>
              <span>{stats.totalInvested}</span>
            </div>
          </div>
          <div className="glass-card p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">ROI</span>
              <span className="text-green-400">{stats.roi}</span>
            </div>
          </div>
          <div className="glass-card p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Realized PNL</span>
              <div className="flex items-center gap-2">
                <span className="text-green-400">+{stats.realizedPNL.sol}</span>
                <img 
                  src="/lovable-uploads/bdddbcfe-82a1-4cb4-b201-9dab6f50d5a3.png" 
                  alt="SOL"
                  className="h-4 w-4"
                />
                <span className="text-muted-foreground">${stats.realizedPNL.usd}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trades Section */}
        <div className="glass-card rounded-lg overflow-hidden">
          <div className="p-4 border-b border-secondary flex items-center justify-between">
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-primary text-white rounded-full">
                Trades
              </button>
              <button className="px-4 py-2 text-muted-foreground hover:text-white transition-colors">
                Tokens
              </button>
              <button className="px-4 py-2 text-muted-foreground hover:text-white transition-colors">
                Groups
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by token or contract address"
                  className="w-[300px] bg-secondary/50 rounded-full py-2 pl-10 pr-4 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="p-2 hover:bg-secondary rounded-full transition-colors relative">
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] flex items-center justify-center">
                  2
                </div>
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Table header - we'll implement the full table in the next step */}
          <div className="p-4 text-sm text-muted-foreground">
            <div className="grid grid-cols-11 gap-4">
              <div>Token</div>
              <div>Last Trade</div>
              <div>MC</div>
              <div>Invested</div>
              <div>Realized PNL</div>
              <div>ROI</div>
              <div>Trades</div>
              <div>Holding</div>
              <div>Avg Buy</div>
              <div>Avg Sell</div>
              <div>Share</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
