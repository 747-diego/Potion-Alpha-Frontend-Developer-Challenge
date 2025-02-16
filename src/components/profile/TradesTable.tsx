import { Trade } from "../../types/trade";
import { formatNumber, formatWalletAddress } from "../../utils/format";
import { formatLastTradeTime } from "../../utils/tradeUtils";
import { toast } from "sonner";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TradesTableProps {
  trades: Trade[];
  sortConfig: {
    key: keyof Trade | null;
    direction: "asc" | "desc";
  };
  onSort: (key: keyof Trade) => void;
}

export function TradesTable({ trades, sortConfig, onSort }: TradesTableProps) {
  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
  };

  const SortableHeader = ({ label, field }: { label: string; field: keyof Trade }) => (
    <th 
      className="p-4 cursor-pointer hover:text-white transition-colors"
      onClick={() => onSort(field)}
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

  return (
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
            {trades.map((trade) => (
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
                <td className="p-4 text-muted-foreground">
                  {formatLastTradeTime(trade.lastTrade)}
                </td>
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
  );
}
