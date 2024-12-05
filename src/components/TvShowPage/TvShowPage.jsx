import { useState, useEffect } from "react";
import { TvShowByCategoryRequest } from "../../data/TvShowPage";
import { Error } from "../ErrorComponent/ErrorComponent";
import { TvshowBtn } from "../TvshowBtn/TvshowBtn";
import { useNavigate } from "react-router-dom";
import numeral from "numeral";
import { Pagination } from "../Pagination/Pagination";
import { ProgressChart } from "../ProgressChart/ProgressChart";
import { MoviePageSide } from "../MoviePageSide/MoviePageSide";
import "./TvShowPage.css";

export function TvShowPage() {
  const [tvshows, setTvshows] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("popular");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const Genres = [
    {
      id: 10759,
      name: "Action & Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 10762,
      name: "Kids",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10763,
      name: "News",
    },
    {
      id: 10764,
      name: "Reality",
    },
    {
      id: 10765,
      name: "Sci-Fi & Fantasy",
    },
    {
      id: 10766,
      name: "Soap",
    },
    {
      id: 10767,
      name: "Talk",
    },
    {
      id: 10768,
      name: "War & Politics",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

  const navigate = useNavigate();
  const routeChange = (movie, mediaType) => {
    let path = `/MovieDetails/${mediaType}/${movie.title || movie.name}/${
      movie.id
    }}`;
    navigate(path);
  };

  useEffect(() => {
    async function getdata() {
      setloading(true);
      setHasError(false);
      try {
        const tvshows = await TvShowByCategoryRequest(
          category,
          currentPage,
          selectedGenre,
          minDate,
          maxDate
        );
        setTvshows(tvshows.results);
        setTotalPages(tvshows.total_pages);
      } catch {
        setHasError(true);
      } finally {
        setloading(false);
      }
    }

    getdata();
  }, [category, currentPage, selectedGenre, minDate, maxDate]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getGenreNameById = (id) => {
    const genre = Genres.find((genre) => genre.id === id);
    return genre ? genre.name : "";
  };

  const getMovieGenres = (movieGenres) => {
    return movieGenres
      .map((genreId) => getGenreNameById(genreId))
      .filter((genreName) => genreName);
  };

  return (
    <>
      <div className='section1PageMvie'>
        <h1 className='headerPageMovie'>Tv Shows</h1>
        <div className='header-container2'>
          <TvshowBtn setCategory={setCategory} />
        </div>
      </div>

      <div className='flex'>
        <MoviePageSide
          setSelectedGenre={setSelectedGenre}
          setMinDate={setMinDate}
          setMaxDate={setMaxDate}
          type={"tv"}
        />
        <div className='movies2'>
        {loading ? <div className="discoverLoading"> loading... </div> : null}
        <div className='movie-grid2'>
         
          {tvshows?.map((movie) => (
            <div
              className='movie-card2'
              key={movie.id}
              onClick={() => routeChange(movie, movie.title ? "movie" : "tv")}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className='tag'>
                {selectedGenre
                  ? getGenreNameById(selectedGenre)
                  : getMovieGenres(movie.genre_ids).slice(0, 1)}
              </div>

              <div
                className='flex justify-center items-center '
                style={{ marginTop: "-20px", opacity: "100%" }}
              >
                <ProgressChart
                  percentage={(movie.vote_average / 10) * 100}
                  text={numeral(movie.vote_average / 10).format("0 %")}
                />
              </div>
              <div className='movie-title'>{movie.title}</div>
            </div>
          ))}
        </div>
        {loading ? <div className="discoverLoading"> loading... </div> : null}
          {error ? <Error /> : null}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      </div>
      </div>
    </>
  );
}
