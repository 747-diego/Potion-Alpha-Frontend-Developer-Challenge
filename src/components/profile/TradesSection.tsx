import { Search, Share2, ChevronDown, ChevronUp } from "lucide-react";
import { Trade } from "../../types/trade";
import { formatNumber } from "../../utils/format";
import { useState } from "react";

interface TradesSectionProps {
  trades: Trade[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

type SortField = keyof Pick<
  Trade,
  "tokenName" | "lastTrade" | "marketCap" | "invested" | "realizedPNL" | "roi" | "holding" | "avgBuy" | "avgSell"
> | "trades";

const TradesSection = ({ trades, searchQuery, onSearchChange }: TradesSectionProps) => {
  const [sortField, setSortField] = useState<SortField>("lastTrade");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
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

  const sortedTrades = [...trades].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case "tokenName":
        comparison = a.tokenName.localeCompare(b.tokenName);
        break;
      case "lastTrade":
        // Convert "X min/hour ago" to minutes for comparison
        const getMinutes = (time: string) => {
          const value = parseInt(time);
          if (time.includes("h")) return value * 60;
          return value;
        };
        comparison = getMinutes(a.lastTrade) - getMinutes(b.lastTrade);
        break;
      case "marketCap":
        // Remove "$" and "B"/"M" and convert to millions
        const getMcValue = (mc: string) => {
          const value = parseFloat(mc.replace(/[$B]/g, ""));
          return mc.includes("B") ? value * 1000 : value;
        };
        comparison = getMcValue(a.marketCap) - getMcValue(b.marketCap);
        break;
      case "invested":
        comparison = a.invested.usd - b.invested.usd;
        break;
      case "realizedPNL":
        comparison = a.realizedPNL.usd - b.realizedPNL.usd;
        break;
      case "roi":
        comparison = parseFloat(a.roi) - parseFloat(b.roi);
        break;
      case "trades":
        comparison = a.trades.total - b.trades.total;
        break;
      case "holding":
        const getHoldingMinutes = (time: string) => {
          const [hours, minutes] = time.split("h ");
          return parseInt(hours) * 60 + (minutes ? parseInt(minutes) : 0);
        };
        comparison = getHoldingMinutes(a.holding) - getHoldingMinutes(b.holding);
        break;
      case "avgBuy":
        comparison = a.avgBuy.usd - b.avgBuy.usd;
        break;
      case "avgSell":
        comparison = a.avgSell.usd - b.avgSell.usd;
        break;
      default:
        comparison = 0;
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  return (
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
              onChange={(e) => onSearchChange(e.target.value)}
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

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-sm text-muted-foreground border-b border-secondary">
              <th className="p-4 text-left">
                <TableHeader field="tokenName">Token</TableHeader>
              </th>
              <th className="p-4 text-left">
                <TableHeader field="lastTrade">Last Trade</TableHeader>
              </th>
              <th className="p-4 text-left">
                <TableHeader field="marketCap">MC</TableHeader>
              </th>
              <th className="p-4 text-left">
                <TableHeader field="invested">Invested</TableHeader>
              </th>
              <th className="p-4 text-left">
                <TableHeader field="realizedPNL">Realized PNL</TableHeader>
              </th>
              <th className="p-4 text-left">
                <TableHeader field="roi">ROI</TableHeader>
              </th>
              <th className="p-4 text-left">
                <TableHeader field="trades">Trades</TableHeader>
              </th>
              <th className="p-4 text-left">
                <TableHeader field="holding">Holding</TableHeader>
              </th>
              <th className="p-4 text-left">
                <TableHeader field="avgBuy">Avg Buy</TableHeader>
              </th>
              <th className="p-4 text-left">
                <TableHeader field="avgSell">Avg Sell</TableHeader>
              </th>
              <th className="p-4 text-left">
                <TableHeader>Share</TableHeader>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTrades.map((trade) => (
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
  );
};

export default TradesSection;
