
interface ProfileStatsProps {
  stats: {
    tokens: number;
    winRate: number;
    trades: { won: number; total: number };
    averageBuy: { sol: number; usd: number };
    averageEntry: string;
    averageHold: string;
    totalInvested: string;
    roi: string;
    realizedPNL: { sol: number; usd: number };
  };
}

const ProfileStats = ({ stats }: ProfileStatsProps) => {
  return (
    <div className="grid grid-cols-3 md:gap-4 gap-2 mt-auto max-md:grid-cols-1">
      <div className="space-y-2 md:space-y-4">
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
                <span className="text-lg">{stats.averageBuy.sol.toFixed(2)}</span>
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
                <span className="text-lg">100.20</span>
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
      </div>

      <div className="space-y-2 md:space-y-4">
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
      </div>

      <div className="space-y-2 md:space-y-4">
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
                <span className="text-lg text-green-400">+{stats.realizedPNL.sol.toFixed(2)}</span>
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
  );
};

export default ProfileStats;
