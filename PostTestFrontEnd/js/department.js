var listDepartment = [];
var FilteredListDepartment = [];

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
}

function searchEmployee() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  // Filter ListEmployee berdasarkan searchTerm
  const FilteredDepartment = listDepartment.filter((dept) => {
    return (
      dept.DEPARTMENT_NAME.toLowerCase().includes(searchTerm) 
    );
  });

  // Tampilkan hasil pencarian di tabel
  loadPage(1, FilteredDepartment);
}

// Contoh penggunaan untuk berbagai metode
// GET

async function getDepartment() {
  const data = await fetchApi("http://localhost:8081/department/get/all", "GET");
  listDepartment = data.content;
  FilteredListDepartment = listDepartment;
}


function displayDepartments (departmentlist) {
  const dataDepartment = document.getElementById("data-dept");
  dataDepartment.innerHTML = "";

  departmentlist.forEach((dept) => {
    console.log(dept);
    dataDepartment.innerHTML += `
    <tr>
            <td>${dept.departmentId}</td>
            <td>${dept.DEPARTMENT_NAME}</td>
            <td>${dept.MANAGER_ID}</td>
            <td>${dept.LOCATION_ID}</td>
            <td> <a href='#' class="btn btn-danger" onclick='deleteDepartment(${dept.departmentId})'> hapus</a> </td>
            <td> <a href='#' class="btn btn-info" onclick='showUpdateForm(${dept.departmentId})'> edit</a> </td>
      </tr>
    `;
  });
}



let currentDepartmentId = null;

showUpdateForm = (id) => {
  currentDepartmentId = id;
  console.log(currentDepartmentId);

  const departmentData = listDepartment.find((dept) => dept.departmentId === id);
  console.log(departmentData);
  document.getElementById("departmentName").value = departmentData.DEPARTMENT_NAME;
  document.getElementById("managerId").value = departmentData.MANAGER_ID;
  document.getElementById("locationId").value = departmentData.LOCATION_ID;
  // window.location.replace() = `/PostTestFrontEnd/html/registrasi_update.html?id=${id}`;
  var myModal = new bootstrap.Modal(
    document.getElementById("departmentModal"),
    {
      keyboard: false,
    }
  );
  const myButton = document.getElementById("SbmtBttn")
  myButton.addEventListener("click", () => {
    updateDepartment();
  })
  myModal.show();
};

showCreateForm = ()  => {
  document.getElementById("departmentName").value = null;
  document.getElementById("managerId").value = null;
  document.getElementById("locationId").value = null;
  var myModal = new bootstrap.Modal(
    document.getElementById("departmentModal")
  );
  const myButton = document.getElementById("SbmtBttn")
  myButton.addEventListener("click", () => createDepartment())
  myModal.show();
};




function updateDepartment() {
  console.log(currentDepartmentId);
  // Data yang akan diperbarui
  const updatedDepartment = {
    DEPARTMENT_NAME: document.getElementById("departmentName").value,
    MANAGER_ID: document.getElementById("managerId").value,
    LOCATION_ID: document.getElementById("locationId").value,
  };

  // Lakukan update berdasarkan currentDepartmentId
  fetchApi(
    `http://localhost:8081/department/update/${currentDepartmentId}`,
    "PATCH",
    updatedDepartment
  )
    .then(() => {
      alert("Department updated successfully!");
      window.location.reload() = `/PostTestFrontEnd/html/department.html`
    })
}


function createDepartment() {
  console.log("currentDepartmentId");
  // Data yang akan diperbarui
  const createdDepartment = {
    DEPARTMENT_NAME: document.getElementById("departmentName").value,
    MANAGER_ID: document.getElementById("managerId").value,
    LOCATION_ID: document.getElementById("locationId").value,
  };

  // Lakukan update berdasarkan currentDepartmentId
  fetchApi(
    `http://localhost:8081/department/create`,
    "POST",
    createdDepartment
  )
    .then(() => {
      alert("Department created successfully!");
      window.location.reload() = `/PostTestFrontEnd/html/department.html`
      document.getElementById("update-employee-form").style.display = "none";
    })
}


// Fungsi untuk menghapus data employee berdasarkan departmentId
function deleteDepartment(departmentId) {
  // Konfirmasi penghapusan
  const confirmation = confirm(`Are you sure you want to delete department with ID ${departmentId}?`);
  if (!confirmation) return; // Jika pengguna membatalkan, hentikan proses


  // Kirim permintaan DELETE ke API untuk menghapus data dari server
  fetch(`http://localhost:8081/department/delete/${departmentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete Department');
    }
    console.log(`Department with ID ${departmentId} deleted successfully`);
    window.location.reload() = `/PostTestFrontEnd/html/department.html`
  })
}

function logout() {
  // Menghapus token dari localStorage
  localStorage.removeItem('token');

  // Menampilkan pesan dan mengarahkan ke halaman login
  window.location.href = 'login.html'; // Ganti dengan halaman login Anda
}


let currentPage = 1;
const itemsPerPage = 2;

async  function loadPage(pageNumber, list) {
  currentPage = pageNumber;
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const employeesForPage = list.slice(startIndex, endIndex);

  displayDepartments(employeesForPage);
  updatePaginationControls(pageNumber, list.length);
}
function updatePaginationControls(pageNumber, totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    document.getElementById("prevButton").disabled = pageNumber === 1;
    document.getElementById("pageCount").textContent = pageNumber;
    document.getElementById("nextButton").disabled = pageNumber === totalPages;
}

async function initializeDepartment() {
  try {
    await getDepartment();
    loadPage(1, listDepartment);

    document
      .getElementById("prevButton")
      .addEventListener("click", () =>
        loadPage(currentPage - 1, listDepartment)
      );
    document
      .getElementById("nextButton")
      .addEventListener("click", () =>
        loadPage(currentPage + 1, listDepartment)
      );
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
}

window.addEventListener("load", () => {
  initializeDepartment();
});