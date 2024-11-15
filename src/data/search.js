import {API_KEY , BASE_URL  , AccessTokenAuth} from "./constants"

export async function SearchMovieRequest(query) {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
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
