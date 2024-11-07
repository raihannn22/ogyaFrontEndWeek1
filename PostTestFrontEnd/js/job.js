var listJob = [];

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

fetchApi("http://localhost:8081/job/get/all", "GET")
  .then((data) => {
    const dataJob = document.getElementById("data-job");
    dataJob.innerHTML = "";

    listJob = data.content;

    data.content.forEach((job) => {
      console.log(job);
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
  })
 


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
    document.getElementById("jobModal"),
    {
      keyboard: false,
    }
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
      // Refresh data employee
      fetchApi("http://localhost:8081/job/get/all")
        .then((data) => displayEmployees(data.content))
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error("Error updating employee:", error));
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
    //   // Refresh data employee
    //   fetchApi("http://localhost:8081/Job/get/all")
    //     .then((data) => displayEmployees(data.content))
    //     .catch((error) => console.error(error));
    })
    .catch((error) => console.error("Error updating Job:", error));
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
  .catch(error => {
    console.error('Error deleting Job:', error);
    // Tambahkan kembali baris ke tabel jika penghapusan gagal
    const row = document.querySelector(`#data-emp tr[data-Job-id="${jobId}"]`);
    if (row) {
      row.style.display = '';  // Mengembalikan baris yang dihapus
    }
  });
}


