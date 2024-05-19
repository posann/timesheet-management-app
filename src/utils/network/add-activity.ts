import { BASE_URL_BACKEND } from "../constant";

export const AddActivityData = async (
  title: string,
  id_project: number,
  id_employee: number,
  dateStart: string,
  dateEnd: string,
  timeStart: string,
  timeEnd: string,
  duration: string
) => {
  try {
    const response = await fetch(`${BASE_URL_BACKEND}/api/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        dateStart,
        dateEnd,
        timeStart,
        timeEnd,
        id_project,
        id_employee,
        duration,
      }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
