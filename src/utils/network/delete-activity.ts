import { BASE_URL_BACKEND } from "../constant";

export const DeleteActivity = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL_BACKEND}/api/activities/${id}`, {
      method: "DELETE",
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
