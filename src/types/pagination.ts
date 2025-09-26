export interface PaginationProps {
  first: number;
  last: number;
  // pages: number;
  items: number;
  onPageChange: () => void;
}