// var namaFungsi = () => {
//   console.log("hallo");
// };

var barang = [];

function display(data) {
  document.getElementById("list-barang").innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    // document.getElementById("list-barang").innerHTML +=
    //   "<li>" +
    //   barang[i] +
    //   `<a href='#' onclick='deleteBarang(${i})'> hapus</a>` +
    //   `<a href='#' onclick='editBarang(${i})'> edit</a>` +
    //   "</li>";

    document.getElementById("list-barang").innerHTML += `<tr>
      <th> ${i + 1} </th>
      <td> ${data[i]}  </td>
      <td> <a href='#' class="btn btn-danger" onclick='deleteBarang(${i})'> hapus</a> </td>
      <td> <a href='#' class="btn btn-info" onclick='editBarang(${i})'> edit</a> </td>
      </tr>`;
  }
  document.getElementById("list-barang").innerHTML += `<tr>
    <th colspan="3" class="text-end">Jumlah Barang</th> 
    <td> ${data.length} </td>
    </tr>`;
}

function search() {
  const searchInput = document
    .getElementsByName("searching")[0]
    .value.toLowerCase();
  const filteredBarang = barang.filter((item) =>
    item.toLowerCase().includes(searchInput)
  );
  console.log(filteredBarang);
  display(filteredBarang); // Tampilkan hasil pencarian
}

function addBarang() {
  var inputBarang = document.getElementsByName("barang")[0].value;
  barang.push(inputBarang);
  display(barang);

  console.log(barang);
}

deleteBarang = (i) => {
  console.log(barang, i);
  var deleteed = confirm("apakah mau dihapus");

  if (deleteed) {
    barang.splice(i, 1);
    display(barang);
  }
};

editBarang = (i) => {
  var update = prompt("edit barang", barang[i]);

  if (update) {
    barang[i] = update;
    display(barang);
  }
  console.log(barang);
};
