import { ActivityResponseData } from "@/types";
import { BASE_URL_BACKEND } from "../constant";

export const UpdateActivity = async (
  id: number,
  data: ActivityResponseData
) => {
  try {
    const response = await fetch(`${BASE_URL_BACKEND}/api/activities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
