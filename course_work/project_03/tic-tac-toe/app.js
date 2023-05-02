// // Constants
const gameState = {
  players: ['x', 'o'],
  board: [
    ['x', null, null],
    [null, null, null],
    [null, null, 'o']
  ]
}


// ********** Event Listeners ****************/


// console.log (gameState.board)
// zeroBoard()
// console.log (gameState.board)
// //Set starting state
// // state
// //let state;

// function buildInitialState() {



// }
// //reset to starting state
function zeroBoard()
{
    for(let i = 0; i<gameState.board.length; i++)
    {
        gameState.board[i] = gameState.board[i].fill(null)
    }
    //document.getElementsByClassName('mark').style.visibility
}

// function resetGame()
// {

// }
// //Keep track of game state


// //Display game state
// // render
// function renderState() {

// }

// // maybe a dozen or so helper functions for tiny pieces of the interface

function addXOrY(row, column, type) {
    let img = document.createElement("img");

    (type = "x")?img.srs = "x.png": img.srs="o.png";
    img.id = type + "_r" + row + "c" + column;
    img.className = "mark"
    document.body.appendChild(img);
}

// //addXOrY(1,2,"x")

// //Keep track of who is the current player


// //Who is X and who is O





// // listeners
// function onBoardClick() {
//   // update state, maybe with another dozen or so helper functions...

//   renderState() // show the user the new state
// }
// // const board = document.getElementById('board');
// // board.addEventListener('click', onBoardClick); // etc

// // add to above
// function tick() {
//   // this is an incremental change that happens to the state every time you update...

//   renderState()
// }

// setInterval(tick, 1000 / 30) // as close to 30 frames per second as possible

// // now you might have things like
// //document.addEventListener('keydown', function (event) {
//   // here you might read which key was pressed and update the state accordingly
// //})


// // ******** Event Listeners **************


// Check if board is full 
// - loop through array to see if position is full not null

// Calculate winner
// - check each senariou
// - if winner reset board.

// keep track of player
// counter %2 if even x . . . 

// Main target board then run all checks