var listJob = [];
var FilteredListJob = [];

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
async function getJob() {
  const data = await fetchApi("http://localhost:8081/job/get/all", "GET");
  listJob = data.content;
  FilteredListJob = listJob;
}


function displayJobs (jobList) {
  const dataJob = document.getElementById("data-job");
  dataJob.innerHTML = "";

  jobList.forEach((job) => {

    dataJob.innerHTML += `
      <tr>
              <td>${job.jobId}</td>
              <td>${job.JOB_TITLE}</td>
              <td>${job.MAX_SALARY}</td>
              <td>${job.MIN_SALARY}</td>
              <td> <a href='#' class="btn btn-danger" onclick='deleteJob(${job.jobId})'> hapus</a> </td>
              <td> <a href='#' class="btn btn-info" onclick='showUpdateForm(${job.jobId})'> edit</a> </td>
        </tr>
      `;
  });
}

function searchJob() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  // Filter ListEmployee berdasarkan searchTerm
  const filteredJob = listJob.filter((job) => {
    return (
      job.JOB_TITLE.toLowerCase().includes(searchTerm) 
    );
  });

  // Tampilkan hasil pencarian di tabel
  loadPage(1, filteredJob);
}


let currentJobId = null;

showUpdateForm = (id) => {
  currentJobId = id;
  console.log(currentJobId);

  const jobData = listJob.find((job) => job.jobId === id);
  console.log(jobData);
  document.getElementById("jobName").value = jobData.JOB_TITLE;
  document.getElementById("maxSalary").value = jobData.MAX_SALARY;
  document.getElementById("minSalary").value = jobData.MIN_SALARY;
  // window.location.replace() = `/PostTestFrontEnd/html/registrasi_update.html?id=${id}`;
  var myModal = new bootstrap.Modal(
    document.getElementById("jobModal")
  );
  const myButton = document.getElementById("SbmtBttn")
  myButton.addEventListener("click", () => {
    updateJob();
  })
  myModal.show();
};

showCreateForm = ()  => {
  document.getElementById("jobName").value = null;
  document.getElementById("maxSalary").value = null;
  document.getElementById("minSalary").value = null;
  var myModal = new bootstrap.Modal(
    document.getElementById("jobModal")
  );
  const myButton = document.getElementById("SbmtBttn")
  myButton.addEventListener("click", () => createJob())
  myModal.show();
};




function updateJob() {
  console.log(currentJobId);
  // Data yang akan diperbarui
  const updatedJob = {
    JOB_TITLE:  document.getElementById("jobName").value ,
    MIN_SALARY:  document.getElementById("maxSalary").value ,
    MAX_SALARY:  document.getElementById("minSalary").value 
  };

  // Lakukan update berdasarkan currentJobId
  fetchApi(
    `http://localhost:8081/job/update/${currentJobId}`,
    "PATCH",
    updatedJob
  )
    .then(() => {
      alert("Job updated successfully!");
      window.location.reload() = `/PostTestFrontEnd/html/job.html`
    })
}


function createJob() {
  console.log("currentJobId");
  // Data yang akan diperbarui
  const createdJob = {
    JOB_TITLE:  document.getElementById("jobName").value ,
    MIN_SALARY:  document.getElementById("maxSalary").value ,
    MAX_SALARY:  document.getElementById("minSalary").value 
  };

  // Lakukan update berdasarkan currentJobId
  fetchApi(
    `http://localhost:8081/job/create`,
    "POST",
    createdJob
  )
    .then(() => {
      alert("Job created successfully!");
      window.location.reload() = `/PostTestFrontEnd/html/job.html`
    })
}


// Fungsi untuk menghapus data employee berdasarkan jobId
function deleteJob(jobId) {
  // Konfirmasi penghapusan
  const confirmation = confirm(`Are you sure you want to delete Job with ID ${jobId}?`);
  if (!confirmation) return; // Jika pengguna membatalkan, hentikan proses


  // Kirim permintaan DELETE ke API untuk menghapus data dari server
  fetch(`http://localhost:8081/job/delete/${jobId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete Job');
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

  displayJobs(employeesForPage);
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
    await getJob();
    loadPage(1, listJob);

    document
      .getElementById("prevButton")
      .addEventListener("click", () =>
        loadPage(currentPage - 1, listJob)
      );
    document
      .getElementById("nextButton")
      .addEventListener("click", () =>
        loadPage(currentPage + 1, listJob)
      );
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
}

window.addEventListener("load", () => {
  initializeDepartment();
});
