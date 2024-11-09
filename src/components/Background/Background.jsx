import { useEffect, useState } from "react";
import "./background.css";
import Slider from "react-slick";
import { DiscoverMovieRequest } from "../../data/main";
import { Loading } from "../Loading/Loading";
import { Error } from "../ErrorComponent/ErrorComponent";
import { Hero } from "../hero/Hero";

export function Background() {
  const [slidesData, setSlidesData] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setHasError] = useState(false);
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  useEffect(() => {
    async function getdata() {
      setloading(true);
      setHasError(false);
      try {
        const movie = await DiscoverMovieRequest();
        const movies = movie.slice(1, 7);
        setSlidesData(movies);
      } catch {
        setHasError(true);
      } finally {
        setloading(false);
      }
    }

    getdata();
  }, []);
  return (
    <div className='header-slider'>
      {loading ? <Loading /> : null}
      {error ? <Error /> : null}
      <Slider {...settings}>
        {slidesData?.map((movie) => (
          <div key={movie.id}>
            <div
              className='slide'
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
            >
               {" "}
                <Hero data={movie} />{" "}
              <div className='overlayStyle'> </div>
              <div>
               
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
