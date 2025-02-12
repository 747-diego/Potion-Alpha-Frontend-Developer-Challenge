
import { Search, SlidersHorizontal } from "lucide-react";
import { TimeFrame, ViewMode } from "../types/trader";

interface FilterBarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  timeFrame: TimeFrame;
  setTimeFrame: (frame: TimeFrame) => void;
}

const FilterBar = ({ viewMode, setViewMode, timeFrame, setTimeFrame }: FilterBarProps) => {
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
        <button
          onClick={() => setViewMode("groups")}
          className={`px-4 py-2 rounded-full transition-colors ${
            viewMode === "groups"
              ? "bg-primary text-white"
              : "text-muted-foreground hover:text-white"
          }`}
        >
          Groups
        </button>
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
            placeholder="Search by name or wallet"
            className="w-full bg-secondary/50 border border-secondary rounded-full py-2 pl-12 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button className="glass-card px-4 py-2 rounded-full hover:bg-secondary/80 transition-colors flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
