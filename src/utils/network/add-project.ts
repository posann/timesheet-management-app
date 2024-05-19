import { BASE_URL_BACKEND } from "../constant";

export const AddProject = async (name: string) => {
  try {
    const response = await fetch(`${BASE_URL_BACKEND}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
