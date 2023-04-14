/*Fullstack HQ
Refactor the function fullstackHQ so that it returns the correct string:

fullstackHQ();
// => Fullstack HQ is at Planet Earth, United States, New York State, New York City
The only things you should change are the parameter and/or variable names.*/
let placePlanet = 'Planet Earth';

function fullstackHQ(){
  return middleFunction('United States');

  function middleFunction(placeCountry) {
    return innerFunction('New York State');

    function innerFunction(placeState) {
      let placeCity = 'New York City';
      return innermostFunction();

      function innermostFunction() {
        return 'Fullstack HQ is at ' + placePlanet + ', ' + placeCountry + ', ' + placeState + ', ' + placeCity;
      }
    }
  }
}

/*2)  Incremental Change
Define a function incrementalChange that accepts a number as an argument and increments the global variable counter by that amount. The function should also return the current value of counter after the increment operation.

Each successive call to incrementalChange should progressively change the value of counter.

let counter = 0;

incrementalChange(2); // => 2
incrementalChange(6); // => 8
incrementalChange(-1); // => 7** */

function incremental