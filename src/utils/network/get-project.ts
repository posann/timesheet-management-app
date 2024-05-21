import { ProjectResponse, ProjectResponseData } from "@/types";
import { BASE_URL_BACKEND } from "../constant";

export const GetProject = async () => {
  try {
    const response = await fetch(`${BASE_URL_BACKEND}/api/projects`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
