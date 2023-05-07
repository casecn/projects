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
    turns: 0,
    wins: 0,
    xBoard: [null, null, null, null, null, null, null, null, null]
};
const oStats = {
    turns: 0,
    wins: 0,
    oBoard: [null, null, null, null, null, null, null, null, null]
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
    const target = event.target
    //console.log(target.dataset.index)
    if (event.srcElement.className ==="click_div"){
        let divID = target.id;
        let token = gameState.players[0];
        let divIndex = target.dataset.index

        // - determine row and column
        let row = divID.substr(1, 1)-1;
        let column = divID.substr(3, 1)-1;
        let currentCellValue = gameState.board[row][column];

         // if empty cell then process the play
        if (currentCellValue === null)
        {
            changeToken(); //set token
            displayXOrY(target.id, token); //add token to board
            recordMove(token, divIndex)
            checkForWinner(token) //look for winner

            counter++; // count cycles.  even are 'o' and odd are 'x'
        }
    };
}

//########################## Reset Game Functions #################//
function resetGame(){
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
function displayXOrY(divTarget, type) {
    const img = document.createElement("img");

    if (type === "x")
    {img.src = "x.png"}
    else
    {img.src = "o.png"};

    img.id = type + "_"+ divTarget;
    img.className = "mark"
    document.getElementById("main").appendChild(img);
}
function recordMove(token, divIndex){
    (token === "x")? xStats.xBoard[divIndex]=1: oStats.oBoard[divIndex]=1; //Update token array.
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
// winning combo arrays
const winningScenarios = {
    row1: [1, 1, 1, null, null, null, null, null, null],
    row2: [null, null, null, 1, 1, 1, null, null, null],
    row3: [null, null, null, null, null, null, 1, 1, 1],
    col1: [1, null, null, 1, null, null, 1, null, null],
    col2: [null, 1, null, null, 1, null, null, 1, null],
    col3: [null, null, 1, null, null, 1, null, null, 1],
    crossDirection1: [1, null, null, null, 1, null, null, null, 1],
    crossDirection2: [null, null, 1, null, 1, null, 1, null, null]
}

function checkForWinner(token)
{
    //use counter for each token.  If < 3 then don't check.
    let winArray = []
    if (token === "x"){
        winArray = xStats.xBoard
    }
    else{
        winArray = oStats.oBoard;
    }
    
    if (!(winArray.turns < 3)){
        let sumArray = [];
        sumArray[0] = winArray.slice(0, 3); // Sum of Row 1
        sumArray[1] = winArray.slice(3, 6);// Sum of Row 2
        sumArray[2] = winArray.slice(6, 9);// Sum of Row 3
        sumArray[3]= [winArray[0], winArray[3], winArray[6]]; // Sum of Column 1
        sumArray[4]= [winArray[1], winArray[4], winArray[7]]; // Sum of Column 2
        sumArray[5]= [winArray[2], winArray[5], winArray[8]]; // Sum of Column 3
        sumArray[6]= [winArray[0], winArray[4], winArray[8]]; // Sum of Diagonal 1
        sumArray[7]= [winArray[3], winArray[4], winArray[7]]; // Sum of Diagonal 2
        
        //Iterate through sumArray and sum each array within.  If >= 3 then winner.
        for (let i=0; i < sumArray.length; i++){
            let winningSum = sumArray[i].reduce((numSum, arrayValue) => {
                                return numSum + arrayValue;
                            },0);
            if (winningSum ===3){
                window.alert(`${token} Wins!`)
            }
            
        }
        //use array.prototype.reduce(slice(0 , 2)) to sum each row.  If = 3, then winner.
    }
    //test for column and diagonal wins.  extract values of each column or diagonal to see if they sum to 3
    //If winner, then instantiate winner function
}

function winner (token){
    //increment token wins element (oStat.wins or xStats.wins)

    //display message
    //clear board.
}
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