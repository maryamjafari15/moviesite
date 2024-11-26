import "./SerachComponent.css";
import {  useParams, useNavigate  } from "react-router-dom";
import moviesearch from "../../assets/moviesearch.png";
import { Pagination } from "../Pagination/Pagination";
import { useEffect, useState } from "react";
import { SearchMovieRequest, SearchTvShowRequest } from "../../data/search";
import { Error } from "../ErrorComponent/ErrorComponent";

export function SearchComponent() {
  const { query } = useParams();
  const navigate = useNavigate();

  // console.log(query);

  const [allResults, setAllResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setHasError] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setHasError(false);
      try {
        const movieResult = await SearchMovieRequest(query);
        const tvShowResult = await SearchTvShowRequest(query);
        setAllResults([...movieResult, ...tvShowResult]);
      } catch (err) {
        setHasError(true);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [query]);
  console.log(allResults);


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
          {allResults.length > 0 ? (
            allResults.map((movie) => (
              <div key={movie.id} className='card' data-hover-text={movie.title||movie.name}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image+Available"
                  }
                  alt={movie.title || "No Title"}
                />
              </div>
            ))
          ) : (
            <p>No results found!</p>
          )}
        </div>
      </div>
      {/* <Pagination
        cardsPerPage={totalPages}
        totalCards={currentPage}
        paginate={paginate}
      /> */}
    </>
  );
}
