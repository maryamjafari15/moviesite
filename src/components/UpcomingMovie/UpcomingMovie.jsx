import { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import { UpcomingMovieRequest } from "../../data/main";
import { Error } from "../ErrorComponent/ErrorComponent";
import "./UpcomingMovie.css";


export function UpcomingMovie() {
  const [Data, setData] = useState([]);
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
    < >
    <h1 className="hmainpopmovie">Upcoming Movies  </h1>
    <div className='slider-container2'>
      {loading ? <div> loading...</div> : null}
      {error ? <Error /> : null}
      <Slider {...settings}>
        {Data?.map((movies) => (
          <div  key={movies.id}>
            <div
            style={{
                backgroundImage : `url(https://image.tmdb.org/t/p/w500${movies.poster_path})`,cursor:"pointer"}} className="popcard">

            <h3 className="hpopmovie">{movies.title}</h3>
           </div>
          </div>
        ))}
      </Slider>
    </div>
    </>
  );
}