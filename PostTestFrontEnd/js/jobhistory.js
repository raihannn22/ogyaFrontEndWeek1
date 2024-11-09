// import moment from "PostTestFrontEnd/ItemTemplate/moment.js";

var listJh = [];
var filteredListJh = [];

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

function searchJh() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  // Filter ListEmployee berdasarkan searchTerm
  const filteredJh = listJh.filter((jh) => {
    const name = jh.employee.FIRST_NAME + " " + jh.employee.LAST_NAME
    return (
      name.toLowerCase().includes(searchTerm) 
    );
  });

  // Tampilkan hasil pencarian di tabel
  displayJh(filteredJh);
}
// Contoh penggunaan untuk berbagai metode
// GET

async function getJh() {
  const data = await fetchApi("http://localhost:8081/job-history/with-Employee", "GET");
  listJh = data.content;
  filteredListJh = listJh;
}



  function displayJh(employeeList) {
    const dataJh = document.getElementById("data-jh");
    dataJh.innerHTML = ""; // Kosongkan tabel
  
    employeeList.forEach((Jh) => {
      dataJh.innerHTML += `
      <tr>
              <td>${Jh.jobHistory.id}</td>
              <td>${Jh.jobHistory.changed_date}</td>
              <td>${Jh.employee.employeeId}</td>
              <td>${Jh.employee.FIRST_NAME} ${Jh.employee.LAST_NAME}</td>
              <td>${Jh.jobHistory.job_id_new}</td>
              <td>${Jh.jobHistory.job_id_old}</td>
              <td> <a href='#' class="btn btn-danger" onclick='deleteJob(${Jh.jobHistory.id})'> hapus</a> </td>
        </tr>
      `;
    });
  }
 


// Fungsi untuk menghapus data employee berdasarkan jobId
function deleteJob(jobId) {
  // Konfirmasi penghapusan
  const confirmation = confirm(`Are you sure you want to delete Job History with ID ${jobId}?`);
  if (!confirmation) return; // Jika pengguna membatalkan, hentikan proses


  // Kirim permintaan DELETE ke API untuk menghapus data dari server
  fetch(`http://localhost:8081/job-history/delete/${jobId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete Job History');
    }
    console.log(`Job with ID ${jobId} deleted successfully`);
    window.location.reload() = `/PostTestFrontEnd/html/job.html`
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

  displayJh(employeesForPage);
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
    await getJh();
    loadPage(1, listJh);

    document
      .getElementById("prevButton")
      .addEventListener("click", () =>
        loadPage(currentPage - 1, listJh)
      );
    document
      .getElementById("nextButton")
      .addEventListener("click", () =>
        loadPage(currentPage + 1, listJh)
      );
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
}

window.addEventListener("load", () => {
  initializeDepartment();
});
