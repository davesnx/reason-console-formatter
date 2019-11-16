/* [@bs.module "./../../../src/index.js"]
   external install: unit => unit = "default";

   install();
    */
/* module Person = {
     type details = {
       name: string,
       age: int,
     };

     let person = {name: "Adam", age: 31};
     let make = () => person;
     let greet = details =>
       "Hello. My name is "
       ++ details.name
       ++ " and I am "
       ++ string_of_int(details.age)
       ++ " years old.";
   };

   let adam = Person.make();

   Js.log("module");
   Js.log(adam);
   Js.log(" ");

   let greet: string = Person.greet(adam);

   Js.log("string");
   Js.log(greet);
   Js.log(" ");
    */

let listA: list(int) = [1, 2, 3, 4, 5];
let listB: list(int) = [1, 2, 3, 4, 5];
let listC: list(string) = ["Lets", "get", "ready", "to", "rumble!"];

Js.log2("list(int)      ", listA);
Js.log2("list(string)   ", listC);

let nestedList: list(list(int)) = [listA, listB];

Js.log2("list(list(int))", nestedList);

/* let arr: array(string) = [|"a", "b"|];

   Js.log("array(string)");
   Js.log(arr);
   Js.log(" ");

   let tuple: (int, int) = (1, 2);

   Js.log("(int, int)");
   Js.log(tuple);
   Js.log(" ");

   type obj = {. color: string};

   let car: obj = {pub color = "Red"};

   Js.log("record");
   Js.log(car);
   Js.log(" ");

   type myResponseVariant =
     | Yes
     | No
     | PrettyMuch;

   let areYouCrushingIt = Yes;

   Js.log("Variant");
   Js.log(areYouCrushingIt);
   Js.log(" ");
    */
