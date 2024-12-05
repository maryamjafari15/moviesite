import { useState, useEffect } from "react";
import { MoviesByCategoryRequest } from "../../data/MovieCategory";
import { Error } from "../ErrorComponent/ErrorComponent";
import { MovieBtn } from "../MovieBtn/MovieBtn";
import { useNavigate } from "react-router-dom";
import numeral from "numeral";
import { Pagination } from "../Pagination/Pagination";
import { ProgressChart } from "../ProgressChart/ProgressChart";
import "./MoviePage.css";
import { MoviePageSide } from "../MoviePageSide/MoviePageSide";

export function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("popular");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  // const[Date , setDate]=useState("")

  // console.log(Date)

  const Genres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
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
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];
  const navigate = useNavigate();
  const routeChange = (movie, mediaType) => {
    let encodedTitle = encodeURIComponent(movie.title || movie.name);
    let path = `/MovieDetails/${mediaType}/${encodedTitle}/${
      movie.id
    }}`;
    navigate(path);
  };

  useEffect(() => {
    async function getdata() {
      setLoading(true);
      setError(false);
      try {
        const movies = await MoviesByCategoryRequest(
          category,
          currentPage,
          selectedGenre,
          minDate,
          maxDate
        );
        setMovies(movies.results);
        setTotalPages(movies.total_pages);
        // setDate(movies.dates);
        
      } catch {
        setError(true);
      } finally {
        setLoading(false);
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
        <h1 className='headerPageMovie'>Movies</h1>
        <div className='header-container2'>
          <MovieBtn setCategory={setCategory} />
        </div>
      </div>

      <div className='flex'>
        <MoviePageSide
          setSelectedGenre={setSelectedGenre}
          setMinDate={setMinDate}
          setMaxDate={setMaxDate}
          type={"movie"}
        />

        <div className='movies2'>
        {loading ? <div className="discoverLoading"> loading... </div> : null}
          <div className='movie-grid2'>
            
            {movies?.map((movie) => (
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
                  {" "}
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
