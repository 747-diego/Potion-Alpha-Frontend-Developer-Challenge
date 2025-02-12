
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "./ui/sheet";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";

interface FilterDrawerProps {
  onFiltersChange: (filters: Filters) => void;
}

export interface Filters {
  minFollowers: number;
  maxFollowers: number;
  minWinRate: number;
  minTokens: number;
  minTrades: number;
  minPNL: number;
}

const defaultFilters: Filters = {
  minFollowers: 0,
  maxFollowers: 1000000,
  minWinRate: 0,
  minTokens: 0,
  minTrades: 0,
  minPNL: 0,
};

export function FilterDrawer({ onFiltersChange }: FilterDrawerProps) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const handleFilterChange = (key: keyof Filters, value: number | number[]) => {
    const newFilters = {
      ...filters,
      [key]: Array.isArray(value) ? value[0] : value,
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const FilterItem = ({
    label,
    field,
    min,
    max,
    step,
    value,
  }: {
    label: string;
    field: keyof Filters;
    min: number;
    max: number;
    step: number;
    value: number;
  }) => (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label>{label}</Label>
        <span className="text-sm text-muted-foreground">{value}</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(value) => handleFilterChange(field, value)}
        className="w-full"
      />
    </div>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="glass-card px-4 py-2 rounded-full hover:bg-secondary/80 transition-colors flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </SheetTrigger>
      <SheetContent className="w-[400px]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 mt-6">
          <FilterItem
            label="Minimum Followers"
            field="minFollowers"
            min={0}
            max={1000000}
            step={1000}
            value={filters.minFollowers}
          />
          <FilterItem
            label="Maximum Followers"
            field="maxFollowers"
            min={0}
            max={1000000}
            step={1000}
            value={filters.maxFollowers}
          />
          <FilterItem
            label="Minimum Win Rate (%)"
            field="minWinRate"
            min={0}
            max={100}
            step={1}
            value={filters.minWinRate}
          />
          <FilterItem
            label="Minimum Tokens"
            field="minTokens"
            min={0}
            max={1000}
            step={1}
            value={filters.minTokens}
          />
          <FilterItem
            label="Minimum Trades"
            field="minTrades"
            min={0}
            max={1000}
            step={1}
            value={filters.minTrades}
          />
          <FilterItem
            label="Minimum PNL (USD)"
            field="minPNL"
            min={0}
            max={100000}
            step={100}
            value={filters.minPNL}
          />
        </div>
        <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <Button 
            variant="outline" 
            onClick={handleClearFilters}
            className="w-full"
          >
            Clear All Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
