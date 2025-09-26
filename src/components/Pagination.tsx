import { ReactComponent as ChevronLeft } from "../assets/chevron_left.svg"
import { ReactComponent as ChevronRight } from "../assets/chevron_right.svg";
import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  items: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({totalPages, currentPage, items, onPageChange}: PaginationProps) => {
  const pages = Array.from({ length: totalPages}, (_, i) => i + 1);

  return (
    <div className="pagination" data-testid="pagination">
      <p className="pagination-text">{items} registro(s)</p>
      <div className="pagination-index">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="pagination-arrow">
          <ChevronLeft className="pagination-icon" />
        </button>

        { pages.map((page) => (
          <button key={page} onClick={() => onPageChange(page)} className={`pagination-btn ${page === currentPage ? 'text-white bg-azul border-azul' : 'hover:bg-gray-200'}`}>
            {page}
          </button>
        ))}

        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="pagination-arrow">
          <ChevronRight className="pagination-icon" />
        </button>
      </div>
    </div>
  )
}

export default Pagination;