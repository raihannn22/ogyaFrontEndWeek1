function loadData() {
  var xhr = new XMLHttpRequest();

  var url = "https://api.github.com/users/henrydewa";

  xhr.onloadstart = function () {
    document.getElementById("button").innerHTML = "loading...";
  };

  xhr.onerror = function () {
    alert("Gagal ambil data");
  };

  xhr.onloadend = function () {
    if (this.responseText !== "") {
      var data = JSON.parse(this.responseText);
      var img = document.createElement("img");
      img.src = data.avatar_url;
      var name = document.createElement("h3");
      name.innerHTML = data.name;
      document.getElementById("button").append(img, name);
      document.getElementById("button").innerHTML = "Done";
      setTimeout(function () {
        document.getElementById("button").innerHTML = "Load Lagi";
      }, 3000);
    }
    xhr.open("GET", url, true);
    xhr.send();
  };

  function clearResult() {
    document.getElementById("button").innerHTML = "Load";
  }
  // xhr.onreadystatechange = function () {
  //   if (this.readyState == 4 && this.status == 200) {
  //     document.getElementById("button").innerHTML = this.responseText;
  //   } else {
  //     document.getElementById(
  //       "hasil"
  //     ).innerHTML = `tidak ada data dengan status respon ${this.status}`;
  //   }
  // };
  // xhr.open("GET", "https://api.github.com/users/henrydewa", true);
  // xhr.send();
}
