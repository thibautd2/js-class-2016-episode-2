'use strict';

let p = Promise.resolve(5);

p.then(data => console.log('Hello ' + data));
p.then(data => console.log('Bonjour ' + data));

p.then(data => data + 5)
 .then(data => console.log('+5 gives :' + data))
 .catch(err => console.error('something happenned !'));



let a = Promise.resolve(5);

a.then(() => {
    // silly example, of course
  return Promise.resolve('hello');
})
.then(msg => console.log(msg));


let b = Promise.resolve(5);

b.then(() => {
  // silly example, of course
  throw new Error('Ouch !');
})
.then(msg => console.log(msg))
.catch(err => console.error(err.message));




function getUrl () {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("http://swapi.co/people/3"), 1500)
  })
}

getUrl()
.then(function fetchData(url) {
  return fetch(url)
    .then(function onResponse(response) {
      if(response.ok)
        return response.json();
      else
        throw new Error('Network response was not ok.');
    });
})
.then(function displayResults(data) {
  console.log(data)
})
.catch(err => console.error(err));




