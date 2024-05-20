import { BASE_URL_BACKEND } from "../constant";

export const GetProjectByID = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL_BACKEND}/api/projects/${id}`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
