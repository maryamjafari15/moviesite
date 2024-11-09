import { AccessTokenAuth , BASE_URL } from "./constants.js";


export async function DiscoverMovieRequest() {
  const response = await fetch(
    `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
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

export async function TrendingMovieRequest() {
  const response = await fetch(
    `${BASE_URL}/trending/all/week?language=en-US`,
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


export async function PopularMovieRequest() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?language=en-US&page=2`,
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
export async function LatestTrailerMovieRequest() {
  const response = await fetch(
    `${BASE_URL}/movie/latest`,
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
export async function UpcomingMovieRequest() {
  const response = await fetch(
    `${BASE_URL}/movie/upcoming?language=en-US&page=1`,
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
