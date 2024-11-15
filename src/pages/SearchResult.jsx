import { useLocation } from 'react-router-dom';
import { Nav } from "../components/Nav/Nav.jsx";
import { Footer } from "../components/Footer/Footer.jsx";

export function SearchResult(){
    const location = useLocation();
    const movies = location.state?.movies || [];
    return(
        <div className='mt-20'>
           <Nav/> 
          SearchResult
          <div className="movies">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div className="movie" key={movie.id}>
              <h2>{movie.title}</h2>
              <p>{movie.overview ||"no data"}</p>
              <p> {movie.release_date}</p>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path
}`} alt={movie.title}/>
            </div>
          ))
        ) : (
          <p> No results found! </p>
        )}
      </div>
      <Footer/>
        </div>
    )
}