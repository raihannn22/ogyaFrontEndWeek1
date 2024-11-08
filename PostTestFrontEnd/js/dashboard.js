function fetchApi(url, method = "GET", data = null) {
  const token = localStorage.getItem("token");
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  // Jika ada data (misal untuk POST atau PUT), tambahkan body dalam JSON format
  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return response.json(); // Ubah respons menjadi JSON
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error; // Lempar error ke tingkat yang lebih tinggi
    });
}

fetchApi("http://localhost:8081/job/get/count", "GET").then((data) => {
  const dataJob = document.getElementById("data-job");
  dataJob.innerHTML = `${data.content.total_job}`;

  console.log(data.content);
  listJob = data.content;
});

fetchApi("http://localhost:8081/job/get/count", "GET").then((data) => {
  const dataJob = document.getElementById("data-job");
  dataJob.innerHTML = `${data.content.total_job}`;

  console.log(data.content);
  listJob = data.content;
});

fetchApi("http://localhost:8081/employee/get/count", "GET").then((data) => {
  const dataJob = document.getElementById("data-emp");
  dataJob.innerHTML = `${data.content.total_employee}`;

  console.log(data.content);
  listJob = data.content;
});

fetchApi("http://localhost:8081/department/get/count", "GET").then((data) => {
  const dataJob = document.getElementById("data-dept");
  dataJob.innerHTML = `${data.content.total_department}`;

  console.log(data.content);
  listJob = data.content;
});
