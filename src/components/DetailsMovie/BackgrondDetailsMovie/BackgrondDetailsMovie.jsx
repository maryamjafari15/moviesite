import "./BackgrondDetailsMovie.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import numeral from "numeral";

export function BackgrondDetailsMovie(props) {
  const result = props.data;
const result2 =props.url;
const result3= props.type;

  return (
    <>
    <div
      className='container-moviedetail'
      
    >
      <div className="blurBackground" style={
        {
          backgroundImage: `url(https://image.tmdb.org/t/p/original${result.backdrop_path})`
        }
      }>

      </div>
      <div className='section1-md'>
        <h1> {result.title|| result.name ||"Unknown"} </h1>
        <h2> {result3 === "movie" ?  result.release_date :  result.first_air_date || "Unknown"}</h2>
        <div className='rating-part'>
          <span>{`⭐${ numeral(result.vote_average).format('0,0.0')}`}</span>
          <p>
          {result.overview}
          </p>
          <button onClick={()=>window.open( result2, "_blank")   
          } disabled={!result2}>Watch Trailer</button>
        </div>
      </div>
      <div
        className='trailer_section'
        style={
          {
              backgroundImage: `url(https://image.tmdb.org/t/p/original${result.backdrop_path})`,
          }
        }
      >
        {result2 ? (
                    <a
                      href={result2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="trailer-link2"
                    >
        <PlayCircleIcon sx={{ fontSize: 80 }} />
        </a>):(<p>No Trailer Available</p>)}
     </div>
    </div>
    </>
  );
  
}
