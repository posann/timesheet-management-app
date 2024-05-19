import { ProjectResponseData } from "@/types";
import { BASE_URL_BACKEND } from "../constant";

export const GetProject = async (): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL_BACKEND}/api/projects`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
