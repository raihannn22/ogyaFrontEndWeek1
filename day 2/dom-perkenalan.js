var tutorial = document.getElementById("tutorial");
tutorial.innerHTML = "<h1>Tutorial DOM JS</h1>";

// bagian 2
var paragraf = document.getElementsByClassName("paragraf");
console.log(paragraf);

setInterval(() => {
  paragraf[0].style.color = "red";
  paragraf[1].style.color = "green";
  paragraf[2].style.color = "blue";

  setTimeout(() => {
    paragraf[0].style.color = "black";
    paragraf[1].style.color = "black";
    paragraf[2].style.color = "black";
  }, 300);
}, 600);

//bagian 3
var bgColor = document.getElementById("bg-color");
var txtColor = document.getElementById("text-color");

bgColor.addEventListener("change", (event) => {
  document.body.style.backgroundColor = bgColor.value;
});

txtColor.addEventListener("change", (event) => {
  document.body.style.color = txtColor.value;
});

// bagian 4
const checkbox = document.getElementById("checkbox");
const button = document.getElementById("button");
button.addEventListener("click", (event) => {
  checkbox.checked = !checkbox.checked;
  checkbox.disabled = false;

  //   var a = confirm("klik");
  //   if (a) {
  //     var cekbok =document.getElementById("checkbox");
  //     cekbok.set
  //   }
});

function function1() {
  const checkbox1 = document.getElementById("checkbox1");
  //   const button1 = document.getElementById("button1");
  checkbox1.checked = !checkbox.checked;
  checkbox1.disabled = false;
}
