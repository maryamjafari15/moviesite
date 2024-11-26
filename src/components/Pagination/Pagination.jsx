import "./Pagination.css";

export function Pagination({ totalPages, paginate, currentPage }) {
  function getPageNumber() {
    const pageNumbers = [];
    const startFrom = Math.max(1, currentPage - 5);
    const end = Math.min(totalPages, currentPage + 5);

    for (let i = startFrom; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  const pageNumbers = getPageNumber();

  //  console.log(totalCards , currentPage);

  return (
    <div className='containerPagination'>
      <ul className='pagination'>
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) paginate(currentPage - 1);
            }}
            href='#'
            className='page-link'
          >
            Previous
          </a>
        </li>

        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${number === currentPage ? "active" : ""}`}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
                paginate(number);
              }}
              href='#'
              className='page-link'
            >
              {" "}
              {number}{" "}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <a
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) paginate(currentPage + 1);
            }}
            href='#'
            className='page-link'
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
}
