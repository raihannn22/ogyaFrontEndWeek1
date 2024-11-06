// bagian 1
var car = {
  type: "fiat",
  model: "500",
  color: "red",

  start: function () {
    console.log("start");
  },
  stop: function () {
    console.log("stop");
  },
  drive: function () {
    console.log("drive");
  },
  stop: function () {
    console.log("stop");
  },
};

console.log(car.color);
car.start();

// bagian 2
var person = {
  firstName: "John",
  lastName: "Doe",
  showName: function () {
    alert(`nama : ${person.firstName} ${this.lastName}`);
  },
};

person.showName();

//bagian 3
function Orang(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  this.fullName = function () {
    return this.firstName + " " + this.lastName;
  };

  this.showName = function () {
    document.write(`nama : ${person.firstName} ${this.lastName}`);
  };
}

var orang1 = new Orang("John", "Doe");
orang1.showName();
document.write("</br>");
var orang2 = new Orang("Doe", "John");
orang2.showName();
