/***************/
/* 1) Last Friday Night
//According to the song, Katy Perry "maxed our credit cards".
//Define a function, lastFridayNight, takes an array of transactions.
//lastFridayNight should return the total amount she spent last Friday night.
/****************/

let transactions = [
  {
    name: "Tons of glitter",
    amount: 70
  },
  {
    name: "Porcelain Pink Flamingos",
    amount: 92
  },
  {
    name: "Chandelier replacement",
    amount: 10000,
  },
  {
    name: "Dinner at TGIF x6",
    amount: 350
  }
];

function lastFridayNight ( transactions ){
  let i = 0;
  let amountSum=0;
  while (i < transactions.length) {
    amountSum =amountSum + Number(transactions[i].amount);
    i++;
  }
  return amountSum;
}


/***************************/
// 2)  Compare two Objects
//Define a function, compareObjects, that accepts two objects as arguments.
//compareObjects should return true if both objects have exactly the same key/value pairs. Otherwise, compareObjects should 
//return false. Assume the objects are not nested.
/***************************/
//function compareObjects (obj1, obj2){
  //return JSON.stringify(obj1) === JSON.stringify(obj2);
//}
//console.log(compareObjects({a: 1, b: 2}, {a: 3, c: 2}))
function compareObjects (obj1, obj2){
  if (Object.keys(obj1).length !== Object.keys(obj2).length)
    return false;
  else if (obj1.name === obj2.name){
    return true;
  } 

}

/***************************/
// 3)  Leet Translator
//"Leet" or 1337 is a popular alternative alphabet used by internet "hackers".
//Define a function called leetTranslator that take a string of normal characters.
//leetTranslator should return a new string that is the translation of the original string into leet.
//The leet codex is below, along with an array of english letters and an array of the corresponding leet characters. 
//Use the two arrays to create a leetCodex object to use in making the translations.
/***************************/
let letters = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
let leetChars = ['@', '8', '(', '|)', '3', 'ph', 'g', '#','l', '_|', '|<', '1', "|'|'|", '/\/', '0', '|D', '(,)', '|2', '5', '+', '|_|', '|/', "|/|/'",'><', 'j', '2'];

function buildObject(arr1, arr2){
  let codex={};
  let i = 0;
  
  for (i; i<=letters.length; i++){
    let key = letters[i];
    let value = leetChars[i];
    codex[key] = value;
  }
  return codex;
}

const leetCodex = buildObject(letters, leetChars);

function leetTranslator(str1){
    let newString ='';
    for(let i=0; i<=str1.length-1; i++){
      let tempChar = str1[i].toLowerCase();
      newString = newString + leetCodex[tempChar];
    }
    return newString;
}  

function leetCodexII(word){
  let leetCodedWord =''
  const splittedWord = word.split('')
  for (let i=0; i< splittedWord.length; i++){
    let currentChar = splittedWord[i];
    const indexOfCurrentChar = letters.indexOf(currentChar);
    leetCodedWord+=leetChars[indexOfCurrentChar]
  }
}
//console.log(leetCodexII('Hopper'));

//**********************************/
//***********Pet Sounds*************/
//Write a function petSounds that takes an animal name and a country name as arguments.
//Using the globally-defined animalNoises array, petSounds should return a sentence that explains which sound the animal makes in the given country.

let animalNoises = [
  { 'dog': {
    'America' : 'Woof! Woof!',
    'Germany' : 'Wau Wau!',
    'England' : 'Bow wow!',
    'Uruguay' : 'Jua jua!',
    'Afrikaans' : 'Blaf!',
    'Korea' : 'Mong mong!',
    'Iceland' : 'Voff voff!',
    'Albania' : 'Ham!',
    'Algeria' : 'Ouaf ouaf!'
    }
  },
  { 'cat': {
    'America' : 'Meow',
    'Germany' : 'Miauw!',
    'England' : 'mew mew',
    'Uruguay' : 'Miau Miau!',
    'Afrikaans' : 'Purr',
    'Korea' : 'Nyaong!',
    'Iceland' : 'Kurnau!',
    'Albania' : 'Miau',
    'Algeria' : 'Miaou!'
    }
  },
  { 'chicken': {
    'America' : 'Cluck cluck',
    'Germany' : 'tock tock tock',
    'England' : 'Cluck Cluck',
    'Uruguay' : 'gut gut gdak',
    'Afrikaans' : 'kukeleku',
    'Korea' : 'ko-ko-ko',
    'Iceland' : 'Chuck-chuck!',
    'Albania' : 'Kotkot',
    'Algeria' : 'Cotcotcodet'
    }
  }
];


// YOUR CODE BELOW

function petSounds(animalRequest, country){
 for(let i=0; i < animalNoises.length; i++){
    const tempAnimalList = animalNoises[i];

    if (animalRequest in tempAnimalList)
    {
      const animal = tempAnimalList[animalRequest];
      const animalNoise = animal[country]
      
      const message = `${animalRequest}s in ${country} say ${animalNoise}` 
      return `${animalRequest[0].toUpperCase()}${animalRequest.slice(1)}s in ${country} say ${animalNoise}` 
      return message;
    }
  }
}

//console.log(petSounds('cat', 'Albania'))


function frequencyAnalysis(text){
  const objectCounter={}
  for (let i=0; i< text.length; i++){
    let currentChar = text[i];
    if(currentChar in objectCounter){
      console.log(`if: ${currentChar}`)
      objectCounter[currentChar] +=1;
      console.log(`Char1: ${objectCounter[currentChar]}`)
    }
    else{
      console.log(`else: ${currentChar}`)
      objectCounter[currentChar] =1;
      console.log(`Char2: ${objectCounter[currentChar]}`)
     }

  }
  console.log(objectCounter)
  return objectCounter
;
}
// const output = frequencyAnalysis('i like pumpkins')
// console.log(output['k'])
// console.log(output['l'])
// console.log(output['i'])
/**********************************/
//*********Dog Breeder ************/
//

// console.log(dogBreeder('Sam', 12)) // => {name: 'Sam', age: 12}
// console.log(dogBreeder(15)); // => {name:'Steve', age: 15}
// console.log(dogBreeder());
// console.log(dogBreeder('Max'));


function dogBreeder (dogName, dogAge){
  //check for empty values
  const dogObject = {};
  if(typeof dogName === 'undefined' && typeof dogAge === 'undefined'){
    dogObject.name = 'Steve';
    dogObject.age =0;
  }
  else if (typeof dogName === 'number' && typeof dogAge === 'undefined'){
    dogObject.name = 'Steve';
    dogObject.age = dogName;
  }
  else if (typeof dogName === 'undefined' && typeof dogAge === 'number'){
    dogObject.name = 'Steve';
    dogObject.age = dogAge;
  }
  else if (typeof dogName === 'string' && typeof dogAge === 'undefined'){
    dogObject.name = dogName;
    dogObject.age = 0;
  }
  else {
    dogObject.name = dogName;
    dogObject.age = dogAge;
  }



return dogObject;
}

/**************************************/
/********* Attendance Check ************/


let classRoom = [
    {
        "Marnie" : [
                {"Monday" : true},
                {"Tuesday" : true},
                {"Wednesday" : true},
                {"Thursday" : true},
                {"Friday" : true}
            ]
    },
    {
        "Lena" : [
                {"Monday" : false},
                {"Tuesday" : false},
                {"Wednesday" : true},
                {"Thursday" : false},
                {"Friday" : true}
            ]
    },
    {
        "Shoshanna" : [
                {"Monday" : true},
                {"Tuesday" : true},
                {"Wednesday" : false},
                {"Thursday" : true},
                {"Friday" : false}
            ]
    },
    {
        "Jessa" : [
                {"Monday" : false},
                {"Tuesday" : false},
                {"Wednesday" : false},
                {"Thursday" : false},
                {"Friday" : true}
            ]
    }
];
console.log(classCheck('Monday')) // => ['Marnie', 'Shoshanna']
console.log(classCheck('Tuesday'))
console.log(classCheck('Wednesday')) // => ['Marnie', 'Lena']
console.log(classCheck('Thursday'))
console.log(classCheck('Friday'))

function classCheck(weekDay)
{
//Declare attendance list
  let attendanceList = [];
//loop through each student and determine attendance 
  for(let i=0; i< classRoom.length; i++)
  {
    let studentRecord = classRoom[i]; // Student Object
    let studentName = Object.keys(studentRecord)[0]// find name of object // Student name
    let dayList = studentRecord[studentName] //Student Array of [{Monday: true/false}, . . . {Friday: true/false}]
      //Loop through array of day objects
    for(let x=0; x < dayList.length; x++)
    {
      let day = dayList[x]; // day object {day: true/false}
      let dayName = Object.keys(day)[0] //Day Key e.g., Monday
      //if key value === weekDay and value = true, then add name to attendance list
      if (dayName === weekDay && day[dayName])
      {
        attendanceList.push(studentName)
      }
    
    }
  
  }
  return attendanceList;
}

