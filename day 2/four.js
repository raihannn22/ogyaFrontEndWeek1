// for (let counter = 0; counter < 10; counter++) {
//   for (let counter2 = 0; counter2 < counter; counter2++) {
//     document.write("*");
//   }
//   document.write("</br>");
// }

var ulang = confirm("apakah kamu ingin mengulang?");
var counter = 0;
while (ulang) {
  document.write(counter + "</br>");
  counter++;
  var jawab = confirm("apakah kamu ingin mengulang?");
  if (jawab == false) {
    ulang = false;
  }
}
document.write("</br> sampai di pengulangan yang ke - " + counter);

document.write("</br>");

// var ulang2 = confirm("apakah kamu ingin mengulang?");
// var counter2 = 0;
// do {
//   document.write(counter2 + "</br>");
//   counter2++;
// } while (ulang2);
// document.write("</br> sampai di pengulangan yang ke - " + counter2);

var bahasa = ["html", "css", "js", "php", "python"];

for (let i = 0; i < bahasa.length; i++) {
  document.write(bahasa[i] + "</br>");
}

document.write("</br>");
for (i of bahasa) {
  document.write(i + "</br>");
}

document.write("</br>");

for (lang in bahasa) {
  document.write(bahasa[lang] + "</br>");
}
document.write("</br>");

bahasa.forEach((x, i) => {
  document.write(i + 1 + ". " + x + "</br>");
});

document.write("ulangi ".repeat(10), "</br>");

for (let i = 1; i <= 10; i++) {
  for (let j = 1; j <= 10; j++) {
    document.write(i, "x", j, "=", i * j, "</br>");
  }
  document.write("</br>");
}
document.write("</br>");
document.write("</br>");
for (let i = 7; i < 8; i++) {
  for (let j = 1; j <= 10; j++) {
    document.write(i, "x", j, "=", i * j, "</br>");
  }
}

for (let i = 1; i <= 7; i++) {
  for (let j = 1; j <= i; j++) {
    document.write("*");
  }
  document.write("</br>");
}
