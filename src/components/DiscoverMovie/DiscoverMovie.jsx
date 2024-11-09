import { useState, useEffect } from "react";
import { DiscoverMovieRequest } from "../../data/main";
import { Error } from "../ErrorComponent/ErrorComponent";
import "./DiscoverMovie.css"
import { GenreBtn } from "../GenreBtn/GenreBtn";
import { useNavigate} from "react-router-dom";

export function DiscoverMovie() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setHasError] = useState(false);
  const navigate = useNavigate();

  const routeChange = () =>{ 
    let path = "/MovieDetails"; 
    navigate(path);
  }

  useEffect(() => {
    async function getdata() {
      setloading(true);
      setHasError(false);
      try {
        const movies = await DiscoverMovieRequest();
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

    <div className="movies">
      <div className="header-container">
        <h2>Movies</h2>
        <GenreBtn />
        </div>
        <div className="movie-grid">
              
      {loading ? <div> loading... </div> : null}
      {error ? <Error /> : null}
        {data?.map((movie) => (
          <div className="movie-card" key={movie.id} onClick={routeChange}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path
}`} alt={movie.title}/>
          <div className="tag">?</div>
          <div className="tag2">{(movie.vote_average)*10+"%"}</div>
          <div className="movie-title">{movie.title}</div>
      </div>

      ))}
           
          
        </div>
    </div>

     
     
    
  );
}
