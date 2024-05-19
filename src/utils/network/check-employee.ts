import { BASE_URL_BACKEND } from "../constant";

export const CheckEmployeeActive = async () => {
  const response = await fetch(`${BASE_URL_BACKEND}/api/employees/check`);
  return response.json();
};
