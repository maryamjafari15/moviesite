import { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import { LatestTrailerMovieRequest } from "../../data/main";
import { Error } from "../ErrorComponent/ErrorComponent";
import "./LatestTrailers.css";

export function LatestTrailerMovie() {
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
        const popmovies = await LatestTrailerMovieRequest();
        setData(popmovies);
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
      <div className='slider-container2'>
        {loading ? <div> loading...</div> : null}
        {error ? <Error /> : null}
        <Slider {...settings}>
          {Data?.map((movies) => (
            <div key={movies.id}>
             

              <h3 className='hpopmovie'>{movies.title}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
