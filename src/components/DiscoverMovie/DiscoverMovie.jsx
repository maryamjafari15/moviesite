import { useState, useEffect } from "react";
import { getMoviesWithGenres } from "../../data/genre&movie";
import { Error } from "../ErrorComponent/ErrorComponent";
import "./DiscoverMovie.css";
import { GenreBtn } from "../GenreBtn/GenreBtn";
import { useNavigate } from "react-router-dom";
import numeral from "numeral";
import { Pagination } from "../Pagination/Pagination";

export function DiscoverMovie() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardPerPage] = useState(20);
  const navigate = useNavigate();

  const routeChange = () => {
    let path = "/MovieDetails/";
    navigate(path);
  };

  useEffect(() => {
    async function getdata() {
      setloading(true);
      setHasError(false);
      try {
        const movies = await getMoviesWithGenres(currentPage);
        setData(movies);
      } catch {
        setHasError(true);
      } finally {
        setloading(false);
      }
    }

    getdata();
  }, [currentPage]);

  const indexOfLastCard = currentPage * cardPerPage;
  const indexOfFirstCard = indexOfLastCard - cardPerPage;
  const currentdatas = data.slice(indexOfFirstCard, indexOfLastCard);
  const paginate = (pageNumber)=> setCurrentPage(pageNumber);

  return (
    <div className='movies'>
      <div className='header-container'>
        <h2>Movies</h2>
        <GenreBtn />
      </div>
      <div className='movie-grid'>
        {loading ? <div> loading... </div> : null}
        {error ? <Error /> : null}
        {currentdatas?.map((movie) => (
          <div className='movie-card' key={movie.id} onClick={routeChange}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className='tag'>{movie.genres.slice(0, 1)}</div>
            <div className='tag2'>
              {numeral(movie.vote_average / 10).format("0 %")}
            </div>
            <div className='movie-title'>{movie.title}</div>
          </div>
        ))}
      </div>
     < Pagination cardPerPage={cardPerPage} totalCards={100} paginate={paginate}/>
    </div>
  );
}
