
import { Share2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Trader } from "../types/trader";
import { formatNumber, formatUSD, formatWalletAddress } from "../utils/format";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface LeaderboardTableProps {
  traders: Trader[];
  isWalletConnected: boolean;
  onProtectedAction: (action: () => void) => void;
}

type SortField = keyof Pick<
  Trader,
  | "rank"
  | "name"
  | "followers"
  | "tokens"
  | "winRate"
  | "avgBuy"
  | "avgEntry"
  | "avgHold"
  | "realizedPNL"
> | "trades";

const LeaderboardTable = ({ traders, isWalletConnected, onProtectedAction }: LeaderboardTableProps) => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const isMobile = useIsMobile();

  const copyWallet = (e: React.MouseEvent, wallet: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(wallet);
    toast.success("Wallet address copied to clipboard");
  };

  const navigateToProfile = (traderId: string) => {
    onProtectedAction(() => {
      navigate(`/profile/${traderId}`);
    });
  };

  const handleSort = (field: SortField) => {
    onProtectedAction(() => {
      if (sortField === field) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        setSortDirection("asc");
      }
    });
  };

  const formatEntryValue = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value.toString();
  };

  const formatMobileName = (name: string) => {
    if (isMobile && name.length > 5) {
      return name.slice(0, 5);
    }
    return name;
  };

  const TableHeader = ({
    children,
    field,
  }: {
    children: React.ReactNode;
    field?: SortField;
  }) => (
    <div
      className={`flex items-center gap-1 ${
        field ? "cursor-pointer hover:text-white" : ""
      } transition-colors whitespace-nowrap`}
      onClick={() => field && handleSort(field)}
    >
      <span>{children}</span>
      {field && (
        <>
          {sortField === field ? (
            sortDirection === "asc" ? (
              <ChevronUp className="h-4 w-4 text-primary" />
            ) : (
              <ChevronDown className="h-4 w-4 text-primary" />
            )
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </>
      )}
    </div>
  );

  const handleShare = (e: React.MouseEvent, trader: Trader) => {
    e.stopPropagation();
    onProtectedAction(() => {
      const tweetText = `Check out ${trader.name}'s trading profile! Win Rate: ${trader.winRate}% 🚀`;
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
      window.open(tweetUrl, '_blank');
      toast.success("Opening X/Twitter share dialog");
    });
  };

  const SOL_PRICE = 100;

  const sortedTraders = [...traders].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "avgHold":
        const getMinutes = (time: string) => {
          const value = parseInt(time);
          return time.includes("h") ? value * 60 : value;
        };
        comparison = getMinutes(a.avgHold) - getMinutes(b.avgHold);
        break;
      case "trades":
        comparison = a.trades.total - b.trades.total;
        break;
      default:
        comparison = (a[sortField] as number) - (b[sortField] as number);
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-secondary">
              <th className="sticky left-0 bg-background/80 backdrop-blur-sm z-10">
                <TableHeader field="rank">Rank</TableHeader>
              </th>
              <th className="sticky left-[64px] bg-background/80 backdrop-blur-sm z-10">
                <TableHeader field="name">Trader</TableHeader>
              </th>
              <th>
                <TableHeader field="followers">Followers</TableHeader>
              </th>
              <th>
                <TableHeader field="tokens">Tokens</TableHeader>
              </th>
              <th>
                <TableHeader field="winRate">Win Rate</TableHeader>
              </th>
              <th>
                <TableHeader field="trades">Trades</TableHeader>
              </th>
              <th>
                <TableHeader field="avgBuy">Avg Buy</TableHeader>
              </th>
              <th>
                <TableHeader field="avgEntry">Avg Entry</TableHeader>
              </th>
              <th>
                <TableHeader field="avgHold">Avg Hold</TableHeader>
              </th>
              <th>
                <TableHeader field="realizedPNL">Realized PNL</TableHeader>
              </th>
              <th>Share</th>
            </tr>
          </thead>
          <tbody>
            {sortedTraders.map((trader) => (
              <tr key={trader.rank} className="animate-fade-in">
                <td className="sticky left-0 bg-background/80 backdrop-blur-sm z-10">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-sm">
                    {trader.rank}
                  </span>
                </td>
                <td className="sticky left-[64px] bg-background/80 backdrop-blur-sm z-10">
                  <div className="flex items-center gap-3">
                    <img
                      src={trader.profilePicture}
                      alt={trader.name}
                      className="w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                      onClick={() => navigateToProfile(trader.walletAddress)}
                    />
                    <div>
                      <div 
                        className="font-medium cursor-pointer hover:text-primary transition-colors whitespace-nowrap"
                        onClick={() => navigateToProfile(trader.walletAddress)}
                      >
                        {formatMobileName(trader.name)}
                      </div>
                      <button
                        onClick={(e) => copyWallet(e, trader.walletAddress)}
                        className="text-muted-foreground hover:text-white text-sm transition-colors"
                      >
                        {formatWalletAddress(trader.walletAddress, isMobile)}
                      </button>
                    </div>
                  </div>
                </td>
                <td className="text-muted-foreground whitespace-nowrap">
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
                <td className="whitespace-nowrap">
                  <span className="text-green-400">{trader.trades.won}</span>
                  <span className="text-muted-foreground">/</span>
                  <span>{trader.trades.total}</span>
                </td>
                <td>
                  <div className="flex flex-col gap-1 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-[#14F195]">
                      <span>{(trader.avgBuy / SOL_PRICE).toFixed(1)}</span>
                      <img 
                        src="/lovable-uploads/bdddbcfe-82a1-4cb4-b201-9dab6f50d5a3.png" 
                        alt="SOL"
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="text-muted-foreground">
                      {formatUSD(trader.avgBuy)}
                    </div>
                  </div>
                </td>
                <td>{formatEntryValue(trader.avgEntry)}</td>
                <td>{trader.avgHold}</td>
                <td>
                  <div className="flex flex-col gap-1 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span className={`${
                        trader.realizedPNL >= 0 ? "text-green-400" : "text-red-400"
                      }`}>
                        {trader.realizedPNL >= 0 ? "+" : "-"}
                        {(Math.abs(trader.realizedPNL) / SOL_PRICE).toFixed(1)}
                      </span>
                      <img 
                        src="/lovable-uploads/bdddbcfe-82a1-4cb4-b201-9dab6f50d5a3.png" 
                        alt="SOL"
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="text-muted-foreground">
                      {trader.realizedPNL >= 0 ? "+" : "-"}
                      {formatUSD(Math.abs(trader.realizedPNL))}
                    </div>
                  </div>
                </td>
                <td>
                  <button 
                    className="p-2 rounded-full hover:bg-secondary transition-colors"
                    onClick={(e) => handleShare(e, trader)}
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isMobile && (
        <div className="text-center text-sm text-muted-foreground py-2 border-t border-secondary">
          Swipe horizontally to see more data →
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;
