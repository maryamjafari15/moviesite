import { AccessTokenAuth , BASE_URL } from "./constants.js";


export async function DiscoverTvShowRequest(currentPage) {
  const response = await fetch(
    `${BASE_URL}/discover/tv?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc`,
    {
      headers: {
        accept: "application/json",
        Authorization: AccessTokenAuth,
      },
    }
  );
  const data = await response.json();

  // console.log(data.results);
  
  return data;
  
}


export async function GenreTvShowRequest() {
    const response = await fetch(
      `${BASE_URL}/genre//tv/list?language=en`,
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


  export async function getTvshowsWithGenres(currentPage) {
    const Tvshows = await DiscoverTvShowRequest(currentPage);
    const genres = await GenreTvShowRequest();
  
    const TvshowsWithGenres = Tvshows.results.map((TvShow) => {
      const TvshowGenres = TvShow.genre_ids.map((genreId) => {
        const genre = genres.find((genre) => genre.id === genreId);
        return genre ? genre.name : null; 
      }).filter(Boolean); 
  
      return { ...TvShow, genres: TvshowGenres };
    });
  
    return {
      data:TvshowsWithGenres,
      total_pages:Tvshows.total_pages,
    };
  }
  
