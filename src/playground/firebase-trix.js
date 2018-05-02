firebase.initializeApp(config);

const database = firebase.database();

//child removed
database.ref('expenses').on('child_removed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
})

//child_changed
database.ref('expenses').on('child_changed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

//child_added
//NOTE: will (also) fire one first time for all existing children
database.ref('expenses').on('child_added', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

database.ref('notes').push({
  title: 'To Do',
  body: 'Go for a run'
});

//"on" returns applied callback-function
//if one is provided explicitly (instead of an anonymous inline), it will
//be that one that is returned
const onValueChange = database.ref().on('value', (snapshot) => {
  console.log(dataSub(snapshot.val()));
}, (e) => {
  console.log('Error with data fetch:', e);
});

const dataSub = (db) => {
  const name = db.name.split(' ')[0];
  const title = db.job.title;
  const company = db.job.company;
  return `${name} is a ${title} at ${company}.`;
}

console.log(onValueChange);

setTimeout(() => {
  database.ref('age').set(101);
}, 3500);

setTimeout(() => {
  database.ref().off('value', onValueChange);
}, 7000);

setTimeout(() => {
  database.ref('age').set(103);
}, 10500);

// database.ref('location').
//   once('value')
//   .then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch((e) => {
//     console.log('once failed:', e);
//   });

// database.ref().set({
//   name: 'Gunde Wassberg',
//   age: 100,
//   job: {
//     title: 'Hard working',
//     company: 'The mine'
//   },
//   stressLevel: 6,
//   location: {
//     city: 'Mora',
//     country: 'Sweden'
//   }
// }).then(() => {
//   console.log('Data is saved');  
// }).catch((error) => {
//   console.log('This failed:', error);
// });

// database.ref().update({
//   stressLevel: 9,
//   'job/company' : 'W.C. organization',
//   'location/city' : 'Falun'
// });

//database.ref('isSingle').set(null);

//database.ref('isSingle')
// database.ref()
//   .remove()
//   .then(() => {
//     console.log('Data was removed');
//   }).catch((e) => {
//     console.log('Did not work:',e);
//   });


console.log('firebase, jejeje...');