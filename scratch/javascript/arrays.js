const names = ['john', 'alex', 'craig']

const mixedArr = ['I am a string', true, 55, {name: 'Craig', getName() {return this.name}}]

console.log(Array.isArray(names))
console.log(typeof mixedArr)

console.log(names.length)

function logArray(arr)
{
    if(Array.isArray(arr))
    {
        console.log("this is an array:")
        console.log (arr)
    }
    else {
        console.log(typeof arr)
        console.log ("this is not an arry")
    }
}

logArray(names)
logArray(4)

const nested = [[1,2,3,], [4,5,6], [7,8, 9]]

for (let i = 0; i < nested.length; i++)
{
    element = nested[i]
    for (let j = 0; j < element.length; j++ )
    {
        console.log(nested[i][j])
    }
}

console.log (nested.flat()) // combines a nested array into a flat array depending on the depth specified.
