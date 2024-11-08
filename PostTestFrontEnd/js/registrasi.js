// function registerUser() {
//   const formData = {
//     FIRST_NAME: document.getElementById("firstName").value,
//     LAST_NAME: document.getElementById("lastName").value,
//     EMAIL: document.getElementById("email").value,
//     PHONE_NUMBER: document.getElementById("phoneNumber").value,
//     HIRE_DATE: new Date(
//       document.getElementById("hireDate").value
//     ).toISOString(),
//     JOB_ID: parseInt(document.getElementById("jobId").value),
//     SALARY: parseFloat(document.getElementById("salary").value),
//     COMMISSION_PCT: parseFloat(document.getElementById("commissionPct").value),
//     MANAGER_ID: parseInt(document.getElementById("managerId").value),
//     DEPARTMENT_ID: parseInt(document.getElementById("departmentId").value),
//     PASSWORD: document.getElementById("password").value,
//   };

//   axios
//     .post("http://localhost:8081/employee/create", formData)
//     .then((response) => {
//       alert("Registrasi berhasil!");
//       console.log(response.data);
//       window.location.href = "login.html";
//     })
//     .catch((error) => {
//       alert("Registrasi gagal, silakan coba lagi.");
//       console.error(error);
//     });
// }
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

function registerEmployee() {
  // Data yang akan diperbarui
  const createdEmployee = {
    FIRST_NAME: document.getElementById("firstName").value,
    LAST_NAME: document.getElementById("lastName").value,
    EMAIL: document.getElementById("email").value,
    PHONE_NUMBER: document.getElementById("phoneNumber").value,
    HIRE_DATE: new Date(
      document.getElementById("hireDate").value
    ).toISOString(),
    JOB_ID: parseInt(document.getElementById("jobId").value),
    SALARY: parseFloat(document.getElementById("salary").value),
    COMMISSION_PCT: parseFloat(document.getElementById("commissionPct").value),
    MANAGER_ID: parseInt(document.getElementById("managerId").value),
    DEPARTMENT_ID: parseInt(document.getElementById("departmentId").value),
    PASSWORD: document.getElementById("password").value,
  };

  // Lakukan update berdasarkan currentEmployeeId
  fetchApi(`http://localhost:8081/employee/create`, "POST", createdEmployee)
    .then(() => {
      alert("Registrasi berhasil!");
      window.location.href = "login.html";
      // Refresh data employee
    })
    .catch((error) => console.error("Error updating employee:", error));
}

fetchApi("http://localhost:8081/department/get/all", "GET").then((data) => {
  const dataDepartment = document.getElementById("departmentId");
  dataDepartment.innerHTML = "";

  listDepartment = data.content;

  data.content.forEach((dept) => {
    dataDepartment.innerHTML += `
      <option value="${dept.departmentId}">${dept.DEPARTMENT_NAME}</option>
      `;
  });
});

fetchApi("http://localhost:8081/job/get/all", "GET")
  .then((data) => {
    const dataJob = document.getElementById("jobId");
    dataJob.innerHTML = "";

    listJob = data.content;

    data.content.forEach((job) => {
      dataJob.innerHTML += `
      <option value="${job.jobId}">${job.JOB_TITLE}</option>
      `;
    });
  })
  .catch((error) => console.error(error));

document.getElementById("hireDate").max = new Date()
  .toISOString()
  .split("T")[0];
