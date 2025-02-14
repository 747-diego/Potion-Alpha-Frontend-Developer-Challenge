
import { useState } from "react";
import Header from "../components/Header";
import { TimeFrame } from "../types/trader";
import { mockTraders } from "../data/mockTraders";
import { Search, ChevronDown, Share2, ExternalLink } from "lucide-react";
import { formatWalletAddress, formatNumber, formatUSD } from "../utils/format";
import { mockTrades } from "../data/mockTrades";

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
          <div className="w-[320px] flex flex-col">
            <div className="flex gap-6 mb-8">
              <img 
                src={trader.profilePicture} 
                alt={trader.name} 
                className="w-28 h-28 rounded-full border-2 border-primary/20"
              />
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-bold mb-2">Orangie</h1>
                <span className="text-muted-foreground text-base">
                  {formatWalletAddress(trader.walletAddress)}
                </span>
              </div>
            </div>
            <div className="space-y-4 mt-auto">
              <div className="glass-card p-4 h-[76px] rounded-lg">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <span className="text-lg">X Account</span>
                    <span>@orangie</span>
                  </div>
                  <div className="flex justify-end mt-auto">
                    <span className="text-muted-foreground text-sm">279K followers</span>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4 h-[76px] rounded-lg">
                <div className="flex items-center justify-between h-full">
                  <span className="text-lg">Last Trade</span>
                  <div className="flex items-center gap-2">
                    <span>30 min ago</span>
                    <ExternalLink className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="flex-1 flex flex-col">
            {/* Time Frame Tabs */}
            <div className="flex gap-2 mb-8">
              {(["daily", "weekly", "monthly", "all-time"] as TimeFrame[]).map(
                (frame) => (
                  <button
                    key={frame}
                    onClick={() => setTimeFrame(frame)}
                    className={`px-6 py-3 rounded-xl transition-colors ${
                      timeFrame === frame
                        ? "bg-primary/20 text-white"
                        : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    {frame.charAt(0).toUpperCase() + frame.slice(1)}
                  </button>
                )
              )}
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-3 gap-4 mt-auto">
              <div className="glass-card p-4 h-[76px] rounded-lg">
                <div className="flex items-center justify-between h-full">
                  <span className="text-lg font-semibold">Tokens</span>
                  <div className="text-lg">{stats.tokens}</div>
                </div>
              </div>
              <div className="glass-card p-4 h-[76px] rounded-lg">
                <div className="flex items-center justify-between h-full">
                  <span className="text-lg font-semibold">Average Buy</span>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{stats.averageBuy.sol}</span>
                      <img 
                        src="/lovable-uploads/bdddbcfe-82a1-4cb4-b201-9dab6f50d5a3.png" 
                        alt="SOL"
                        className="h-4 w-4"
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">${stats.averageBuy.usd}</span>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4 h-[76px] rounded-lg">
                <div className="flex items-center justify-between h-full">
                  <span className="text-lg font-semibold">Total Invested</span>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">100.2</span>
                      <img 
                        src="/lovable-uploads/bdddbcfe-82a1-4cb4-b201-9dab6f50d5a3.png" 
                        alt="SOL"
                        className="h-4 w-4"
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{stats.totalInvested}</span>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4 h-[76px] rounded-lg">
                <div className="flex items-center justify-between h-full">
                  <span className="text-lg font-semibold">Win Rate</span>
                  <div className="text-lg text-green-400">{stats.winRate}%</div>
                </div>
              </div>
              <div className="glass-card p-4 h-[76px] rounded-lg">
                <div className="flex items-center justify-between h-full">
                  <span className="text-lg font-semibold">Average Entry</span>
                  <div className="text-lg">{stats.averageEntry}</div>
                </div>
              </div>
              <div className="glass-card p-4 h-[76px] rounded-lg">
                <div className="flex items-center justify-between h-full">
                  <span className="text-lg font-semibold">ROI</span>
                  <div className="text-lg text-green-400">{stats.roi}</div>
                </div>
              </div>
              <div className="glass-card p-4 h-[76px] rounded-lg">
                <div className="flex items-center justify-between h-full">
                  <span className="text-lg font-semibold">Trades</span>
                  <div className="text-lg">
                    <span className="text-green-400">{stats.trades.won}</span>
                    <span className="text-muted-foreground mx-1">/</span>
                    <span>{stats.trades.total}</span>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4 h-[76px] rounded-lg">
                <div className="flex items-center justify-between h-full">
                  <span className="text-lg font-semibold">Average Hold</span>
                  <div className="text-lg">{stats.averageHold}</div>
                </div>
              </div>
              <div className="glass-card p-4 h-[76px] rounded-lg">
                <div className="flex items-center justify-between h-full">
                  <span className="text-lg font-semibold">Realized PNL</span>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-green-400">+{stats.realizedPNL.sol}</span>
                      <img 
                        src="/lovable-uploads/bdddbcfe-82a1-4cb4-b201-9dab6f50d5a3.png" 
                        alt="SOL"
                        className="h-4 w-4"
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">${stats.realizedPNL.usd}</span>
                  </div>
                </div>
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

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-sm text-muted-foreground border-b border-secondary">
                  <th className="p-4 text-left">Token</th>
                  <th className="p-4 text-left">Last Trade</th>
                  <th className="p-4 text-left">MC</th>
                  <th className="p-4 text-left">Invested</th>
                  <th className="p-4 text-left">Realized PNL</th>
                  <th className="p-4 text-left">ROI</th>
                  <th className="p-4 text-left">Trades</th>
                  <th className="p-4 text-left">Holding</th>
                  <th className="p-4 text-left">Avg Buy</th>
                  <th className="p-4 text-left">Avg Sell</th>
                  <th className="p-4 text-left">Share</th>
                </tr>
              </thead>
              <tbody>
                {mockTrades.map((trade) => (
                  <tr key={trade.id} className="border-b border-secondary">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={trade.tokenImage}
                          alt={trade.tokenName}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="font-medium">{trade.tokenName}</div>
                          <div className="text-sm text-muted-foreground">
                            {trade.tokenSymbol}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{trade.lastTrade}</td>
                    <td className="p-4 text-muted-foreground">{trade.marketCap}</td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span>{trade.invested.sol}</span>
                          <img
                            src="/lovable-uploads/bdddbcfe-82a1-4cb4-b201-9dab6f50d5a3.png"
                            alt="SOL"
                            className="h-4 w-4"
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ${formatNumber(trade.invested.usd)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className={trade.realizedPNL.percentage >= 0 ? "text-green-400" : "text-red-400"}>
                            {trade.realizedPNL.percentage >= 0 ? "+" : ""}{trade.realizedPNL.sol}
                          </span>
                          <img
                            src="/lovable-uploads/bdddbcfe-82a1-4cb4-b201-9dab6f50d5a3.png"
                            alt="SOL"
                            className="h-4 w-4"
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ${formatNumber(trade.realizedPNL.usd)}
                        </span>
                      </div>
                    </td>
                    <td className={`p-4 ${trade.realizedPNL.percentage >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {trade.roi}
                    </td>
                    <td className="p-4">
                      <span className="text-green-400">{trade.trades.won}</span>
                      <span className="text-muted-foreground mx-1">/</span>
                      <span>{trade.trades.total}</span>
                    </td>
                    <td className="p-4 text-muted-foreground">{trade.holding}</td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span>{trade.avgBuy.sol}</span>
                          <img
                            src="/lovable-uploads/bdddbcfe-82a1-4cb4-b201-9dab6f50d5a3.png"
                            alt="SOL"
                            className="h-4 w-4"
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ${formatNumber(trade.avgBuy.usd)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span>{trade.avgSell.sol}</span>
                          <img
                            src="/lovable-uploads/bdddbcfe-82a1-4cb4-b201-9dab6f50d5a3.png"
                            alt="SOL"
                            className="h-4 w-4"
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ${formatNumber(trade.avgSell.usd)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <button className="p-2 hover:bg-secondary rounded-full transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;

