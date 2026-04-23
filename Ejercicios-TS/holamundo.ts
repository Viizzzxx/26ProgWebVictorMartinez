function saludar () { console.log("adios")}
saludar()
function sumar (a:number,b:number) :number{ return a+b}
console.log(sumar(1,2))
let num: number= 54654
let hex: number = 0x4654
let bin: number = 0b1010
console.log("num:", num)
console.log("hex:", hex)
console.log("bin:", bin)
num=0x4654  //mutabilidad
console.log("num:", num)
let yes: boolean = true
let no : boolean = false
console.log("yes:", yes)
yes = false

const arr3: ( Date | String[] )[]=[new Date(),
                                    new Date(),
                                    ["1","2","3"]
                                   ]

console.log(arr3)
console.log(arr3[2])
console.log(arr3[0])

let arrNum : number []
 arrNum= [1,2,3,4,5]

 console.log(arrNum)

// Entidad: Reglas que NO cambian
 interface eAlumnoProps {
    idAlumno: string;
    nombre: string;
}

//clase  sin atributos

class eAlumno {

    //metodos
        constructor(private props: eAlumnoProps) {}

    public getNombre(): string {
            let nombre: string;
            nombre= this.props.nombre;
            return nombre;
        }

    public setNombre(nombre: string): void {
            this.props.nombre = nombre;
        }
    public getIdAlumno(): string {
            return this.props.idAlumno;
        }
    public setIdAlumno(idAlumno: string): void {
            this.props.idAlumno = idAlumno;
        }

}
let a1=new eAlumno({idAlumno:"100A1", nombre:"juana"})
console.log(a1)

 interface Address {
  street: string;
  city: string;
}

class people {
  // Declare property with interface type
  address: Address;
  name:string ="";

  constructor(name: string) {
    this.name=name;
    // Initialize with an object matching the interface
    this.address = { street: '123 Main St', city: 'Springfield' };
  }
}

let pp = new people("pepe")
console.log(pp)


interface Person {
  name: string;
  // Optional properties, marked with a "?"
  age?: number;
  // And of course functions
  move( n:string): void;
}

let p: Person = {
    name: "Bobby",
    age: 15,
    move: (n) => { console.log("soy ",n ,"moviendo")} };

console.log (p.name)
 console.log (p.age)
  console.log (p)
  p.move("juan")


// Classes - members are public by default
class Point {
  // Properties
  x: number;

  // Constructor - the public/private keywords in this context will generate
// the boiler plate code for the property and the initialization in the
// constructor.
// In this example, "y" will be defined just like "x" is, but with less code
// Default values are also supported

constructor(x: number, public y: number = 0) {
    this.x = x;
  }

  // Functions
  dist(): number { return Math.sqrt(this.x * this.x + this.y * this.y); }

  // Static members
  static origin = new Point(0, 0);
}

// Classes can be explicitly marked as implementing an interface.
// Any missing properties will then cause an error at compile-time.
class PointPerson implements Person {
    name: string=""
    move() {}
}

let p1 = new Point(10, 20);
let p2 = new Point(25); //y will be 0
console.log(p1.x)
console.log(p1.y)
console.log(p1.dist())

