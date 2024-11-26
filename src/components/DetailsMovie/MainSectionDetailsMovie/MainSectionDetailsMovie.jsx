import "./MainSectionDetailsMovie.css";
import { BackgrondDetailsMovie } from "../BackgrondDetailsMovie/BackgrondDetailsMovie.jsx";
import { SeeAlso } from "../SeeAlso/SeeAlso.jsx";
import { useEffect, useState } from "react";
import { DetailMovieRequest } from "../../../data/detailsMovie.js";
import { Error } from "../../ErrorComponent/ErrorComponent.jsx";


export function MainSectionDetailsMovie(props) {
 
  const result =props.MovieID;

  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setHasError] = useState(false);

  useEffect(() => {
    async function getdata() {
      setloading(true);
      setHasError(false);
      try {
        const movie = await DetailMovieRequest(result);
        setData(movie);
      } catch {
        setHasError(true);
      } finally {
        setloading(false);
      }
    }

    getdata();
  }, [result]);

  const director = data.credits?.crew.find(
    (member) => member.job === "Director"
  );
  const genres = data.genres?.map((genre) => genre.name).join(", ");

  const actors = data.credits?.cast.slice(0, 6);

  const keywords = data.keywords?.keywords
    .map((keywords) => keywords.name)
    .slice(0, 7)
    .join(",  ");

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

  const similarMovies = data.similar?.results.slice(0, 6).map((movie) => ({
    title: movie.title,
    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  }));

  return (
    <>
      {loading ? <div> Loading... </div> : null}
      {error ? <Error /> : null}

      <BackgrondDetailsMovie data={data} url={youtubeUrl} />

      <div className='main-container2'>
        
        <div className='flex justify-center items-start'>
          <div className='imageDetailsmoviecontainer'>
            <img
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt='poster'
            />
          </div>
          <div className='infoDetails'>
            <h1>ABOUT MOVIE</h1>
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
                      // onClick={()=> routeChange(people.name)}

                      src={`https://image.tmdb.org/t/p/w500${people.profile_path}`}
                      alt={people.name}
                    />
                    <h3>{people.name} </h3>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2>KEY WORDS</h2>
              <h3 className='keywords-text'>{keywords}</h3>
            </div>
          </div>
        </div>
       
      </div>
      <SeeAlso data={data} similarMovies={similarMovies} />
    </>
  );
}
