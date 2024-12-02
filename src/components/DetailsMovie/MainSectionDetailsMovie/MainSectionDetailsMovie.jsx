import "./MainSectionDetailsMovie.css";
import { BackgrondDetailsMovie } from "../BackgrondDetailsMovie/BackgrondDetailsMovie.jsx";
import { SeeAlso } from "../SeeAlso/SeeAlso.jsx";
import { useEffect, useState } from "react";
import { DetailMovieRequest, DetailTvRequest } from "../../../data/detailsMovie.js";
import { Error } from "../../ErrorComponent/ErrorComponent.jsx";
import { useNavigate } from "react-router-dom";

export function MainSectionDetailsMovie(props) {
 
  const result =props.id;
  const result2 =props.mediaType;

  const navigate = useNavigate();
  const routeChange = (starname , movieId) => {
    let path = `/PeopleDetails/${starname}/${movieId}` ;
    navigate(path);}
 

  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setHasError] = useState(false);

  useEffect(() => {
    async function getdata() {
      setloading(true);
      setHasError(false);
      try { 
        let response;
        if (result2 === "movie") {
          response = await DetailMovieRequest(result); 
        } else if (result2 === "tv") {
          response = await DetailTvRequest(result);
        }
        setData(response);
      } catch {
        setHasError(true);
      } finally {
        setloading(false);
      }
    }

    getdata();
  }, [result ,result2]);
  

  const director = data.credits?.crew?.find(
    (member) => member.job === (result2 === "movie" ? "Director" : "Executive Producer")
  );
  const genres = data?.genres?.length
  ? data.genres.map((genre) => genre.name).join(", ")
  : "Unknown";

  const actors = data.credits?.cast
  .filter(actor => actor.profile_path !== null)
  .slice(0, 6);
  console.log(actors)

  const keywords = data?.keywords?.keywords
  ? data.keywords.keywords.map((keyword) => keyword.name).slice(0, 7).join(", ")
  : "Unknown";

  const getYouTubeUrl = (videos) => {
    if (!videos?.results) return null;
    let trailer = videos.results.find(
      (video) => video.site === "YouTube" && video.name === "Official Trailer"
    );
    if (!trailer) {
      trailer = videos.results.find((video) => video.site === "YouTube");
    }
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  };

  const youtubeUrl = getYouTubeUrl(data?.videos);

  const similarMovies = data.similar?.results
  .filter(movie => movie.poster_path !== null)
  .slice(0, 6).map((movie) => ({
    title: movie.title || movie.name || "Unknown Title",
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "/placeholder.jpg",
      movieID:movie.id, 
  }));

  return ( 
    <>
      {loading ? <div> Loading... </div> : null}
      {error ? <Error /> : null}

      <BackgrondDetailsMovie data={data} url={youtubeUrl}  type={result2} />

      <div className='main-container2'>
        
        <div className='flex justify-center items-start'>
          <div className='imageDetailsmoviecontainer'>
            <img
              src={data.poster_path
                ?`https://image.tmdb.org/t/p/w500${data.poster_path}`:
                "/placeholder.jpg"}
              alt={data.title || data.name || "Unknown Poster"}
            />
          </div>
          <div className='infoDetails'>
            <h1>ABOUT  {result2 === "movie" ? "MOVIE" : "TV SHOW"}</h1>
            <div className='mb-6'>
              <h2>GENRES</h2>
              <h3>{genres || "Unknown"}</h3>
            </div>

            <div className='mb-6'>
              <h2>DIRECTED BY</h2>
              <h3>{director?.name || "Unknown"}</h3>
            </div>

            <div className='mb-6'>
              <h2>CAST</h2>
              <div className='castcontainer'>
                {actors?.map((people) => (
                  <div className='actor-card2' key={people.id}>
                    <img
                     onClick={()=> routeChange(people.name , people.id)}

                      src={people.profile_path
                        ?`https://image.tmdb.org/t/p/w500${people.profile_path}`
                        : "/placeholder-actor.jpg"}
                      alt={people.name || "Unknown"}
                    />
                    <h3>{people.name || "Unknown"} </h3>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2>KEY WORDS</h2>
              <h3 className='keywords-text'> {keywords?.length > 0 ? keywords : "No Keywords Available"}</h3>
            </div>
          </div>
        </div>
       
      </div>
      <SeeAlso  similarMovies={similarMovies} />
    </>
  );
}
