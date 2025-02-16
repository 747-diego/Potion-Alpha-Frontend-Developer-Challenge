
import { Search } from "lucide-react";
import { TradeFilterDrawer, TradeFilters } from "./TradeFilterDrawer";
import { useIsMobile } from "../../hooks/use-mobile";

interface TradesHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFiltersChange: (filters: TradeFilters) => void;
}

export function TradesHeader({ searchQuery, onSearchChange, onFiltersChange }: TradesHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-8">
      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
        <button className="px-4 sm:px-6 py-2 rounded-full bg-primary text-white font-medium whitespace-nowrap">
          Trades
        </button>
        <button className="px-4 sm:px-6 py-2 text-muted-foreground hover:text-white transition-colors whitespace-nowrap">
          Tokens
        </button>
        <button className="px-4 sm:px-6 py-2 text-muted-foreground hover:text-white transition-colors whitespace-nowrap">
          Groups
        </button>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-none">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder={isMobile ? "Search..." : "Search by name or wallet"}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full sm:w-[300px] pl-10 pr-4 py-2 bg-transparent border border-white/10 rounded-full text-sm placeholder:text-muted-foreground"
          />
        </div>
        <TradeFilterDrawer onFiltersChange={onFiltersChange} />
      </div>
    </div>
  );
}
