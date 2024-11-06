function loadData() {
  document.getElementById("btn-load").innerHTML = "loading...";
  document.getElementById("btn-load").setAttribute("disabled", true);
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then(function (response) {
      var template = response.data
        .map((post) => {
          return `<h3>${post.title}</h3>
      <p>${post.body}</p>
      <hr>`;
        })
        .join("");

      document.getElementById("result").innerHTML = template;
    })
    .catch(function (error) {
      alert("gagal mengambil data");
    })
    .then(function () {
      document.getElementById("btn-load").innerHTML = "Load";
      document.getElementById("btn-load").removeAttribute("disabled");
    });
}
