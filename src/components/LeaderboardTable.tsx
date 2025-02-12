
import { Share2, ChevronDown, ChevronUp, Equal } from "lucide-react";
import { useState } from "react";
import { Trader } from "../types/trader";
import { formatNumber, formatUSD, formatWalletAddress } from "../utils/format";
import { toast } from "sonner";

interface LeaderboardTableProps {
  traders: Trader[];
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

const LeaderboardTable = ({ traders }: LeaderboardTableProps) => {
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const copyWallet = (wallet: string) => {
    navigator.clipboard.writeText(wallet);
    toast.success("Wallet address copied to clipboard");
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
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
      } transition-colors`}
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

  // Assuming 1 SOL = $100 for this example
  const SOL_PRICE = 100;

  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <table>
        <thead>
          <tr className="border-b border-secondary">
            <th>
              <TableHeader field="rank">Rank</TableHeader>
            </th>
            <th>
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
              <td>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-[#14F195]">
                    <span>{(trader.avgBuy / SOL_PRICE).toFixed(1)}</span>
                    <Equal className="h-4 w-4" />
                  </div>
                  <div className="text-muted-foreground">
                    {formatUSD(trader.avgBuy)}
                  </div>
                </div>
              </td>
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
