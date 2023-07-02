import React from 'react';
import { Link } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void; // Add this new prop
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const createPaginationLinks = () => {
    const links = [];

    for (let page = 1; page <= totalPages; page++) {
      const isActive = page === currentPage;
      links.push(
        <Link key={page} to={`/?page=${page}`} className={isActive ? 'active' : ''} onClick={() => onPageChange(page)}>
          {page}
        </Link>
      );
    }

    return links;
  };

  return <div className="pagination">{createPaginationLinks()}</div>;
};

export default Pagination;
