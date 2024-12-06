import { useEffect, useState } from "react";
import "./background.css";
import Slider from "react-slick";
import { DiscoverMovieRequest } from "../../data/genre&movie";
import { Loading } from "../Loading/Loading";
import { Error } from "../ErrorComponent/ErrorComponent";
import { Hero } from "../Hero/Hero";
import mobileIMG from "../../assets/mobileIMG.png";
import { SearchBox } from "../SearchBox/SearchBox";
import { useNavigate } from "react-router-dom";

export function Background() {
  const [slidesData, setSlidesData] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setHasError] = useState(false);

  const [query, setQuery] = useState("");    
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert("Please enter a movie, TV show, or person...");
      return;
    }
    navigate(`/SearchResult/${encodeURIComponent(query)}`); 
    setQuery(""); 
  };

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
        const movie = await DiscoverMovieRequest(1);
        const movies = movie.results.slice(1, 7);
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
    <>
      <div className='head-mobile'>
        <img src={mobileIMG} alt='movie' className='headmobileimg' />
        <div>
          <h1>Wellcome!</h1>
          <h3>
          A journey of emotions,
            <br />
            where every scene tells a story.
          </h3>
          <div className="search-box2">
          <SearchBox
            query={query}
            setQuery={setQuery}
            handleSearch={handleSearch}
            
          />
        </div>
        </div>
       
      </div>
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
                <Hero data={movie} /> <div className='overlayStyle'> </div>
                <div></div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
