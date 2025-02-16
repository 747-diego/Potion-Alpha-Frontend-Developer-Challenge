
import { ChevronDown } from "lucide-react";
import { TimeFrame } from "../../types/trader";
import { useIsMobile } from "../../hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface TimeFrameSelectorProps {
  selectedTimeFrame: TimeFrame;
  onTimeFrameChange: (timeFrame: TimeFrame) => void;
}

const TimeFrameSelector = ({ selectedTimeFrame, onTimeFrameChange }: TimeFrameSelectorProps) => {
  const isMobile = useIsMobile();
  const timeFrames: TimeFrame[] = ["daily", "weekly", "monthly", "all-time"];

  const formatTimeFrame = (frame: TimeFrame) => 
    frame.charAt(0).toUpperCase() + frame.slice(1);

  return (
    <div className="mb-8">
      {isMobile ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full px-6 py-3 rounded-xl bg-primary/20 text-white font-medium flex items-center justify-between">
            <span>{formatTimeFrame(selectedTimeFrame)}</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px] bg-background border border-white/10">
            {timeFrames.map((frame) => (
              <DropdownMenuItem
                key={frame}
                className={`focus:bg-white/10 focus:text-white ${
                  selectedTimeFrame === frame ? "text-white" : "text-muted-foreground"
                }`}
                onClick={() => onTimeFrameChange(frame)}
              >
                {formatTimeFrame(frame)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex gap-2">
          {timeFrames.map((frame) => (
            <button
              key={frame}
              onClick={() => onTimeFrameChange(frame)}
              className={`px-6 py-3 rounded-xl transition-colors ${
                selectedTimeFrame === frame
                  ? "bg-primary/20 text-white"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              {formatTimeFrame(frame)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeFrameSelector;
