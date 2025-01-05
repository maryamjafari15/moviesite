import { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import { getVideoTrailer } from "../../data/video.js";
import { PopularMovieRequest } from "../../data/main.js";
import { Error } from "../ErrorComponent/ErrorComponent";
import "./LatestTrailers.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

export function LatestTrailerMovie() {
  const [Data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setHasError] = useState(false);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4,
    initialSlide: 0,
   
    responsive: [
      {
        breakpoint: 1600, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      }
      ,{
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      }
      ,{
        breakpoint: 600, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      }
      ,{
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      }
    ],
  };

  useEffect(() => {
    async function getdata() {
      const data = await PopularMovieRequest();
      const movieIds = data.map((movie) => movie.id);
      setloading(true);
      setHasError(false);
      try {
        const moviesData = await Promise.all(
          movieIds.map(async (id) => {
            const movieData = await getVideoTrailer(id);
            if (!movieData || !movieData.videos) {
              return null;
            }
            let trailer = movieData.videos.results.find(
              (video) =>
                video.site === "YouTube" && video.name === "Official Trailer"
            );
            if (!trailer) {
              trailer = movieData.videos.results.find(
                (video) => video.site === "YouTube"
              );
            }
            // console.log(trailer);
            // console.log(movieData);
            return {
              id: movieData.id,
              title: movieData.title,
              backdrop_path: movieData.backdrop_path,
              youtubeUrl: trailer
                ? `https://www.youtube.com/watch?v=${trailer.key}`
                : null,
            };
          })
        );
        setData(moviesData);
      } catch {
        setHasError(true);
      } finally {
        setloading(false);
      }
    }
    getdata();
  }, []);

  return (
    <>
      <h1 className='hmainpopmovie'>Latest Trailers </h1>
      <div className='slider-container3'>
        {loading ? <div> loading...</div> : null}
        {error ? <Error /> : null}
        <Slider {...settings}>
          {Data?.filter((movie) => movie.youtubeUrl).map((movie, index) => (
            <div key={`${movie.id}-${index}` } className="card7">
              <div
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                }}
                className='trailercard'
              >
                <a
                  href={movie.youtubeUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='trailer-link'
                >
                  <PlayCircleIcon sx={{ fontSize: 60 }} />
                </a>
                
              </div>
              <h3 className='htrailermovie2'>{movie.title}</h3>
            </div>
          ))}
        </Slider> 
      </div>
    </>
  );
}
