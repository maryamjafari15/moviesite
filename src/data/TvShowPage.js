import { AccessTokenAuth, BASE_URL } from "./constants.js";

export async function TvShowByCategoryRequest(
  category = "popular",
  currentPage = 1,
  selectedGenre = "",
  minDate = "",
  maxDate = ""
) {
  const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : "";
  const dateQuery =
    minDate && maxDate
      ? `&air_date.lte==${maxDate}&air_date.gte=${minDate}`
      : "";
  let EndPointMovie2 = `${BASE_URL}/discover/tv?include_adult=false&language=en-US&page=${currentPage}${dateQuery}${genreQuery}`;

  if (category === "popular") {
    EndPointMovie2  += "&sort_by=popularity.desc";
  } else if (category === "on TV") {
    EndPointMovie2  += `&sort_by=popularity.desc&with_type=2|3`;
  }else if (category=== "top_rated") {
    EndPointMovie2 += "&sort_by=vote_average.desc&vote_count.gte=200";
  }else if(category==="Airing Today") {
    const today = new Date().toISOString().split("T")[0];
    EndPointMovie2 +=`&sort_by=popularity.desc&air_date.lte=${today}&air_date.gte=${today}`
  }


  const response = await fetch(EndPointMovie2 , {
    headers: {
      accept: "application/json",
      Authorization: AccessTokenAuth,
    },
  });
  

  const data = await response.json();
  
  return data;
}
//https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&air_date.lte={max_date}&air_date.gte={min_date}
//https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&air_date.lte={max_date}&air_date.gte={min_date}
//https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc
//https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200