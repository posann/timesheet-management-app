import { BASE_URL_BACKEND } from "../constant";

export const GetActivity = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL_BACKEND}/api/activities/${id}`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
