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

// Contoh penggunaan untuk berbagai metode

// GET
fetchApi("http://localhost:8081/employee/get/all")
  .then((data) => {
    const dataEmployee = document.getElementById("data-emp");
    dataEmployee.innerHTML = "";

    data.content.forEach((emp) => {
      console.log(emp);
      dataEmployee.innerHTML += `
      <tr>
              <td>${emp.employeeId}</td>
              <td>${emp.FIRST_NAME} ${emp.LAST_NAME}</td>
              <td>${emp.EMAIL}</td>
              <td>${emp.PHONE_NUMBER}</td>
              <td>${emp.HIRE_DATE}</td>
              <td>${emp.JOB_ID}</td>
              <td>${emp.SALARY}</td>
        </tr>
      `;

      // readDepartment.innerHTML+=
      // `<tr>
      //   <td>${department.department_id}</td>
      //   <td>${department.department_name}</td>
      //   <td>${department.manager_id}</td>
      //   <td>${department.location_id}</td>
      // </tr>`
    });
  })
  .catch((error) => console.error(error));
