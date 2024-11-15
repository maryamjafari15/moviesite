import { AccessTokenAuth , BASE_URL } from "./constants.js";


export async function DiscoverMovieRequest(currentPage) {
  const response = await fetch(
    `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc`,
    {
      headers: {
        accept: "application/json",
        Authorization: AccessTokenAuth,
      },
    }
  );
  const data = await response.json();

  // console.log(data.results);
  
  return (data.results);
  
}


export async function GenreMovieRequest() {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?language=en`,
      {
        headers: {
          accept: "application/json",
          Authorization: AccessTokenAuth,
        },
      }
    );
    const data = await response.json();
  
    // console.log(data);
    
    return (data.genres);
    
  }


  export async function getMoviesWithGenres(currentPage) {
    const movies = await DiscoverMovieRequest(currentPage);
    const genres = await GenreMovieRequest();
  
    const moviesWithGenres = movies.map((movie) => {
      const movieGenres = movie.genre_ids.map((genreId) => {
        const genre = genres.find((genre) => genre.id === genreId);
        return genre ? genre.name : null; 
      }).filter(Boolean); 
  
      return { ...movie, genres: movieGenres };
    });
  
    return moviesWithGenres;
  }
  
