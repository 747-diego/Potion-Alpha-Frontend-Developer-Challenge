
import { Search, Share2 } from "lucide-react";
import { Trade } from "../../types/trade";
import { formatNumber } from "../../utils/format";

interface TradesSectionProps {
  trades: Trade[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const TradesSection = ({ trades, searchQuery, onSearchChange }: TradesSectionProps) => {
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
