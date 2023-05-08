// // Constants
const gameState = {
    players: ['x', 'o'],
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0]
}
const xStats = {
    turns: 0,
    wins: 0,
    xBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0]
};
const oStats = {
    turns: 0,
    wins: 0,
    oBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0]
};

  let counter = 0;
  const startToken = 'x';
  const secondToken = 'o';

// ********** Target Elements ****************/
const divClick = document.getElementById("main")
const newGameBtn = document.getElementById("newGame")
const btnClick = document.getElementById("clearBtn")

// ********** Event Listeners ***************/
divClick.addEventListener ("click", processClick);
newGameBtn.addEventListener("click", resetGame) 
btnClick.addEventListener("click", resetGamebtn) 
// ********** Functions *********************/

function processClick(event){
    const target = event.target
    if (event.srcElement.className ==="click_div" && counter <=9){
        //let divID = target.id;
        let token = gameState.players[0];
        let divIndex = target.dataset.index

        // - determine row and column
        // let row = divID.substr(1, 1)-1;
        // let column = divID.substr(3, 1)-1;
        let currentCellValue = gameState.board[divIndex];

         // if empty cell then process the play
        if (currentCellValue === 0)
        {
            displayXOrY(target.id, token); //add token to board
            recordMove(token, divIndex)
            checkForWinner(token) //look for winner
            changeToken(); //set token
            counter++; // count cycles.  even are 'o' and odd are 'x'
            
        }
    };
}

function disableClick(){
    divClick.removeEventListener ("click", processClick); 
}
function modalMessage(token, messageText = "Hi I am a message!"){
    if (messageText =="Hi I am a message!"){
        document.getElementById("winner_text").innerHTML = `<u>'${token}' Wins!!!</u></br>"Flawless Victory!"`;
    }
    else {
        document.getElementById("winner_text").innerHTML = messageText;
    }
    document.getElementById('message').className = "modal";
}

//########################## Reset Game Functions #################//
function resetGame(){
    clearBoard(); // Clear marks off board.
    clearStatBoards(); // reset gameState.board to null.
    resetGameStats();
    counter = 0;
    divClick.addEventListener ("click", processClick);
}

function resetGamebtn(){
    resetGame();
    document.getElementById('message').className = "modal hidden";

}
function clearStatBoards(){
//reset the status arrays to null
    gameState.board = gameState.board.fill(0)
    oStats.oBoard = oStats.oBoard.fill(0)
    xStats.xBoard = xStats.xBoard.fill(0)
}

// Clear board
function clearBoard(){
    const markImg = document.querySelectorAll('.mark')
    for (let i=0; i<markImg.length; i++){
        divClick.removeChild(markImg[i]);
    }
}

function resetGameStats (){
    gameState.players[0] = 'x';
    gameState.players[1] = 'o';
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
    if(counter % 2 == 0){
        gameState.players[0] = secondToken;
        gameState.players[1] = startToken;
    }
    else {
        gameState.players[0] = startToken;
        gameState.players[1] = secondToken;
    }
}

//################## Check for winner functions #########################//
//wrap all winnder functions in a wrapper function to be called in the main loop.
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
        //Array of the results for each senario 
        let sumArray = [];
        sumArray[0] = winArray.slice(0, 3); // Results of Row 1
        sumArray[1] = winArray.slice(3, 6);// Results of Row 2
        sumArray[2] = winArray.slice(6, 9);// Results of Row 3
        sumArray[3]= [winArray[0], winArray[3], winArray[6]]; // Results of Column 1
        sumArray[4]= [winArray[1], winArray[4], winArray[7]]; // Results of Column 2
        sumArray[5]= [winArray[2], winArray[5], winArray[8]]; // Results of Column 3
        sumArray[6]= [winArray[0], winArray[4], winArray[8]]; // Results of Diagonal 1
        sumArray[7]= [winArray[2], winArray[4], winArray[6]]; // Results of Diagonal 2
        
        //Iterate through sumArray and sum each array within.  If = 3 then winner.
        for (let i=0; i < sumArray.length; i++){
            let winningSum = sumArray[i].reduce((numSum, arrayValue) => {
                                return numSum + arrayValue;
                            },0);
            if (winningSum ===3){
                winner(token);
                return
            }
            else if(counter == 8){
                modalMessage(token, "Cat's Meow!</br>There are fates worse than death!");
                disableClick()
                return
            }
        }
    }
}
function winner (token){
    token = token.toUpperCase() //increment token wins element (oStat.wins or xStats.wins)
    modalMessage(token); //display message
    disableClick() //disable click
}