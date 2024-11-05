var produk = ["tisu", "kotak", "uang", "gelas", "ayam"];

console.log(`produk 10 = ${produk[1]} `);

document.write(`produk 2 = ${produk[1]} `);

document.write("</br> List produk : </br>");

for (let i = 0; i < produk.length; i++) {
  document.write(produk[i] + "</br>");
}

produk.forEach((value, index) => {
  document.write(`${index + 1} = ${value} </br> `);
});

document.write("</br></br>");
produk.push("buku");
document.write(produk);
document.write("</br></br>");

// for (let i = 0; i < produk.length; i++) {
//   if (produk[i] > 0) {
//     document.write(produk[i] + "</br>");
//   }
// }

var produk = [1, 2, 3, 4, 5, 6, 7];
document.write(produk.length + "</br>");
delete produk[6];
document.write(produk + "</br>");
document.write(produk.length + "</br>");
produk.pop();
document.write(produk.length + "</br>");
produk.shift();
document.write(produk.length + "</br>");
document.write(produk + "</br>");
produk.splice(2, 1);
document.write(produk.length + "</br>");
document.write(produk);

function ispositif(produk) {
  index = [];
  for (let i = 0; i < produk.length; i++) {
    if (produk[i] > 0 && produk[i] % 2 == 0) {
      index.push(produk[i]);
    }
  }
  return index;
}

document.write("</br></br>");
var produk = [1, 2, 3, 4, 5, 6, 7, 0];
const filterArray = produk.filter((value, index) => {
  if (value > 0 && value % 2 == 0) {
    return document.write(index, ".", value + "</br>");
  }
});

const exp = produk.includes(2);
document.write(exp + "</br>");

const exp2 = produk.indexOf(2);
document.write(exp2);
document.write(filterArray + "</br>");

var array1 = [1, 40, 11, 92, 37];
const arraysort = array1.sort();
document.write(arraysort);

document.write("</br></br>");
const filterArray2 = array1.filter((value, index) => {
  return value > 0 && value % 2 == 0;
});

document.write(filterArray2);

document.write("</br></br>");
var nama = ["r", "a", "i", "h", "a", "n"];
var nama = ["agus", null, 20, "h", "a", true];
sortnama = nama.sort();
document.write(sortnama);
// var produk = [-1, -2, 2, -8, 4, 5, -5];
// document.write(ispositif(produk));
