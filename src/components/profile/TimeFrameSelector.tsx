
import { TimeFrame } from "../../types/trader";

interface TimeFrameSelectorProps {
  selectedTimeFrame: TimeFrame;
  onTimeFrameChange: (timeFrame: TimeFrame) => void;
}

const TimeFrameSelector = ({ selectedTimeFrame, onTimeFrameChange }: TimeFrameSelectorProps) => {
  return (
    <div className="flex gap-2 mb-8">
      {(["daily", "weekly", "monthly", "all-time"] as TimeFrame[]).map(
        (frame) => (
          <button
            key={frame}
            onClick={() => onTimeFrameChange(frame)}
            className={`px-6 py-3 rounded-xl transition-colors ${
              selectedTimeFrame === frame
                ? "bg-primary/20 text-white"
                : "text-muted-foreground hover:text-white"
            }`}
          >
            {frame.charAt(0).toUpperCase() + frame.slice(1)}
          </button>
        )
      )}
    </div>
  );
};

export default TimeFrameSelector;
