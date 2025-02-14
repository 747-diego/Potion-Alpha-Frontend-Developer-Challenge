import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Trade } from "../../types/trade";
import { formatNumber, formatWalletAddress } from "../../utils/format";
import { useState } from "react";
import { toast } from "sonner";

interface TradesSectionProps {
  trades: Trade[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const TradesSection = ({ trades, searchQuery, onSearchChange }: TradesSectionProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Trade | null;
    direction: "asc" | "desc";
  }>({ key: "lastTrade", direction: "asc" });

  const handleSort = (key: keyof Trade) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const SortableHeader = ({ label, field }: { label: string; field: keyof Trade }) => (
    <th 
      className="p-4 cursor-pointer hover:text-white transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        <span>{label}</span>
        {sortConfig.key === field ? (
          sortConfig.direction === "asc" ? (
            <ChevronUp className="h-4 w-4 text-primary" />
          ) : (
            <ChevronDown className="h-4 w-4 text-primary" />
          )
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
    </th>
  );

  const getTimeInMinutes = (timeString: string): number => {
    const minutes = parseInt(timeString.match(/\d+/)?.[0] || "0");
    if (timeString.includes("min")) return minutes;
    if (timeString.includes("h")) return minutes * 60;
    return minutes;
  };

  const sortedTrades = [...trades].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.key === "lastTrade") {
      const aTime = getTimeInMinutes(a.lastTrade);
      const bTime = getTimeInMinutes(b.lastTrade);
      return sortConfig.direction === "asc" ? aTime - bTime : bTime - aTime;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const filteredTrades = sortedTrades.filter((trade) =>
    trade.tokenName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <button className="px-6 py-2 rounded-full bg-primary text-white font-medium">
          Trades
        </button>
        <button className="px-6 py-2 text-muted-foreground hover:text-white transition-colors">
          Tokens
        </button>
        <button className="px-6 py-2 text-muted-foreground hover:text-white transition-colors">
          Groups
        </button>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search by name or wallet"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-[400px] pl-10 pr-4 py-2 bg-background/80 rounded-full border border-white/10 text-sm placeholder:text-muted-foreground"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 text-muted-foreground hover:text-white transition-colors">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="glass-card rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-secondary text-left text-muted-foreground">
                <SortableHeader label="Token" field="tokenName" />
                <SortableHeader label="Last Trade" field="lastTrade" />
                <SortableHeader label="Market Cap" field="marketCap" />
                <SortableHeader label="Invested" field="invested" />
                <SortableHeader label="Realized PNL" field="realizedPNL" />
                <SortableHeader label="ROI" field="roi" />
                <SortableHeader label="Trades" field="trades" />
                <SortableHeader label="Holding" field="holding" />
                <SortableHeader label="Avg. Buy" field="avgBuy" />
                <SortableHeader label="Avg. Sell" field="avgSell" />
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map((trade) => (
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
                        <div 
                          className="text-sm text-muted-foreground hover:text-white cursor-pointer transition-colors"
                          onClick={() => handleCopyAddress(trade.contractAddress)}
                          title="Click to copy"
                        >
                          {formatWalletAddress(trade.contractAddress)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{trade.lastTrade}</td>
                  <td className="p-4 text-muted-foreground">{trade.marketCap}</td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-[#14F195]">
                        <span>{formatNumber(trade.invested.sol)}</span>
                        <img 
                          src="/lovable-uploads/bdddbcfe-82a1-4cb4-b201-9dab6f50d5a3.png" 
                          alt="SOL"
                          className="h-4 w-4"
                        />
                      </div>
                      <div className="text-muted-foreground">
                        ${formatNumber(trade.invested.usd)}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <span className={trade.realizedPNL.sol >= 0 ? "text-green-400" : "text-red-400"}>
                          {trade.realizedPNL.sol >= 0 ? "+" : "-"}
                          {formatNumber(Math.abs(trade.realizedPNL.sol))}
                        </span>
                        <img 
                          src="/lovable-uploads/bdddbcfe-82a1-4cb4-b201-9dab6f50d5a3.png" 
                          alt="SOL"
                          className="h-4 w-4"
                        />
                      </div>
                      <div className="text-muted-foreground">
                        {trade.realizedPNL.usd >= 0 ? "+" : "-"}
                        ${formatNumber(Math.abs(trade.realizedPNL.usd))}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={trade.realizedPNL.percentage >= 0 ? "text-green-400" : "text-red-400"}>
                      {trade.roi}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-green-400">{trade.trades.won}</span>
                    <span className="text-muted-foreground">/</span>
                    <span>{trade.trades.total}</span>
                  </td>
                  <td className="p-4 text-muted-foreground">{trade.holding}</td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-[#14F195]">
                        <span>{formatNumber(trade.avgBuy.sol)}</span>
                        <img 
                          src="/lovable-uploads/bdddbcfe-82a1-4cb4-b201-9dab6f50d5a3.png" 
                          alt="SOL"
                          className="h-4 w-4"
                        />
                      </div>
                      <div className="text-muted-foreground">
                        ${formatNumber(trade.avgBuy.usd)}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-[#14F195]">
                        <span>{formatNumber(trade.avgSell.sol)}</span>
                        <img 
                          src="/lovable-uploads/bdddbcfe-82a1-4cb4-b201-9dab6f50d5a3.png" 
                          alt="SOL"
                          className="h-4 w-4"
                        />
                      </div>
                      <div className="text-muted-foreground">
                        ${formatNumber(trade.avgSell.usd)}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TradesSection;
