import "./SeeAlso.css";
import { useNavigate } from "react-router-dom";

export function SeeAlso(props) {
  const result = props.similarMovies;

  // console.log(result)

  const navigate = useNavigate();
  const routeChange = (movie, mediaType) => {
    let encodedTitle = encodeURIComponent(movie.title || movie.name);
    let path = `/MovieDetails/${mediaType}/${encodedTitle}/${movie.movieID}`;
    navigate(path);
  };

  return (
    <div className='containerseealso'>
      <h1>You Can See Also </h1>
      <div className='cardContainer'>
        {result && result.length > 0 ? (
          result.map(
            (movie, index) =>
              movie?.poster && (
                <div key={index} className='card2'>
                  {" "}
                  <img
                    src={movie?.poster}
                    alt='poster'
                    onClick={() =>
                      routeChange(movie, movie.title ? "movie" : "tv")
                    }
                  />{" "}
                  <div className='title3'>{movie?.title}</div>{" "}
                </div>
              )
          )
        ) : (
          <div >No similar movies found.</div>
        )}
      </div>
    </div>
  );
}
