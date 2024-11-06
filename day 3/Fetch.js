function loadData() {
  var url = "https://jsonplaceholder.typicode.com/posts";
  fetch(url)
    .then((response) => response.json())
    .then(function (data) {
      var template = data.map((post) => {
        return `<h3>${post.title}</h3>
        <p>${post.body}</p>
        <hr>`;
      });
      document.getElementById("hasil").innerHTML = template.join("<br>");
    })
    .catch(function (e) {
      alert("gagal mengambil data");
    });
}
