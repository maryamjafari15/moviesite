import "./SeeAlso.css";
import { useNavigate } from "react-router-dom";

export function SeeAlso(props) {
  const result = props.similarMovies;
 

console.log(result)
  
  const navigate = useNavigate();
  const routeChange = (movie, mediaType) => {
    let path = `/MovieDetails/${mediaType}/${movie.title || movie.name}/${
      movie.movieID
    }}`;
    navigate(path);
  };

  return (
    <div className='containerseealso'>
      <h1>You Can See Also </h1>
      <div className='cardContainer'>
        {result?.map(
          (movie, index) =>
            movie?.poster && (
              <div key={index} class='card2'>
                <img
                  src={movie?.poster}
                  alt='poster'
                  onClick={() =>
                    routeChange(movie, movie.title ? "movie" : "tv")
                  }
                />
                <div>{movie?.title}</div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
