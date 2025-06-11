import React from "react";

const PaginationTwo = ({
  pageNumber,
  setPageNumber,
  pageCapacity = 9,
  paginationInfo,
  isLoading = false,
}) => {
  const { has_next, has_prev, page, pages, total } = paginationInfo;

  const handlePrevious = () => {
    if (has_prev && !isLoading) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNext = () => {
    if (has_next && !isLoading) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePageClick = (targetPage) => {
    if (targetPage !== pageNumber && !isLoading) {
      setPageNumber(targetPage);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (pages <= maxVisiblePages) {
      // Show all pages if total pages <= 5
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Complex pagination logic for many pages
      if (pageNumber <= 3) {
        // Show first 3 pages, ellipsis, and last page
        pageNumbers.push(1, 2, 3);
        if (pages > 4) {
          pageNumbers.push("ellipsis");
          pageNumbers.push(pages);
        }
      } else if (pageNumber >= pages - 2) {
        // Show first page, ellipsis, and last 3 pages
        pageNumbers.push(1);
        if (pages > 4) {
          pageNumbers.push("ellipsis");
        }
        for (let i = pages - 2; i <= pages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show first page, ellipsis, current page area, ellipsis, last page
        pageNumbers.push(1);
        pageNumbers.push("ellipsis");
        pageNumbers.push(pageNumber - 1, pageNumber, pageNumber + 1);
        pageNumbers.push("ellipsis");
        pageNumbers.push(pages);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mbp_pagination text-center">
      <ul className="page_navigation">
        {/* Previous Button */}
        <li className="page-item">
          <span
            className={`page-link ${
              !has_prev || isLoading ? "disabled" : "pointer"
            }`}
            onClick={handlePrevious}
            style={{
              opacity: !has_prev || isLoading ? 0.5 : 1,
              cursor: !has_prev || isLoading ? "not-allowed" : "pointer",
            }}
          >
            <span className="fas fa-angle-left" />
          </span>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((num, index) => {
          if (num === "ellipsis") {
            return (
              <li key={`ellipsis-${index}`} className="page-item">
                <span className="page-link">...</span>
              </li>
            );
          }

          return (
            <li
              key={num}
              onClick={() => handlePageClick(num)}
              className={`${
                pageNumber === num ? "active page-item" : "page-item"
              } ${isLoading ? "disabled" : ""}`}
              style={{
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              <span className="page-link pointer">{num}</span>
            </li>
          );
        })}

        {/* Next Button */}
        <li className="page-item pointer">
          <span
            className={`page-link ${
              !has_next || isLoading ? "disabled" : "pointer"
            }`}
            onClick={handleNext}
            style={{
              opacity: !has_next || isLoading ? 0.5 : 1,
              cursor: !has_next || isLoading ? "not-allowed" : "pointer",
            }}
          >
            <span className="fas fa-angle-right" />
          </span>
        </li>
      </ul>

      {/* Page Info */}
      <p className="mt10 pagination_page_count text-center">
        {(pageNumber - 1) * pageCapacity + 1}-
        {Math.min(pageNumber * pageCapacity, total)} of {total}+ properties
        available
        {isLoading && <span> (Loading...)</span>}
      </p>
    </div>
  );
};

export default PaginationTwo;
