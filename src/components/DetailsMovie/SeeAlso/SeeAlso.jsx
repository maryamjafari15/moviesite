import "./SeeAlso.css";

export function SeeAlso(props) {
  const result = props.similarMovies;

  return (
    <div className='containerseealso'>
      <h1>You Can See Also </h1>
      <div className='cardContainer'>
        {result?.map(
          (movie, index) =>
            movie?.poster&& (
              <div key={index} class='card2'>
                <img src={movie?.poster} alt='poster' />
                <div>{movie?.title}</div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
