// // Constants
const gameState = {
    players: ['x', 'o'],
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}
const xStats = {
    xWins: 0,
    xBoard: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
};
const oStats = {
    oWins: 0,
    oBoard: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
};
  let counter = 0;
  const startToken = 'x';
  const secondToken = 'o';

// ********** Target Elements ****************/
const divClick = document.getElementById("main")
const newGameBtn = document.getElementById("newGame")



// ********** Event Listeners ***************/
divClick.addEventListener ("click", function(event){processClick(event)})

newGameBtn.addEventListener("click", function(event){resetGame(event)})


// ********** Functions *********************/

function processClick(event){
    const target = event.target;
    if (event.srcElement.className ==="click_div"){
        let divID = target.id;
        let token = gameState.players[0];

        // - determine row and column
        let row = divID.substr(1, 1)-1;
        let column = divID.substr(3, 1)-1;
        let currentCellValue = gameState.board[row][column];

         // if empty cell then process the play
        if (currentCellValue === null)
        {
            changeToken(); //set token
            gameState.board[row][column] = token; //update gameState.board
            
            addXOrY(target.id, token); //add token to board
            
            (token === "x")? xStats.xBoard[row][column]="x": oStats.oBoard[row][column]="o"; //Update token array.

            //look for winner

            // Switch token
        
            //gameState.players[1] = token;    
        // - counter %2 if even x . . . 
        // - switch gameState.players

            counter++; // count cycles.  even are 'o' and odd are 'x'
        }
    };
}

//########################## Reset Game Functions #################//
function resetGame() 
{console.log(gameState.board)
    clearBoard() // Clear marks off board.
    clearStatBoards() // reset gameState.board to null.

}

function clearStatBoards(){
// //reset the status arrays to null
    for(let i = 0; i<gameState.board.length; i++)    {
        gameState.board[i] = gameState.board[i].fill(null)
    }
    for(let i = 0; i<oStats.oBoard.length; i++)    {
        oStats.oBoard[i] = oStats.oBoard[i].fill(null)
    }
    for(let i = 0; i<xStats.xBoard.length; i++)    {
        xStats.xBoard[i] = xStats.xBoard[i].fill(null)
    }

}

// Clear board
function clearBoard(){
    const markImg = document.querySelectorAll('.mark')
    for (let i=0; i<markImg.length; i++){
        divClick.removeChild(markImg[i]);
    }
}

//################## Update State Functions #########################//
function addXOrY(divTarget, type) {
    const img = document.createElement("img");

    if (type === "x")
    {img.src = "x.png"}
    else
    {img.src = "o.png"};

    img.id = type + "_"+ divTarget;
    img.className = "mark"
    document.getElementById("main").appendChild(img);
}

function changeToken(){
    //console.log(`Counter: ${counter}   Modulo: ${counter % 2}   player[0] ${gameState.players[0]}  player[1]: ${gameState.players[1]}`);
    if(counter % 2 == 0){
        gameState.players[0] = secondToken;
        gameState.players[1] = startToken;
    //console.log("in even");
    }
    else {
        gameState.players[0] = startToken;
        gameState.players[1] = secondToken;
    //console.log ("in odd")
    }
    //console.log(`Counter: ${counter}   Modulo: ${counter % 2}   player[0] ${gameState.players[0]}  player[1]: ${gameState.players[1]}`);
}

//################## Check for winner functions #########################//

//wrap all winnder functions in a wrapper function to be called in the main loop.


//convert array to string

//compar strings against winning combination strings

//display message when there is a winner.




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
// - if winner popup Winner !!!!!.



// Main target board then run all checks