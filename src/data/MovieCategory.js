import { AccessTokenAuth, BASE_URL } from "./constants.js"; 


export async function getNowPlayingDates() {
  const response = await fetch(`${BASE_URL}/movie/now_playing?language=en-US&page=1`, {
    headers: {
      accept: "application/json",
      Authorization: AccessTokenAuth,
    },
  });

  const data = await response.json();
  return data.dates; 
}
export async function getupcomingDates() {
  const response = await fetch(`${BASE_URL}/movie/upcoming?language=en-US&page=1`, {
    headers: {
      accept: "application/json",
      Authorization: AccessTokenAuth,
    },
  });

  const data = await response.json();
  return data.dates; 
}

export async function MoviesByCategoryRequest(
  category = "popular",
  currentPage = 1,
  selectedGenre = "",
  minDate = "",
  maxDate = "",
  signal = null
) {
  const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : "";
  const dateQuery =
    minDate && maxDate
      ? `&release_date.gte=${minDate}&release_date.lte=${maxDate}`
      : "";
  let EndPointMovie = `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}${dateQuery}${genreQuery}`;

  if (category === "popular") {
    EndPointMovie  += "&sort_by=popularity.desc";
  } else if (category === "now_playing") {
    EndPointMovie  += `&sort_by=popularity.desc&with_release_type=2|3`;
  }else if (category=== "top_rated") {
    EndPointMovie += `&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`;
  }else if(category==="upcoming") {
    EndPointMovie +="&sort_by=popularity.desc&with_release_type=2|3"
    
  }


  const response = await fetch(EndPointMovie , {
    headers: {
      accept: "application/json",
      Authorization: AccessTokenAuth,
    },
    signal,
  });
  

  const data = await response.json();


  return data;
}

// ("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}");
// ("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc");
// ("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200");
// ("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}");
