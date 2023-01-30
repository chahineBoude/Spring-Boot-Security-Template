import { Navigate } from "react-router-dom";

function ajax(url, jwt, requestmethod, requestbody) {
  const fetchData = {
    headers: {
      "Content-Type": "application/json",
    },
    method: requestmethod,
  };

  if (jwt) fetchData.headers.Authorization = `Bearer ${jwt}`;

  if (fetchData.method === "POST" || fetchData.method === "PUT")
    fetchData.body = JSON.stringify(requestbody);

  return fetch(url, fetchData).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else if (
      response.status === 403 &&
      url.includes("http://localhost:8080/api/assignments/")
    ) {
      return <Navigate to="/dashboard" />;
    }
  });
}

export default ajax;
