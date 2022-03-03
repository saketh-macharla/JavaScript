const person={
    Name:"Noam Chomsky",
    age:92,
};

// let name = person.name;
// let age = person.age;
// console.log(name);
// console.log(age);

// object destructing
({Name,age}=person);
console.log(Name);
console.log(age);