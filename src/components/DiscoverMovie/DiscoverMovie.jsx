import { useState, useEffect } from "react";
import { getMoviesWithGenres } from "../../data/genre&movie";
import { Error } from "../ErrorComponent/ErrorComponent";
import "./DiscoverMovie.css";
import { GenreBtn } from "../GenreBtn/GenreBtn";
import { useNavigate } from "react-router-dom";
import numeral from "numeral";
import { Pagination } from "../Pagination/Pagination";
import { ProgressChart } from "../ProgressChart/ProgressChart";

export function DiscoverMovie() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total_pages, setTotal_pages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  

  const navigate = useNavigate();
  const routeChange = (movie, mediaType) => {
    let encodedTitle = encodeURIComponent(movie.title || movie.name);
    let path = `/MovieDetails/${mediaType}/${encodedTitle}/${
      movie.id
    }}`;
    navigate(path);
  };

  const Genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ];

  useEffect(() => {
    async function getdata() {
      setloading(true);
      setHasError(false);
      try {
        const movies = await getMoviesWithGenres(currentPage, selectedGenre);
        setData(movies.data);
        setTotal_pages(movies.total_pages);
      } catch {
        setHasError(true);
      } finally {
        setloading(false);
      }
    }

    getdata();
  }, [currentPage, selectedGenre]);

  // useEffect(() => {
    
  //   setCurrentPage(1);
  // }, [selectedGenre]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // console.log("test", currentPage , data)
  // const filteredMovies = selectedGenre
  //   ? data.filter((movie) =>
  //       movie.genre_ids.some((genre) => genre === Number(selectedGenre))
  //     )
  //   : data;
  const getGenreNameById = (id) => {
    const genre = Genres.find((genre) => genre.id === id);
    return genre ? genre.name : "";
  };

  const getMovieGenres = (movieGenres) => {
    return movieGenres
      .map((genreId) => getGenreNameById(genreId))
      .filter((genreName) => genreName)
      
  };

  console.log("Movie Data:", data);

  return (
    <div className='movies'>
      <div className='header-container'>
        <h2>Movies</h2>
        <GenreBtn setSelectedGenre={setSelectedGenre} />
      </div>
      <hr />
      <div className='movie-grid'>
        {loading ? <div> loading... </div> : null}
        {error ? <Error /> : null}
        {data?.map((movie) => (
          <div
            className='movie-card'
            key={movie.id}
            onClick={() => routeChange(movie, movie.title ? "movie" : "tv")}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            {/* <div className='tag'>{movie.genres.slice(0, 1)}</div> */}
            <div className="tag">
                {selectedGenre
                  ? getGenreNameById(selectedGenre)
                  : (getMovieGenres(movie.genre_ids)).slice(0,1)}
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
      <Pagination
        currentPage={currentPage}
        totalPages={total_pages}
        paginate={paginate}
      />
    </div>
  );
}
