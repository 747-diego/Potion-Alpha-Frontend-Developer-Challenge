
import { Search } from "lucide-react";
import { TradeFilterDrawer, TradeFilters } from "./TradeFilterDrawer";

interface TradesHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFiltersChange: (filters: TradeFilters) => void;
}

export function TradesHeader({ searchQuery, onSearchChange, onFiltersChange }: TradesHeaderProps) {
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
            className="w-[400px] pl-10 pr-4 py-2 bg-transparent border border-white/10 rounded-full text-sm placeholder:text-muted-foreground"
          />
        </div>
        <TradeFilterDrawer onFiltersChange={onFiltersChange} />
      </div>
    </div>
  );
}
