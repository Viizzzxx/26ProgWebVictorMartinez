"use strict";
function saludar() { console.log("adios"); }
saludar();
function sumar(a, b) { return a + b; }
console.log(sumar(1, 2));
let num = 54654;
let hex = 0x4654;
let bin = 0b1010;
console.log("num:", num);
console.log("hex:", hex);
console.log("bin:", bin);
num = 0x4654; //mutabilidad
console.log("num:", num);
let yes = true;
let no = false;
console.log("yes:", yes);
yes = false;
const arr3 = [new Date(),
    new Date(),
    ["1", "2", "3"]
];
console.log(arr3);
console.log(arr3[2]);
console.log(arr3[0]);
let arrNum;
arrNum = [1, 2, 3, 4, 5];
console.log(arrNum);
//clase  sin atributos
class eAlumno {
    props;
    //metodos
    constructor(props) {
        this.props = props;
    }
    getNombre() {
        let nombre;
        nombre = this.props.nombre;
        return nombre;
    }
    setNombre(nombre) {
        this.props.nombre = nombre;
    }
    getIdAlumno() {
        return this.props.idAlumno;
    }
    setIdAlumno(idAlumno) {
        this.props.idAlumno = idAlumno;
    }
}
let a1 = new eAlumno({ idAlumno: "100A1", nombre: "juana" });
console.log(a1);
class people {
    // Declare property with interface type
    address;
    name = "";
    constructor(name) {
        this.name = name;
        // Initialize with an object matching the interface
        this.address = { street: '123 Main St', city: 'Springfield' };
    }
}
let pp = new people("pepe");
console.log(pp);
let p = {
    name: "Bobby",
    age: 15,
    move: (n) => { console.log("soy ", n, "moviendo"); }
};
console.log(p.name);
console.log(p.age);
console.log(p);
p.move("juan");
// Classes - members are public by default
class Point {
    y;
    // Properties
    x;
    // Constructor - the public/private keywords in this context will generate
    // the boiler plate code for the property and the initialization in the
    // constructor.
    // In this example, "y" will be defined just like "x" is, but with less code
    // Default values are also supported
    constructor(x, y = 0) {
        this.y = y;
        this.x = x;
    }
    // Functions
    dist() { return Math.sqrt(this.x * this.x + this.y * this.y); }
    // Static members
    static origin = new Point(0, 0);
}
// Classes can be explicitly marked as implementing an interface.
// Any missing properties will then cause an error at compile-time.
class PointPerson {
    name = "";
    move() { }
}
let p1 = new Point(10, 20);
let p2 = new Point(25); //y will be 0
console.log(p1.x);
console.log(p1.y);
console.log(p1.dist());
