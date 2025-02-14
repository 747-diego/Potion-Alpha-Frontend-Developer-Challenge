
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
import { Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";

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
  const [editingValue, setEditingValue] = useState<string | null>(null);

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

  const getActiveFiltersCount = () => {
    return Object.entries(filters).reduce((count, [key, value]) => {
      if (value !== defaultFilters[key as keyof Filters]) return count + 1;
      return count;
    }, 0);
  };

  const activeFiltersCount = getActiveFiltersCount();

  const handleInputChange = (field: keyof Filters, value: string) => {
    const numValue = Number(value);
    if (isNaN(numValue)) return;

    const getMinMax = (field: keyof Filters) => {
      switch (field) {
        case 'minWinRate':
          return { min: 0, max: 100 };
        case 'minTokens':
        case 'minTrades':
          return { min: 0, max: 1000 };
        case 'minPNL':
          return { min: 0, max: 1000000 };
        default:
          return { min: 0, max: 0 };
      }
    };

    const { min, max } = getMinMax(field);
    const clampedValue = Math.min(Math.max(numValue, min), max);
    handleFilterChange(field, clampedValue);
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
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        {editingValue === field ? (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            onBlur={() => setEditingValue(null)}
            onKeyDown={(e) => e.key === 'Enter' && setEditingValue(null)}
            className="w-16 h-6 text-sm text-muted-foreground p-1"
            autoFocus
          />
        ) : (
          <span 
            className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            onClick={() => setEditingValue(field)}
          >
            {value}
          </span>
        )}
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
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm border border-white/10 text-muted-foreground hover:text-white transition-colors relative">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <Badge 
              variant="default" 
              className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs ml-1"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-[400px]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 mt-6">
          <FilterItem
            label="Minimum Win Rate (%)"
            field="minWinRate"
            min={0}
            max={100}
            step={1}
            value={filters.minWinRate}
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
            max={1000000}
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
