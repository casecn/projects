
function crazyCaps (crazyString)
{
  
  if(typeof crazyString === "string")
  {
    let tempString = '';  
    let newString = '';
    for (let i=0; i< crazyString.length; i++)
      {
        tempString = crazyString[i];
        if(i%2 ===0){tempString=tempString.toLowerCase();}
        else {tempString=tempString.toUpperCase();}
        newString += tempString;
      }
  }
    return newString;
}

/**************/
//1. Greeting */
/**************/
function greeting (txtName){
  var tempName;
  (typeof txtName === 'string')? tempName = "Hello " + txtName + "!" :tempName = "Hello!";
  return tempName;
} 
/*****************************/
//2. Do You Play the Theremin*/
/*****************************/
function doYouPlayTheTheremin(txt1){
  let rtnValue;
  (txt1[0] === 's' || txt1[0] === 'S')? rtnValue = true: rtnValue = false;
  return rtnValue;
}
/*********************/
//3.  Last Character*/
/********************** */
function lastCharacter(str1, str2){
  
  var tmpStr1 = str1[str1.length-1];
  var tmpStr2 = str2[str2.length-1];
  
  if (tmpStr1 === tmpStr2){
    return true;
  }
  else return false; 
  
}
/*********************/
//4.  Max of Three */
/********************** */
function maxOfThree (num1, num2, num3)
{
  var maxNum;
    if (num1 >= num2 && num1 >= num3)
      {
      maxNum = num1;
      }
    else if (num2 >= num3)
      {
      maxNum = num2;
      }
    else
      {
        maxNum = num3;
      }
  return maxNum;
}

function doYouPlayTheTheremin(txt1){
  let rtnValue;
  (txt1[0] === 's' || txt1[0] === 'S')? rtnValue = true: rtnValue = false;
  return rtnValue;
}
/***********************/
// 5.  Every Which Way
/************************/
function everyWhichWay (num1, num2, num3){
  var rtnValue ='';
  switch (num3){
    case num1 + num2:
      rtnValue =  'sum';
      break;
    case num1 - num2:
      rtnValue = 'difference';
      break;
    case num1 * num2:
      rtnValue = 'product';
      break;
    case num1 / num2:
      rtnValue = 'fraction';
      break;
    default: rtnValue = null;
  }
  return rtnValue;
}