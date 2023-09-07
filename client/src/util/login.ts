import { json, redirect } from "react-router-dom";

export async function action({
  request,
}: {
  request: Request;
}): Promise<Response> {
  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(`http://localhost:8080/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status === 500
  ) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;
  const userName = resData.name;

  localStorage.setItem("token", token);
  localStorage.setItem("userName", userName);

  return redirect("/questions");
}
