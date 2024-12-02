import { AccessTokenAuth, BASE_URL } from "./constants.js";

export async function fetchAllDetails(id) {
  const headers = {
    accept: "application/json",
    Authorization: AccessTokenAuth,
  };

  try {
    const [profileResponse, creditsResponse, imagesResponse] = await Promise.all([
      fetch(`${BASE_URL}/person/${id}?language=en-US`, { headers }),
      fetch(`${BASE_URL}/person/${id}/combined_credits?language=en-US`, { headers }),
      fetch(`${BASE_URL}/person/${id}/images`, { headers }),
    ]);

    const [profile, credits, images] = await Promise.all([
      profileResponse.json(),
      creditsResponse.json(),
      imagesResponse.json(),
    ]);

    return {
      profile,
      movies: credits.cast,
      images: images.profiles,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
