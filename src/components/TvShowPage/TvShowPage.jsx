import { useState, useEffect } from "react";
import {  getTvshowsWithGenres } from "../../data/genre&tvshow";
import { Error } from "../ErrorComponent/ErrorComponent";
import { GenreBtn } from "../GenreBtn/GenreBtn";
import { useNavigate } from "react-router-dom";
import numeral from "numeral";
import { Pagination } from "../Pagination/Pagination";
import { ProgressChart } from "../ProgressChart/ProgressChart";
export function TvShowPage (){

  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
 const [total_pages , setTotal_pages] =useState(1);
 const [selectedGenre, setSelectedGenre] = useState("");

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
        const movies = await  getTvshowsWithGenres(currentPage);
        setData(movies.data);
        setTotal_pages(movies.total_pages);
      } catch {
        setHasError(true);
      } finally {
        setloading(false);
      }
    }

    getdata();
  }, [currentPage]);



  const paginate = (pageNumber) => setCurrentPage(pageNumber);

// console.log("test", currentPage , data)
const filteredMovies = selectedGenre
? data.filter((movie) =>
    movie.genres.some((genre) => genre === selectedGenre)
  )
: data;

  return (
    <div className='movies'>
      <div className='header-container'>
        <h2>Tv-Shows</h2>
        <GenreBtn  setSelectedGenre={setSelectedGenre} />
      </div>
      <hr />
      <div className='movie-grid'>
        {loading ? <div> loading... </div> : null}
        {error ? <Error /> : null}
        {filteredMovies?.map((movie) => (
          <div className='movie-card' key={movie.id} onClick={ () => routeChange(movie, movie.title ? "movie" : "tv")}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className='tag'>{movie.genres.slice(0, 1)}</div>
            <div className="flex justify-center items-center "
            style={{marginTop:"-20px", opacity:"100%"}}>
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