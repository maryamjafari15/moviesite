import "./Pagination.css"

export function Pagination({ cardPerPage, totalCards , paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="containerPagination">
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={ (e)=>{e.preventDefault();
                 paginate(number)}} href='#' className='page-link'> {number} </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
