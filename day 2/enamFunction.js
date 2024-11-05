// var namaFungsi = () => {
//   console.log("hallo");
// };

var barang = [];

function display() {
  document.getElementById("jumlah").innerHTML = `${barang.length} `;

  document.getElementById("list-barang").innerHTML = "";

  for (let i = 0; i < barang.length; i++) {
    document.getElementById("list-barang").innerHTML +=
      "<li>" +
      barang[i] +
      `<a href='#' onclick='deleteBarang(${i})'> hapus</a>` +
      `<a href='#' onclick='editBarang(${i})'> edit</a>` +
      "</li>";
  }
}

function addBarang() {
  var inputBarang = document.getElementsByName("barang")[0].value;
  barang.push(inputBarang);
  display();
  // document.getElementById("list-barang").innerHTML = "";

  // for (let i = 0; i < barang.length; i++) {
  //   document.getElementById("list-barang").innerHTML +=
  //     "<li>" +
  //     barang[i] +
  //     `<a href='#' onclick='deleteBarang(${i})'> hapus</a>` +
  //     `<a href='#' onclick='editBarang(${i})'> edit</a>` +
  //     "</li>";
  // }

  console.log(barang);
}

deleteBarang = (i) => {
  console.log(barang, i);
  var deleteed = confirm("apakah mau dihapus");

  if (deleteed) {
    barang.splice(i, 1);
    display();
  }

  // document.getElementById("list-barang").innerHTML = "";
  // for (let i = 0; i < barang.length; i++) {
  //   document.getElementById("list-barang").innerHTML +=
  //     "<li>" +
  //     barang[i] +
  //     `<a href='#' onclick='deleteBarang(${i})'> hapus</a>` +
  //     `<a href='#' onclick='editBarang(${i})'> edit</a>` +
  //     "</li>";
  // }
};

editBarang = (i) => {
  var update = prompt("edit barang", barang[i]);

  if (update) {
    barang[i] = update;
    display();
  }
  console.log(barang);
};

// var count = barang.length;

// console.log(count);

// document.getElementById("jumlah").innerHTML = ` jumlah barang : ${count} `;
