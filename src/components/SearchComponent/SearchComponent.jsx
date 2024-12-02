import "./SerachComponent.css";
import { useParams, useNavigate } from "react-router-dom";
import moviesearch from "../../assets/moviesearch.png";
import { Pagination } from "../Pagination/Pagination";
import { useEffect, useState } from "react";
import { SearchMovieRequest, SearchTvShowRequest } from "../../data/search";
import { Error } from "../ErrorComponent/ErrorComponent";

export function SearchComponent() {
  const { query } = useParams();
  const navigate = useNavigate();
  const routeChange = (movie, mediaType) => {
    let path = `/MovieDetails/${mediaType}/${movie.title || movie.name}/${
      movie.id
    }}`;
    navigate(path);
  };

  // console.log(query);

  const [allResults, setAllResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const resultsPerPage = 12;

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setHasError(false);
      try {
        const movieResult = await SearchMovieRequest(query);
        const tvShowResult = await SearchTvShowRequest(query);
        const filteredResults = [...movieResult, ...tvShowResult].filter(
          (movie) => movie.poster_path
        );
        setAllResults(filteredResults);
        setTotalPages(Math.ceil(filteredResults.length / resultsPerPage));
      } catch (err) {
        setHasError(true);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [query]);
  // console.log(allResults);
  const indexOfLastResult = currentPage * resultsPerPage;
const indexOfFirstResult = indexOfLastResult - resultsPerPage;
const currentResults = allResults.slice(indexOfFirstResult, indexOfLastResult);

  return (
    <>
      <div className='head-search'>
        <img src={moviesearch} alt='movie' className='movieimg' />
        <div>
          <h1>Hello!</h1>
          <h3>
            Millions of movies, TV shows and people to discover.
            <br />
            Discover Your Next Favorite Movie
          </h3>
        </div>
      </div>
      <div className='section2-resultsearch'>
        <h1>Search Results</h1>
        <hr />
        <div className='card-container1'>
          {loading ? <div>Loading...</div> : null}
          {error ? <Error /> : null}
          {currentResults.length > 0 ? (
            currentResults
              .filter((movie) => movie.poster_path)
              .map((movie) => (
                <div
                  key={movie.id}
                  className='card'
                  data-hover-text={movie.title || movie.name}
                  onClick={() =>
                    routeChange(movie, movie.title ? "movie" : "tv")
                  }
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || "No Title"}
                  />
                </div>
              ))
          ) : (
            <p>No results found!</p>
          )}
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
    </>
  );
}
