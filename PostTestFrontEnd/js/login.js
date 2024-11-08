async function loginUser() {
  const loginData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  console.log(loginData);

  const apiUrl = `http://localhost:8081/employee/login?email=${loginData.email}&password=${loginData.password}`;
  //   http://localhost:8081/employee/login?email=admin1%40yahoo.com&password=admin123

  console.log(apiUrl);

  var response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response);

  if (response.ok) {
    const data = await response.text();
    const token = data;
    localStorage.setItem("token", token);
    alert("Login berhasil!");
    window.location.href = "dashboard.html";
  } else {
    alert("Login gagal, silakan coba lagi.");
  }
}
