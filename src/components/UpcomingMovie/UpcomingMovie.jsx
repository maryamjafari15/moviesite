import { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import { UpcomingMovieRequest } from "../../data/main";
import { Error } from "../ErrorComponent/ErrorComponent";
import "./UpcomingMovie.css";
import { useNavigate } from "react-router-dom";

export function UpcomingMovie() {
  const [Data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setHasError] = useState(false);

  const navigate = useNavigate();
  const routeChange = (movie, mediaType) => {
    let encodedTitle = encodeURIComponent(movie.title || movie.name);
    let path = `/MovieDetails/${mediaType}/${encodedTitle}/${movie.id}}`;
    navigate(path);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  useEffect(() => {
    async function getdata() {
      setloading(true);
      setHasError(false);
      try {
        const movies = await UpcomingMovieRequest();
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
    <>
      <h1 className='hmainpopmovie'>Upcoming Movies </h1>
      <div className='slider-container2'>
        {loading ? <div> loading...</div> : null}
        {error ? <Error /> : null}
        <Slider {...settings}>
          {Data?.map((movies) => (
            <div
              key={movies.id}
              onClick={() => routeChange(movies, movies.title ? "movie" : "tv")}
            >
              <div
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${movies.poster_path})`,
                  cursor: "pointer",
                }}
                className='popcard'
              >
                <div class='overlay'>
                  <span className='spanmovie'>{movies.title}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
