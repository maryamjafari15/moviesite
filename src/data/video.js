import { AccessTokenAuth , BASE_URL } from "./constants.js";

export async function getVideoTrailer(id){

const response = await fetch(`${BASE_URL}/movie/${id}?append_to_response=videos`,
{
  headers: {
    accept: "application/json",
    Authorization: AccessTokenAuth,
  },
}
);

const data = await response.json();
// console.log(data);
return data;


};

