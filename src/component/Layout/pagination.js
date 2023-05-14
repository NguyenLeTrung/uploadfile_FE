import React from "react";
import "../../access/main.css";

const Pagination = ({
  totalPosts,
  postPerPage,
  setCurrentPage,
  currentPage
}) => {
  let pages = [];
  for (let i = 0; i < Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i)

  }

  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return (
          <button 
            key={index}
            onClick={() => setCurrentPage()}
            className={page == currentPage ? "active" : ""}
          >
            {page}
          </button>
        )
      })}
    </div>
  );
}

export default Pagination;