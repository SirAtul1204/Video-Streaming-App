import { BACKEND_URL } from "@/utils/constants";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [isAuth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(BACKEND_URL + "/user/verify", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        setAuth(response.status === 200);
      })
      .catch((err) => {
        setAuth(false);
      });
  }, []);

  return isAuth;
}
