import { AccessTokenAuth , BASE_URL } from "./constants.js";

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
  
    console.log(data);
    
    return (data);
    
  }
  GenreMovieRequest()