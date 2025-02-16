
import { Share2 } from "lucide-react";
import { Trade } from "../../../types/trade";
import { formatNumber, formatWalletAddress } from "../../../utils/format";
import { formatLastTradeTime } from "../../../utils/tradeUtils";
import { toast } from "sonner";

interface TradeRowProps {
  trade: Trade;
  isMobile: boolean;
  hideAdvancedColumns: boolean;
  traderName?: string;
}

export function TradeRow({ trade, isMobile, hideAdvancedColumns, traderName }: TradeRowProps) {
  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
  };

  const handleShare = (trade: Trade) => {
    const displayName = traderName || "This trader";
    const tweetText = `${displayName} just spent ${formatNumber(trade.invested.sol)} SOL on ${trade.tokenName}! ROI: ${trade.roi} 🚀`;
    const encodedText = encodeURIComponent(tweetText);
    
    if (isMobile) {
      window.location.href = `twitter://post?text=${encodedText}`;
      toast.success("Sharing on X");
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
      toast.success("Opening X/Twitter share dialog");
    }
  };

  return (
    <tr className="border-b border-secondary">
      <td className="sticky left-0 bg-background/80 backdrop-blur-sm z-10 p-4">
        <div className="flex items-center gap-3">
          <img
            src={trade.tokenImage}
            alt={trade.tokenName}
            className="w-8 h-8 rounded-full"
          />
          {!isMobile && (
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
          )}
        </div>
      </td>
      {!isMobile && (
        <td className="p-4 text-muted-foreground">
          {formatLastTradeTime(trade.lastTrade)}
        </td>
      )}
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
          <div className="text-sm text-muted-foreground">
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
          <div className="text-sm text-muted-foreground">
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
      {!hideAdvancedColumns && (
        <td className="p-4 text-muted-foreground">{trade.holding}</td>
      )}
      {!hideAdvancedColumns && (
        <>
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
              <div className="text-sm text-muted-foreground">
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
              <div className="text-sm text-muted-foreground">
                ${formatNumber(trade.avgSell.usd)}
              </div>
            </div>
          </td>
        </>
      )}
      <td className="p-4">
        <button
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          onClick={() => handleShare(trade)}
        >
          <Share2 className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
}
