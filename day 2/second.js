var z = 5;
var b = 2;

var c = z + b;
console.log(c);

let azz = true;

console.log(azz ? "benar" : "salah");

let ask = confirm("apakah kamu >18 tahun ?");

let answer = ask ? "kamu > 18 tahun" : "kamu masih kecil";
document.write(answer);

var total = prompt("total belanja ? ", 100);

if (total > 1000) {
  document.write("</br> total belanja > 1000");
}

document.write("</br> makasih</br>");

var nilai = prompt("berapa nilai kamu ?");

if (nilai > 90 && nilai <= 100 && nilai >= 0) {
  var grade = "A";
  document.write("Grade A");
} else if (nilai > 80 && nilai <= 100 && nilai >= 0) {
  var grade = "B+";
  document.write("Grade B+");
} else if (nilai > 70 && nilai <= 100 && nilai >= 0) {
  var grade = "B";
  document.write("Grade B");
} else if (nilai < 70 && nilai <= 100 && nilai >= 0) {
  var grade = "F";
  document.write("Grade F");
} else {
  var grade = "?";
  document.write("Masukkan nilai dengan benar");
}

document.write(`</br> nilai ${nilai} grade anda ${grade}`);
