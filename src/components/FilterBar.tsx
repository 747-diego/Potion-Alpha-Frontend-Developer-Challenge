
import { Search } from "lucide-react";
import { TimeFrame, ViewMode } from "../types/trader";
import { FilterDrawer, Filters } from "./FilterDrawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { toast } from "sonner";

interface FilterBarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  timeFrame: TimeFrame;
  setTimeFrame: (frame: TimeFrame) => void;
  onFiltersChange: (filters: Filters) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FilterBar = ({
  viewMode,
  setViewMode,
  timeFrame,
  setTimeFrame,
  onFiltersChange,
  searchQuery,
  setSearchQuery,
}: FilterBarProps) => {
  const [isWiggling, setIsWiggling] = useState(false);

  const handleGroupsClick = () => {
    setIsWiggling(true);
    toast("✨ Groups feature coming soon!", {
      description: "We're working on something amazing!",
      duration: 2000,
    });
    setTimeout(() => setIsWiggling(false), 500);
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode("traders")}
          className={`px-4 py-2 rounded-full transition-colors ${
            viewMode === "traders"
              ? "bg-primary text-white"
              : "text-muted-foreground hover:text-white"
          }`}
        >
          Traders
        </button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleGroupsClick}
                className={`px-4 py-2 rounded-full transition-colors ${
                  viewMode === "groups"
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-white"
                } ${isWiggling ? 'animate-wiggle' : ''}`}
              >
                Groups
              </button>
            </TooltipTrigger>
            <TooltipContent 
              className="bg-secondary/90 backdrop-blur-sm border-primary/20 animate-fade-in"
              side="bottom"
              align="end"
              sideOffset={5}
            >
              <p className="font-medium">✨ Coming Soon! ✨</p>
              <p className="text-sm text-muted-foreground">
                We're crafting something special for trading groups
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex gap-2">
        {(["daily", "weekly", "monthly", "all-time"] as TimeFrame[]).map(
          (frame) => (
            <button
              key={frame}
              onClick={() => setTimeFrame(frame)}
              className={`px-4 py-2 rounded-full transition-colors ${
                timeFrame === frame
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              {frame.charAt(0).toUpperCase() + frame.slice(1)}
            </button>
          )
        )}
      </div>
      <div className="flex gap-4 items-center">
        <div className="relative w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or wallet"
            className="w-full bg-secondary/50 border border-secondary rounded-full py-2 pl-12 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <FilterDrawer onFiltersChange={onFiltersChange} />
      </div>
    </div>
  );
};

export default FilterBar;
