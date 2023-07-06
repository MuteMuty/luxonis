import React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const createPaginationLinks = () => {
    const links = [];

    const maxVisibleLinks = isMobile ? 7 : 10;
    const halfVisibleLinks = Math.floor(maxVisibleLinks / 2);
    let startPage = currentPage - halfVisibleLinks;
    let endPage = currentPage + halfVisibleLinks;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages, startPage + maxVisibleLinks - 1);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisibleLinks + 1);
    }

    if (startPage > 1 && !isMobile) {
      links.push(
        <Link key={1} to={`/?page=${1}`} onClick={() => onPageChange(1)}>
          First
        </Link>
      );

      links.push(
        <Link key="prev" to={`/?page=${currentPage - 1}`} onClick={() => onPageChange(currentPage - 1)}>
          Prev
        </Link>
      );
    }

    for (let page = startPage; page <= endPage; page++) {
      const isActive = page === currentPage;
      links.push(
        <Link key={page} to={`/?page=${page}`} className={isActive ? 'active' : ''} onClick={() => onPageChange(page)}>
          {page}
        </Link>
      );
    }

    if (endPage < totalPages && !isMobile) {
      links.push(
        <Link key="next" to={`/?page=${currentPage + 1}`} onClick={() => onPageChange(currentPage + 1)}>
          Next
        </Link>
      );

      links.push(
        <Link key={totalPages} to={`/?page=${totalPages}`} onClick={() => onPageChange(totalPages)}>
          Last
        </Link>
      );
    }

    return links;
  };

  return <div className="pagination">{createPaginationLinks()}</div>;
};

export default Pagination;
