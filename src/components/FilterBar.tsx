
import { Search, ChevronDown } from "lucide-react";
import { TimeFrame, ViewMode } from "../types/trader";
import { FilterDrawer, Filters } from "./FilterDrawer";
import { useIsMobile } from "../hooks/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  isWalletConnected: boolean;
}

const FilterBar = ({
  viewMode,
  setViewMode,
  timeFrame,
  setTimeFrame,
  onFiltersChange,
  searchQuery,
  setSearchQuery,
  isWalletConnected,
}: FilterBarProps) => {
  const [isWiggling, setIsWiggling] = useState(false);
  const isMobile = useIsMobile();

  const handleGroupsClick = () => {
    setIsWiggling(true);
    toast("✨ Groups feature coming soon!", {
      description: "We're working on something amazing!",
      duration: 2000,
    });
    setTimeout(() => setIsWiggling(false), 500);
  };

  const formatTimeFrame = (frame: TimeFrame) => 
    frame.charAt(0).toUpperCase() + frame.slice(1);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div className="flex gap-2 w-full sm:w-auto">
        {isMobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full px-4 py-2 rounded-full bg-primary text-white font-medium flex items-center justify-between">
              <span>{viewMode === "traders" ? "Traders" : "Groups"}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] bg-background border border-white/10">
              <DropdownMenuItem
                onClick={() => setViewMode("traders")}
                className={`focus:bg-white/10 focus:text-white ${
                  viewMode === "traders" ? "text-white" : "text-muted-foreground"
                }`}
              >
                Traders
              </DropdownMenuItem>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuItem
                      onClick={handleGroupsClick}
                      className={`text-muted-foreground focus:bg-white/10 focus:text-white ${
                        isWiggling ? 'animate-wiggle' : ''
                      }`}
                    >
                      Groups
                    </DropdownMenuItem>
                  </TooltipTrigger>
                  <TooltipContent 
                    className="bg-secondary/90 backdrop-blur-sm border-primary/20 animate-fade-in"
                    side="right"
                    align="center"
                  >
                    <p className="font-medium">✨ Coming Soon! ✨</p>
                    <p className="text-sm text-muted-foreground">
                      We're crafting something special for trading groups
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
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
                  alignOffset={-85}
                >
                  <p className="font-medium">✨ Coming Soon! ✨</p>
                  <p className="text-sm text-muted-foreground">
                    We're crafting something special for trading groups
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
      </div>

      <div className="flex gap-2 w-full sm:w-auto order-3 sm:order-2">
        {isMobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm border border-white/10 text-white font-medium flex items-center justify-between">
              <span>{formatTimeFrame(timeFrame)}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] bg-background border border-white/10">
              {(["daily", "weekly", "monthly", "all-time"] as TimeFrame[]).map((frame) => (
                <DropdownMenuItem
                  key={frame}
                  onClick={() => setTimeFrame(frame)}
                  className={`focus:bg-white/10 focus:text-white ${
                    timeFrame === frame ? "text-white" : "text-muted-foreground"
                  }`}
                >
                  {formatTimeFrame(frame)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
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
                  {formatTimeFrame(frame)}
                </button>
              )
            )}
          </>
        )}
      </div>

      <div className="flex gap-2 sm:gap-4 items-center w-full sm:w-auto order-2 sm:order-3">
        <div className="relative flex-1 sm:flex-none">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isMobile ? "Search..." : "Search by name or wallet"}
            className="w-full sm:w-[300px] bg-transparent border border-secondary rounded-full py-2 pl-12 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <FilterDrawer onFiltersChange={onFiltersChange} />
      </div>
    </div>
  );
};

export default FilterBar;
