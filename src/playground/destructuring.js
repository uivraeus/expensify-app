//
// Object descructuring
//



// const person = {
//   name: 'Ulf',
//   //age: 41,
//   location: {
//     city: 'Gothenburg',
//     temp: 16
//   }
// };

// const {name, age:age2=0} = person;
// console.log(`${name} is ${age2}.`);

// const {city, temp:temperature} = person.location;
// if (city && temperature) {
//   console.log(`It's ${temperature} in ${city}.`)
// }

// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     //name: 'Penguin'
//   }
// };

// const { name:publisherName='Self-Published' } = book.publisher;
// console.log(publisherName);


//
// Array descructuring
//

const address = ['1299 S Juniper Street', 'Philadelphia','Pennsylvania','19147'];
//const [street, city, state, zip] = address;
const [, city, state='Unknown'] = address;
console.log(`You are in ${city} ${state}.`)

const item = ['coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [drink, , prize] = item;
console.log(`A medium ${drink} costs ${prize}`);