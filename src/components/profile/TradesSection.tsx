
import { Search, Share2, ChevronDown, ChevronUp } from "lucide-react";
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
  }>({ key: "lastTrade", direction: "asc" }); // Changed to "asc"

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
    <div className="glass-card rounded-lg overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b border-secondary">
        <h2 className="text-xl font-semibold">Trades</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 bg-background rounded-lg border border-secondary"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

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
                <td className="p-4">{trade.lastTrade}</td>
                <td className="p-4">{trade.marketCap}</td>
                <td className="p-4">
                  <div>{formatNumber(trade.invested.sol)} SOL</div>
                  <div className="text-sm text-muted-foreground">
                    ${formatNumber(trade.invested.usd)}
                  </div>
                </td>
                <td className="p-4">
                  <div>{formatNumber(trade.realizedPNL.sol)} SOL</div>
                  <div className="text-sm text-muted-foreground">
                    ${formatNumber(trade.realizedPNL.usd)}
                  </div>
                </td>
                <td className="p-4">{trade.roi}</td>
                <td className="p-4">
                  {trade.trades.won}/{trade.trades.total}
                </td>
                <td className="p-4">{trade.holding}</td>
                <td className="p-4">
                  <div>{formatNumber(trade.avgBuy.sol)} SOL</div>
                  <div className="text-sm text-muted-foreground">
                    ${formatNumber(trade.avgBuy.usd)}
                  </div>
                </td>
                <td className="p-4">
                  <div>{formatNumber(trade.avgSell.sol)} SOL</div>
                  <div className="text-sm text-muted-foreground">
                    ${formatNumber(trade.avgSell.usd)}
                  </div>
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
