
import { AccessTokenAuth , BASE_URL } from "./constants.js";

export async function DetailsPeopleRequest (id) {
    const response = await fetch(

        `${BASE_URL}/person/${id}?language=en-US`,
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

export async function DetailsPeopleMovieRequest (id) {
    const response = await fetch(

        `${BASE_URL}/person/${id}/combined_credits?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: AccessTokenAuth,
      },
    }
    );
    const data = await response.json();

    return data.cast;
}

export async function DetailsPeopleImagesRequest (id) {
    const response = await fetch(

        `${BASE_URL}/person/${id}/images`,
    {
      headers: {
        accept: "application/json",
        Authorization: AccessTokenAuth,
      },
    }
    );
    const data = await response.json();

    return data.profiles;
}
