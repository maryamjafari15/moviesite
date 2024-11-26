import "./ActorProfile.css";
import {
  DetailsPeopleRequest,
  DetailsPeopleMovieRequest,
  DetailsPeopleImagesRequest,
} from "../../data/detailsPeople.js";
import { useEffect, useState } from "react";
import { Error } from "../ErrorComponent/ErrorComponent.jsx";
import Slider from "react-slick";

export function ActorProfile(props) {
  const results = props.peopleID;

  const [profileData, setProfileData] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setHasError] = useState(false);

  // console.log(profileData);
  useEffect(() => {
    async function getData() {
      setloading(true);
      setHasError(false);
      try {
        const [profile, movies, images] = await Promise.all([
          DetailsPeopleRequest(results),
          DetailsPeopleMovieRequest(results),
          DetailsPeopleImagesRequest(results),
        ]);
        setProfileData(profile);
        setMoviesData(movies);
        setImagesData(images);
      } catch {
        setHasError(true);
      } finally {
        setloading(false);
      }
    }
    getData();
  }, []);
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
  const validBackdropPath =
    moviesData.find((movie) => movie?.backdrop_path)?.backdrop_path || "";
  return (
    <>
      {loading ? <div> Loading... </div> : null}
      {error ? <Error /> : null}

      <div>
        <div className='backgroundofpeopledetails'>
          <img
            src={`https://image.tmdb.org/t/p/original${validBackdropPath}`}
            alt='Actor'
          />
        </div>
        <div className='sec1-people'>
          <div className='titlepeople'>
            <h1>{profileData?.name}</h1>
            <p> {profileData?.birthday} </p>
          </div>
          <div className='imgpeople2'>
            <img
              src={`https://image.tmdb.org/t/p/original${imagesData[0]?.file_path}`}
              alt='actor'
              className='imageofstar'
            />
          </div>
        </div>
        <div className='sec1-people2'>
          <section className='sec1-people2-2'>
            <div className='peopledetailcard'>
              {imagesData?.slice(1, 7).map((people, index) => (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/original${people.file_path}`}
                  className='imageofstar2'
                  alt='img'
                />
              ))}
            </div>
          </section>
          <section className='sec1-people2-1'>
            <h2> Biography</h2>
            <p>{profileData?.biography}</p>
          </section>
        </div>
        <section className='sec1-people3 slider-container2'>
          <h2>Filmography</h2>
          <Slider {...settings}>
            {moviesData?.map((movies) => (
              <div
                key={movies.id}
                onClick={() => routeChange(movies.title, movies.id)}
              >
                <div
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${movies.poster_path})`,
                    cursor: "pointer",
                  }}
                  className='popcard'
                ></div>
              </div>
            ))}
          </Slider>
        </section>
      </div>
    </>
  );
}
