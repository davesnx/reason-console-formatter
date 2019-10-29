module Person = {
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

[%bs.raw {| console.clear() |}];

Js.Console.warn("module");
Js.Console.warn(adam);
Js.log(" ");

let greet: string = Person.greet(adam);

Js.log("string");
Js.log(greet);
Js.log(" ");

let list: list(int) = [1, 2, 3, 4, 5];
let listA: list(int) = [1, 2, 3, 4, 5];
let listB = [listA, list];

Js.log("list (int)");
Js.log(list);
Js.log(" ");

Js.log("list (list (int))");
Js.log(listB);
Js.log(" ");

let nestedList: list(Person.details) = [
  {name: "foo", age: 23},
  {name: "bar", age: 28},
  {name: "baz", age: 14},
  {name: "lors", age: 98},
  {name: "crup", age: 11},
];

Js.log("Record {name, age}");
Js.log(List.hd(nestedList));
Js.log(" ");

/* TODO: Detect nesting between data structures */
Js.Console.error("List (Person.details)");
Js.Console.error(nestedList);
Js.log(" ");

let arr: array(string) = [|"a", "b", "c", "23"|];

Js.log("array (string)");
Js.log(arr);
Js.log(" ");

let tuple: (int, int) = (1, 2);

Js.Console.error("(int, int)");
Js.Console.error(tuple);
Js.log(" ");

type obj = {. color: string};

let car: obj = {pub color = "Red"};

Js.Console.error("Object");
Js.Console.error(car);
Js.log(" ");

type myResponseVariant =
  | Yes
  | No
  | PrettyMuch;

let areYouCrushingIt = PrettyMuch;

Js.Console.error("Variant");
Js.Console.error(areYouCrushingIt);
Js.log(" ");
