// Only Odds
// Define a function, onlyOdds, that accepts a number as an argument. onlyOdds should should return the sum of all the odd numbers between 1 and the given number.

// If onlyOdds receives an argument less than 1, it should return 0.

//onlyOdds(6); // => 9 (5 + 3 + 1)

function onlyOdds(number)
{
  let numSum=0;
  if (typeof number === 'number' && !(number <= 1) )
  {
    for (let i=0; i<=number; i++)
      {
        (i % 2 !== 0)? numSum += i: null;
      }
  }
  else numSum = 0;
  return numSum
}
//console.log(onlyOdds(-25))
// console.log(onlyOdds(6))
// console.log(onlyOdds(10))

// Crazy Caps
// Define a function, crazyCaps, that accepts a string as an argument. crazyCaps should return a string in which every other character is capitalized. The first letter should be lower-cased.

//console.log(crazyCaps('fullstack is amazing')); // => fUlLsTaCk iS AmAzInG!

function crazyCaps(textStr)
{
    let tempString = '';
    let newString = '';
    for (let i = 0; i < textStr.length; i++)
    {
        tempString = textStr[i];
        i % 2 ===0?newString += tempString.toLowerCase(): newString += tempString.toUpperCase() ;
    }
    return newString;
}

// Bacteria Time
// Define a function, bacteriaTime, that accepts two arguments:

// currentNum (number) - number of starting bacteria
// targetNum (number) - desired number of bacteria
// Assuming that the number of bacteria doubles every 20 minutes, bacteriaTime should return the number of minutes required for the number of bacteria to grow from currentNum to a number equal to or larger than targetNum.

// You can assume that currentNum will be a positive integer. If targetNum is smaller than currentNum, return the string 'targetNum must be larger than currentNum'.

// bacteriaTime(1, 8); // => 60
console.log(bacteriaTime(1, 8))

bacteriaTime(CurrentNum, targetNum)
{
    if(currentNum < targetNum)
    {
        
    }
    else return 'taregNum must be larger than currentNum'
}