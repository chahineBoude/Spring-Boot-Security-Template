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
    }
  });
}

export default ajax;
