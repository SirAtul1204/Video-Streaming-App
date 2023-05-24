import { BACKEND_URL } from "./constants";

export const MakePostRequest = async (url: String, body: any) => {
  const response = await fetch(BACKEND_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return await response.json();
};
