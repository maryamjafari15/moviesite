import { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import { PopularMovieRequest } from "../../data/main";
import { Error } from "../ErrorComponent/ErrorComponent";
import "./Popularmovie.css";


export function PopularMovie() {
  const [popData, setpopData] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setHasError] = useState(false);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    async function getdata() {
      setloading(true);
      setHasError(false);
      try {
        const popmovies = await PopularMovieRequest();
        setpopData(popmovies);
      } catch {
        setHasError(true);
      } finally {
        setloading(false);
      }
    }
    getdata();
  }, []);

  return (
    < >
    <h1 className="hmainpopmovie">Popular Movies  </h1>
    <div className='slider-container2'>
      {loading ? <div> loading...</div> : null}
      {error ? <Error /> : null}
      <Slider {...settings}>
        {popData?.map((movies) => (
          <div  key={movies.id}>
            <div
            style={{
                backgroundImage : `url(https://image.tmdb.org/t/p/w500${movies.poster_path})`,}} className="popcard">

            <h3 className="hpopmovie">{movies.title}</h3>
           </div>
          </div>
        ))}
      </Slider>
    </div>
    </>
  );
}
