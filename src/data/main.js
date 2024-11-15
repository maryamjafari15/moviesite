import { AccessTokenAuth , BASE_URL } from "./constants.js";


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
    `${BASE_URL}/movie/popular?language=en-US&page=1`,
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

export async function PopularPeopleRequest() {
  const response = await fetch(
    `${BASE_URL}/person/popular?language=en-US&page=1`,
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