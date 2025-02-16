
import { Trade } from "../../types/trade";
import { useParams } from "react-router-dom";
import { mockTraders } from "../../data/mockTraders";
import { useIsMobile } from "../../hooks/use-mobile";
import { useEffect, useState } from "react";
import { SortableHeader } from "./table/SortableHeader";
import { TradeRow } from "./table/TradeRow";

interface TradesTableProps {
  trades: Trade[];
  sortConfig: {
    key: keyof Trade | null;
    direction: "asc" | "desc";
  };
  onSort: (key: keyof Trade) => void;
}

export function TradesTable({ trades, sortConfig, onSort }: TradesTableProps) {
  const { id } = useParams();
  const trader = mockTraders.find(t => t.walletAddress === id);
  const isMobile = useIsMobile();
  const [hideAdvancedColumns, setHideAdvancedColumns] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setHideAdvancedColumns(window.innerWidth < 1150);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-secondary text-left text-muted-foreground">
              <SortableHeader label="Token" field="tokenName" sortConfig={sortConfig} onSort={onSort} />
              {!isMobile && <SortableHeader label="Last Trade" field="lastTrade" sortConfig={sortConfig} onSort={onSort} />}
              <SortableHeader label="Market Cap" field="marketCap" sortConfig={sortConfig} onSort={onSort} />
              <SortableHeader label="Invested" field="invested" sortConfig={sortConfig} onSort={onSort} />
              <SortableHeader label="Realized PNL" field="realizedPNL" sortConfig={sortConfig} onSort={onSort} />
              <SortableHeader label="ROI" field="roi" sortConfig={sortConfig} onSort={onSort} />
              <SortableHeader label="Trades" field="trades" sortConfig={sortConfig} onSort={onSort} />
              {!hideAdvancedColumns && <SortableHeader label="Holding" field="holding" sortConfig={sortConfig} onSort={onSort} />}
              {!hideAdvancedColumns && (
                <>
                  <SortableHeader label="Avg. Buy" field="avgBuy" sortConfig={sortConfig} onSort={onSort} />
                  <SortableHeader label="Avg. Sell" field="avgSell" sortConfig={sortConfig} onSort={onSort} />
                </>
              )}
              <th className="p-4 text-muted-foreground">Share</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <TradeRow
                key={trade.id}
                trade={trade}
                isMobile={isMobile}
                hideAdvancedColumns={hideAdvancedColumns}
                traderName={trader?.name}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
