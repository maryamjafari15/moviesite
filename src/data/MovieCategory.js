import { AccessTokenAuth, BASE_URL } from "./constants.js";

export async function MoviesByCategoryRequest(category, currentPage ,selectedGenre = "") {
  const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : "";
  const response = await fetch(
    `${BASE_URL}/movie/${category}?language=en-US&page=${currentPage}&sort_by=popularity.desc${genreQuery}`,
    {
      headers: {
        accept: "application/json",
        Authorization: AccessTokenAuth,
      },
    }
  );
  console.log("Selected Genre:", selectedGenre);
console.log("Genre Query:", genreQuery);
  const data = await response.json();
  return data;
} 

export async function GenreMovieRequest() {
  const response = await fetch(`${BASE_URL}/genre/movie/list?language=en`, {
    headers: {
      accept: "application/json",
      Authorization: AccessTokenAuth,
    },
  });
  const data = await response.json();
  return data.genres;
}

export async function getMoviesWithGenresAndCategory(currentPage, selectedGenre = "", category = "") {
  const movies = await MoviesByCategoryRequest(category, currentPage, selectedGenre );
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
