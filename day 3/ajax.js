function loadData() {
  var xhr = new XMLHttpRequest();

  var url = "https://api.github.com/users/henrydewa";
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("hasil").innerHTML = this.responseText;
    } else {
      document.getElementById(
        "hasil"
      ).innerHTML = `tidak ada data dengan status respon ${this.status}`;
    }
  };
  xhr.open("GET", "https://api.github.com/users/henrydewa", true);
  xhr.send();
}
