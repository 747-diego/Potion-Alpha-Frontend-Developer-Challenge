
import { Trade } from "../../types/trade";
import { useState } from "react";
import { TradeFilters } from "./TradeFilterDrawer";
import { TradesHeader } from "./TradesHeader";
import { TradesTable } from "./TradesTable";
import { sortTrades, filterTrades } from "../../utils/tradeUtils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface TradesSectionProps {
  trades: Trade[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ITEMS_PER_PAGE = 10;

const TradesSection = ({ trades, searchQuery, onSearchChange }: TradesSectionProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Trade | null;
    direction: "asc" | "desc";
  }>({ key: "lastTrade", direction: "asc" });

  const [filters, setFilters] = useState<TradeFilters>({
    minWinRate: 0,
    minTrades: 0,
    minPNL: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key: keyof Trade) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleFiltersChange = (newFilters: TradeFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const sortedAndFilteredTrades = filterTrades(
    sortTrades(trades, sortConfig),
    searchQuery,
    filters
  );

  // Pagination calculations
  const totalPages = Math.ceil(sortedAndFilteredTrades.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTrades = sortedAndFilteredTrades.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <TradesHeader
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onFiltersChange={handleFiltersChange}
      />
      <TradesTable
        trades={paginatedTrades}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default TradesSection;
