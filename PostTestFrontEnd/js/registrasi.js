function registerUser() {
  const formData = {
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

  axios
    .post("http://localhost:8081/employee/create", formData)
    .then((response) => {
      alert("Registrasi berhasil!");
      console.log(response.data);
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert("Registrasi gagal, silakan coba lagi.");
      console.error(error);
    });
}
