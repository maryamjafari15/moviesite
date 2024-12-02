import "./ActorProfile.css";
import { fetchAllDetails } from "../../data/detailsPeople.js";
import { useEffect, useState } from "react";
import { Error } from "../ErrorComponent/ErrorComponent.jsx";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/default-image.png";

export function ActorProfile(props) {
  const results = props.peopleID;

  const navigate = useNavigate();
  const routeChange = (movie, mediaType) => {
    let path = `/MovieDetails/${mediaType}/${movie.title || movie.name}/${
      movie.id
    }}`;
    navigate(path);
  };

  const [profileData, setProfileData] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setHasError] = useState(false);

  // console.log(moviesData);
  useEffect(() => {
    async function getData() {
      setloading(true);
      setHasError(false);
      try {
        const data = await fetchAllDetails(results);
        setProfileData(data.profile);
        setMoviesData(data.movies);
        setImagesData(data.images);
      } catch {
        setHasError(true);
      } finally {
        setloading(false);
      }
    }
    getData();
  }, [results]);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow:Math.min(moviesData.length, 7),
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(moviesData.length, 3),
          slidesToScroll:Math.min(moviesData.length, 3),
         
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow:  Math.min(moviesData.length, 2),
          slidesToScroll: Math.min(moviesData.length, 2),
          initialSlide: Math.min(moviesData.length, 2),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow:  Math.min(moviesData.length, 1),
          slidesToScroll:Math.min(moviesData.length, 1),
        },
      },
    ],
  };
  const validBackdropPath =
    moviesData.find((movie) => movie?.backdrop_path)?.backdrop_path || null;
  

  return (
    <>
      {loading ? <div> Loading... </div> : null}
      {error ? <Error /> : null}

      <div>
        <div className='backgroundofpeopledetails'>
          <img
            src={validBackdropPath
              ? `https://image.tmdb.org/t/p/original${validBackdropPath}`
              : defaultImage}
            alt='Actor'
          />
        </div>
        <div className='sec1-people'>
          <div className='titlepeople'>
            <h1>{profileData?.name || "Unknown Actor"}</h1>
            <p> {profileData?.birthday || "Date not available"} </p>
          </div>
          <div className='imgpeople2'>
            <img
               src={
                imagesData.find((image) => image?.file_path)
                  ? `https://image.tmdb.org/t/p/original${imagesData.find((image) => image?.file_path).file_path}`
                  : "https://via.placeholder.com/300"
              } 
              alt='actor'
              className='imageofstar'
            />
          </div>
        </div>
        <div className='sec1-people2'>
          <section className='sec1-people2-2'>
            <div className='peopledetailcard'>
              {imagesData?.filter((image) => image?.file_path).slice(1, 5).map((people, index) => (
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
            <p>{profileData?.biography || "Biography not available."}</p>
          </section>
        </div>
        <section className='sec1-people3 slider-container2'>
          <h2>Filmography</h2>
          <Slider {...settings}>
            {moviesData?.filter((data) => data?.poster_path).length > 0 ?(
            moviesData?.filter((data)=> data?.poster_path).map((movies) => (
              <div
                key={movies.id}
                onClick={() =>
                  routeChange(movies, movies.title ? "movie" : "tv")
                }
              >
                <div
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${movies.poster_path})`,
                    cursor: "pointer",
                  }}
                  className='popcard4'
                >
                  <div class='overlay'>
                    <span className='spanmovie'>{movies.title||movies.name}</span>
                  </div>
                </div>
              </div>
            ))):
            (
              <div className="no-data-message"> Filmography not available. </div>
            )}
          </Slider>
        </section>
      </div>
    </>
  );
}
