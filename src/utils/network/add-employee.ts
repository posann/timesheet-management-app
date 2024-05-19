import { BASE_URL_BACKEND } from "../constant";

export const AddEmployee = async (name: string, rate: number): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL_BACKEND}/api/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        rate,
      }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
