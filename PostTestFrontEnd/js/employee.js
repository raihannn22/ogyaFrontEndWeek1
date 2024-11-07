var ListEmployee = [];

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

fetchApi("http://localhost:8081/employee/with-department", "GET")
  .then((data) => {
    const dataEmployee = document.getElementById("data-emp");
    dataEmployee.innerHTML = "";

    ListEmployee = data.content;

    data.content.forEach((emp) => {
      console.log(emp);
      dataEmployee.innerHTML += `
      <tr>
              <td>${emp.employee.employeeId}</td>
              <td>${emp.employee.FIRST_NAME} ${emp.employee.LAST_NAME}</td>
              <td>${emp.employee.EMAIL}</td>
              <td>${emp.employee.PHONE_NUMBER}</td>
              <td>${emp.employee.HIRE_DATE}</td>
              <td>${emp.department.DEPARTMENT_NAME}</td>
              <td>${emp.employee.SALARY}</td>
              <td> <a href='#' class="btn btn-danger" onclick='deleteEmployee(${emp.employee.employeeId})'> hapus</a> </td>
              <td> <a href='#' class="btn btn-info" onclick='showUpdateForm(${emp.employee.employeeId})'> edit</a> </td>
        </tr>
      `;
    });
  })
 


let currentEmployeeId = null;

showUpdateForm = (id) => {
  currentEmployeeId = id;
  console.log(currentEmployeeId);

  const employeedata = ListEmployee.find((emp) => emp.employee.employeeId === id);
  document.getElementById("firstName").value = employeedata.employee.FIRST_NAME;
  document.getElementById("lastName").value = employeedata.employee.LAST_NAME;
  document.getElementById("email").value = employeedata.employee.EMAIL;
  document.getElementById("phoneNumber").value = employeedata.employee.PHONE_NUMBER;
  document.getElementById("hireDate").value = employeedata.employee.HIRE_DATE;
  document.getElementById("jobId").value = employeedata.employee.JOB_ID;
  document.getElementById("salary").value = employeedata.employee.SALARY;
  document.getElementById("commissionPct").value = employeedata.employee.COMMISSION_PCT;
  document.getElementById("managerId").value = employeedata.employee.MANAGER_ID;
  document.getElementById("departmentId").value = employeedata.employee.DEPARTMENT_ID;
  document.getElementById("password").value = employeedata.employee.PASSWORD;
  // window.location.replace() = `/PostTestFrontEnd/html/registrasi_update.html?id=${id}`;
  var myModal = new bootstrap.Modal(
    document.getElementById("updateEmployeeModal"),
    {
      keyboard: false,
    }
  );
  const myButton = document.getElementById("SbmtBttn")
  myButton.addEventListener("click", () => {
    updateEmployee();
  })
  myModal.show();
};

showCreateForm = ()  => {
  currentEmployeeId = null;
  document.getElementById("firstName").value = null;
  document.getElementById("lastName").value = null;
  document.getElementById("email").value = null;
  document.getElementById("phoneNumber").value = null;
  document.getElementById("hireDate").value = null;
  document.getElementById("jobId").value = null;
  document.getElementById("salary").value = null;
  document.getElementById("commissionPct").value = null;
  document.getElementById("managerId").value = null;
  document.getElementById("departmentId").value = null;
  document.getElementById("password").value = null;
  var myModal = new bootstrap.Modal(
    document.getElementById("updateEmployeeModal")
  );
  const myButton = document.getElementById("SbmtBttn")
  myButton.addEventListener("click", () => createEmployee())
  myModal.show();
};



function updateEmployee() {
  console.log(currentEmployeeId);
  // Data yang akan diperbarui
  const updatedEmployee = {
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
  fetchApi(
    `http://localhost:8081/employee/update/${currentEmployeeId}`,
    "PATCH",
    updatedEmployee
  )
    .then(() => {
      alert("Employee updated successfully!");
      window.location.reload() = `/PostTestFrontEnd/html/employees.html`
      document.getElementById("update-employee-form").style.display = "none";
      // Refresh data employee
      fetchApi("http://localhost:8081/employee/get/all")
        .then((data) => displayEmployees(data.content))
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error("Error updating employee:", error));
}


function createEmployee() {
  console.log(currentEmployeeId);
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
  fetchApi(
    `http://localhost:8081/employee/create`,
    "POST",
    createdEmployee
  )
    .then(() => {
      alert("Employee created successfully!");
      window.location.reload() = `/PostTestFrontEnd/html/employees.html`
      document.getElementById("update-employee-form").style.display = "none";
      // Refresh data employee
      fetchApi("http://localhost:8081/employee/get/all")
        .then((data) => displayEmployees(data.content))
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error("Error updating employee:", error));
}

// function deteleEmployee(id) {
//   console.log(id);
//   fetchApi(`http://localhost:8081/employee/delete/${id}`, "DELETE")
//     .then(() => {
//       alert("Employee deleted successfully!");
//       window.location.reload() = `/PostTestFrontEnd/html/employees.html`
//     })
//     .catch((error) => console.error("Error deleting employee:", error));
// }

// Fungsi untuk menghapus data employee berdasarkan employeeId
function deleteEmployee(employeeId) {
  // Konfirmasi penghapusan
  const confirmation = confirm(`Are you sure you want to delete employee with ID ${employeeId}?`);
  if (!confirmation) return; // Jika pengguna membatalkan, hentikan proses


  // Kirim permintaan DELETE ke API untuk menghapus data dari server
  fetch(`http://localhost:8081/employee/delete/${employeeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }
    console.log(`Employee with ID ${employeeId} deleted successfully`);
    window.location.reload() = `/PostTestFrontEnd/html/employees.html`
  })
  .catch(error => {
    console.error('Error deleting employee:', error);
    // Tambahkan kembali baris ke tabel jika penghapusan gagal
    const row = document.querySelector(`#data-emp tr[data-employee-id="${employeeId}"]`);
    if (row) {
      row.style.display = '';  // Mengembalikan baris yang dihapus
    }
  });
}

fetchApi("http://localhost:8081/department/get/all", "GET")
  .then((data) => {
    const dataDepartment = document.getElementById("departmentId");
    dataDepartment.innerHTML = "";

    listDepartment = data.content;

    data.content.forEach((dept) => {
      console.log(dept);
      dataDepartment.innerHTML += `
      <option value="${dept.departmentId}">${dept.DEPARTMENT_NAME}</option>
      `;
    });
  })
  .catch((error) => console.error(error));

  fetchApi("http://localhost:8081/job/get/all", "GET")
  .then((data) => {
    const dataJob = document.getElementById("jobId");
    dataJob.innerHTML = "";

    listJob = data.content;

    data.content.forEach((job) => {
      console.log(job);
      dataJob.innerHTML += `
      <option value="${job.jobId}">${job.JOB_TITLE}</option>
      `;
    });
  })
  .catch((error) => console.error(error));
