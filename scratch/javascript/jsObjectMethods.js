/**********************************/
//    1)  Say My Name
// Define an object, me, that has a name property and a getGreeting method. getGreeting should return a greeting.
/**********************************/
// console.log(me.name); // 'Kat'
// me.getGreeting(); // => 'Hi, my name is Kat.'
let me1 = {
    name: 'Kate',
    getGreeting: function() {
      return "Hi, my name is " + this.name + ".";
    }
}


// Say Your Name
// Create a new object, me2. Like the previous problem Say My Name, this object should contain a name property and a method, getGreeting. However, this time getGreeting should accept an object that contains a name property as an argument.The returned greeting should now greet the other object by name.

//console.log(me2.name); // 'Tarana'
//console.log(you.name); // 'Alyssa'
// me2.getGreeting(you); // => 'Hi Alyssa, my name is Tarana.'

const me2 = {
  name: 'Craig',
  getGreeting: function (friend){
    return `Hi ${friend}, my name is ${this.name}.`
  }
}