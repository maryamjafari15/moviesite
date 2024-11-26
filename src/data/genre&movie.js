import { AccessTokenAuth , BASE_URL } from "./constants.js";

export async function DiscoverMovieRequest(currentPage, selectedGenre = "") {
  const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : "";
  const response = await fetch(
    `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc${genreQuery}`,
    {
      headers: {
        accept: "application/json",
        Authorization: AccessTokenAuth,
      },
    }
  );
  const data = await response.json();
  return data;
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


  export async function getMoviesWithGenres(currentPage, selectedGenre = "") {
    const movies = await DiscoverMovieRequest(currentPage, selectedGenre);
    const genres = await GenreMovieRequest();
  
    const moviesWithGenres = movies.results.map((movie) => {
      const movieGenres = movie.genre_ids
        .map((genreId) => {
          const genre = genres.find((genre) => genre.id === genreId);
          return genre ? genre.name : null;
        })
        .filter(Boolean);
  
      return { ...movie, genres: movieGenres };
    });
  
    return {
      data: moviesWithGenres,
      total_pages: movies.total_pages,
    };
  }