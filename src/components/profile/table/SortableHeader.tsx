
import { ChevronDown, ChevronUp } from "lucide-react";
import { Trade } from "../../../types/trade";

interface SortableHeaderProps {
  label: string;
  field: keyof Trade;
  sortConfig: {
    key: keyof Trade | null;
    direction: "asc" | "desc";
  };
  onSort: (field: keyof Trade) => void;
}

export function SortableHeader({ label, field, sortConfig, onSort }: SortableHeaderProps) {
  return (
    <th 
      className="p-4 cursor-pointer hover:text-white transition-colors whitespace-nowrap"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        <span>{label}</span>
        {sortConfig.key === field ? (
          sortConfig.direction === "asc" ? (
            <ChevronUp className="h-4 w-4 text-primary" />
          ) : (
            <ChevronDown className="h-4 w-4 text-primary" />
          )
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
    </th>
  );
}
