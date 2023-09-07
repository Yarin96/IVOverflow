import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  return redirect("/");
}

export function loader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/");
  }

  return null;
}
