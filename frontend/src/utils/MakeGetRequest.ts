import { BACKEND_URL } from "./constants";

export default async function MakeGetRequest(url: string) {
  const response = await fetch(BACKEND_URL + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  return data;
}
