// document.write("<h1> ")

// alert("haloo");
// document.write("<h1> Ini tulisan h1 </> </hr>");
// document.write(" <p> ini paragraf </p>");
// document.write("tanpa <b> tesss </b>");

var hasil = document.getElementById("hasil-output");

// hasil.innerHTML = "<p> aku suka js</p>";

var name = "Ahmad Raihan Ogya";
var visitorCount = 12345;
var isActive = true;
var url = "https://www.google.co.id/?hl=id";

// alert("Selamat datang di " + name);

document.write("<p> aku sukaa js</p>");
document.write("nama situs: " + name);
document.write("jumlah pengunjung :" + visitorCount + "</br>");
document.write("url " + url);

var yakin = confirm("pindah site?");
if (yakin) {
  window.open("https://www.google.co.id/?hl=id", "_blank");
} else {
  document.write(" </br>tidak pindah site");
}

var nama = prompt("siapa nama kamu? ", "");
document.write("</p> hello " + nama + "</p>");

// confirm("apakah anda yakin?");
