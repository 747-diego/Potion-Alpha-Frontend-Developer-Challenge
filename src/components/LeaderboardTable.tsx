
import { Share2 } from "lucide-react";
import { Trader } from "../types/trader";
import { formatNumber, formatUSD, formatWalletAddress } from "../utils/format";
import { toast } from "sonner";

interface LeaderboardTableProps {
  traders: Trader[];
}

const LeaderboardTable = ({ traders }: LeaderboardTableProps) => {
  const copyWallet = (wallet: string) => {
    navigator.clipboard.writeText(wallet);
    toast.success("Wallet address copied to clipboard");
  };

  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <table>
        <thead>
          <tr className="border-b border-secondary">
            <th>Rank</th>
            <th>Trader</th>
            <th>Followers</th>
            <th>Tokens</th>
            <th>Win Rate</th>
            <th>Trades</th>
            <th>Avg Buy</th>
            <th>Avg Entry</th>
            <th>Avg Hold</th>
            <th>Realized PNL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {traders.map((trader) => (
            <tr key={trader.rank} className="animate-fade-in">
              <td>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-sm">
                  {trader.rank}
                </span>
              </td>
              <td>
                <div className="flex items-center gap-3">
                  <img
                    src={trader.profilePicture}
                    alt={trader.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{trader.name}</div>
                    <button
                      onClick={() => copyWallet(trader.walletAddress)}
                      className="text-muted-foreground hover:text-white text-sm transition-colors"
                    >
                      {formatWalletAddress(trader.walletAddress)}
                    </button>
                  </div>
                </div>
              </td>
              <td className="text-muted-foreground">
                <div className="flex flex-col">
                  <span>{formatNumber(trader.followers)}</span>
                  <span className="text-sm text-muted-foreground">
                    {trader.twitterHandle}
                  </span>
                </div>
              </td>
              <td>{trader.tokens}</td>
              <td>
                <span
                  className={`${
                    trader.winRate >= 50 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {trader.winRate}%
                </span>
              </td>
              <td>
                <span className="text-green-400">{trader.trades.won}</span>
                <span className="text-muted-foreground">/</span>
                <span>{trader.trades.total}</span>
              </td>
              <td>{formatUSD(trader.avgBuy)}</td>
              <td>{formatUSD(trader.avgEntry)}</td>
              <td>{trader.avgHold}</td>
              <td>
                <span
                  className={`${
                    trader.realizedPNL >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {trader.realizedPNL >= 0 ? "+" : "-"}
                  {formatUSD(Math.abs(trader.realizedPNL))}
                </span>
              </td>
              <td>
                <button className="p-2 rounded-full hover:bg-secondary transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
