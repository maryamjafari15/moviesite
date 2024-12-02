import { useState, useEffect } from "react";
import { TrendingMovieRequest } from "../../data/main";
import "./TrendingMovie.css";
import numeral from "numeral";
import { useNavigate } from "react-router-dom";
import { Error } from "../ErrorComponent/ErrorComponent";

export function TrendingMovie() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setHasError] = useState(false);

  const navigate = useNavigate();
  const routeChange = (movie, mediaType) => {
    let path = `/MovieDetails/${mediaType}/${movie.title || movie.name}/${
      movie.id
    }}`;
    navigate(path);
  };

  useEffect(() => {
    async function getdata() {
      setloading(true);
      setHasError(false);
      try {
        const movie = await TrendingMovieRequest();
        const movies = movie.slice(0, 11);
        setData(movies);
      } catch {
        setHasError(true);
      } finally {
        setloading(false);
      }
    }

    getdata();
  }, []);

  return (
    <div className='trends'>
      <h2>TRENDS NOW</h2>
      <ul className='trends-list'>
        {loading ? <div> loading... </div> : null}
        {error ? <Error /> : null}
        {data?.filter((movie) => movie.poster_path).map((movie) => (
          <li className='trend-item' key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ cursor: "pointer" }}
              onClick={() => routeChange(movie, movie.title ? "movie" : "tv")}
            />
            <div className='trend-info'>
              <span className='title'>{movie.title || movie.name}</span>
              <span className='year'>
                {movie.release_date || movie.first_air_date}
              </span>
              <span className='rating'>{`⭐${numeral(movie.vote_average).format(
                "0,0.0"
              )}`}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
