var jawab = prompt("silahkan pilih hadiah masukkan angka 1 - 5");
var hadiah = "";

switch (jawab) {
  case "1":
    hadiah = "tisu";
    break;
  case "2":
    hadiah = "kotak";
    break;
  case "3":
    hadiah = "uang";
    break;
  case "4":
    hadiah = "gelas";
    break;
  case "5":
    hadiah = "ayam";
    break;
  default:
    document.write("</p> oops anda </p>");
}

if (hadiah == "") {
  document.write("</p> gagal dapat hadiah </p>");
} else {
  document.write(`<h2>selamat kamu mendapatkan hadiah ${hadiah} </h2>`);
}

var jawab = prompt("apakah kamu tinggal di jakarta");

var jawaban =
  jawab.toUpperCase() == "IYA"
    ? document.write("tingal di jakarta")
    : document.write("tingal di luar");

var username = prompt("username: ");
var pass = prompt("pass : ");

if (username == "raihan") {
  if (pass == "raihan123") {
    document.write("</br>login sukses");
  } else {
    document.write("</br>password salah");
  }
} else {
  document.write("</br>username salah");
}
