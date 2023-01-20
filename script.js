let game = Array.from({length: 7}, () => Array.from({length: 8}, () => 0));

var player1 = 1;
var player2 = 1;

var turn = -1;
const DEPTH = 3;
const MAX_PLAYER = 1;
const MIN_PLAYER = -1;
var TURN;

function getPossibleMoves(board){
    var moves = new Array();

    for(var j = 0; j<board[0].length; j++){
        for(var i = 0; i<board.length; i++){
            if(board[i][j] == 0){

                moves.push(j);
                break;
            }
        }
    }
    return moves;
}

function makeMove(board, move){
        for(var j = 0; j<board.length; j++){
            if(board[j][move] == 0){
                board[j][move] = TURN;
                TURN *= -1;
                break;
            }
        }
}

function undoMove(board, move){
    for(var j = 0; j<board.length; j++){
        if(board[6][move] != 0){
            board[6][move] = 0;
        }
        if(board[j][move] == 0){
            board[j-1][move] = 0;
            TURN *= -1;
            break;
        }
    }
}

function minimax(board, depth, player) {
    if(controlGame(board) == MIN_PLAYER){
        return -10000000 + heuristicValue(board);
    }
    if(controlGame(board) == MAX_PLAYER){
        return 10000000 + heuristicValue(board);
    }
    if (depth === 0) {
        return heuristicValue(board);
    }
  
    let bestValue = player === MAX_PLAYER ? -Infinity : Infinity;
    let currentValue;
    let bestMove;
    let moves = getPossibleMoves(board);
    
    for (let i = 0; i < moves.length; i++) {
        let move = moves[i];
        TURN = player;
        makeMove(board, move); 
        currentValue = minimax(board, depth - 1, player*-1); 
        undoMove(board, move); 
  
        if (player === MAX_PLAYER) {
            if (currentValue > bestValue) {
                bestValue = currentValue;
                bestMove = move;
            }
        } else {
            if (currentValue < bestValue) {
                bestValue = currentValue;
                bestMove = move;
            }
        }
    }
    
    if (depth === DEPTH) {
        return bestMove;
    } else {
        return bestValue;
    }
}

function redAI(){
    var currentPlayer = MAX_PLAYER;
    let depth = DEPTH;
    var board = JSON.parse(JSON.stringify(game));
    let bestMove = minimax(board, depth, currentPlayer);
    move("red" ,bestMove+1);
}

function move(color, columnNo){
    if((color=="black"&&turn==-1) || (color=="red" && turn==1)){
        
    } else{
        return;
    }
    
    for(var i = 0; i<game.length; i++){
        if(game[i][columnNo-1] == 0){
            var asd = (i+1)+"-"+columnNo;
            document.getElementById(asd).style.background = color;
            if(turn == -1){
                game[i][columnNo-1] = MIN_PLAYER;
            } else {
                game[i][columnNo-1] = MAX_PLAYER;
            }
            turn*=-1;

            if(turn == -1){
                var reds = document.getElementsByClassName("red-action-button");
                for(var i = 0; i<reds.length; i++){
                    reds[i].disabled = true;
                }
                var blacks = document.getElementsByClassName("black-action-button");
                for(var i = 0; i<blacks.length; i++){
                    blacks[i].disabled = false;
                }
            }
            if(turn == 1){
                var blacks = document.getElementsByClassName("black-action-button");
                for(var i = 0; i<blacks.length; i++){
                    blacks[i].disabled = true;
                }
                var reds = document.getElementsByClassName("red-action-button");
                for(var i = 0; i<reds.length; i++){
                    reds[i].disabled = false;
                }
            }
        }
    }

    if(color == "black"){
        if(player2 == 0 && player1 == 1){
            redAI();
        }
    }


    if(controlGame(game)){
        var buttons = document.getElementsByClassName("black-action-button");
        for(var i = 0; i<buttons.length; i++){
            buttons[i].disabled = true;
        }
        var buttons = document.getElementsByClassName("red-action-button");
        for(var i = 0; i<buttons.length; i++){
            buttons[i].disabled = true;
        }
        if(controlGame(game) == -1){
            document.getElementById("winner-black").style.display = "initial";
        }else {
            document.getElementById("winner-red").style.display = "initial";
        }
        return;
    }

}

function controlGame(game){
    for(var i = 0; i<game.length; i++){
        for(var j = 0; j<game[i].length; j++){
            if(game[i][j] == -1) {
                if(j <= 4 && game[i][j+1] == -1 && game[i][j+2] == -1 && game[i][j+3] == -1){
                    return MIN_PLAYER;
                }
                if(i <= 3 && game[i+1][j] == -1 && game[i+2][j] == -1 && game[i+3][j] == -1){
                    return MIN_PLAYER;
                }
                if(j<=4 && i <= 3 && game[i+1][j+1] == -1 && game[i+2][j+2] == -1 && game[i+3][j+3] == -1){
                    return MIN_PLAYER;
                }
                if(j>=3 && i <= 3 && game[i+1][j-1] == -1 && game[i+2][j-2] == -1 && game[i+3][j-3] == -1){
                    return MIN_PLAYER;
                }
            }

            if(game[i][j] == 1) {
                if(j <= 4 && game[i][j+1] == 1 && game[i][j+2] == 1 && game[i][j+3] == 1){
                    return MAX_PLAYER;
                }
                if(i <= 3 && game[i+1][j] == 1 && game[i+2][j] == 1 && game[i+3][j] == 1){
                    return MAX_PLAYER;
                }
                if(j<=4 && i <= 3 && game[i+1][j+1] == 1 && game[i+2][j+2] == 1 && game[i+3][j+3] == 1){
                    return MAX_PLAYER;
                }
                if(j>=3 && i <= 3 && game[i+1][j-1] == 1 && game[i+2][j-2] == 1 && game[i+3][j-3] == 1){
                    return MAX_PLAYER;
                }
            }
        }
    }
    return 0;
}

// HUMAN VS AI
function hva(){
    restart();
    player1 = 1; // Human
    player2 = 0; // AI

    document.getElementById("hva").disabled = true;
    document.getElementById("hvh").disabled = false;

    document.getElementById("red-action-button-row").style.visibility = "hidden";
    document.getElementById("black-action-button-row").style.visibility = "visible";
}

// HUMAN VS HUMAN
function hvh(){
    restart();
    player1 = 1; // Human
    player2 = 1; // Human

    document.getElementById("hva").disabled = false;
    document.getElementById("hvh").disabled = true;

    document.getElementById("red-action-button-row").style.visibility = "visible";
    document.getElementById("black-action-button-row").style.visibility = "visible";
}

function restart(){
    for(var j = 0; j<game[0].length; j++){
        for(var i = 0; i<game.length; i++){
            var asd = (i+1)+"-"+(j+1);
            document.getElementById(asd).style.background = "gainsboro";
        }
    }

    game = Array.from({length: 7}, () => Array.from({length: 8}, () => 0));
    turn = -1;

    if(turn == -1){
        var reds = document.getElementsByClassName("red-action-button");
        for(var i = 0; i<reds.length; i++){
            reds[i].disabled = true;
        }
        var blacks = document.getElementsByClassName("black-action-button");
        for(var i = 0; i<blacks.length; i++){
            blacks[i].disabled = false;
        }
    }
    if(turn == 1){
        var blacks = document.getElementsByClassName("black-action-button");
        for(var i = 0; i<blacks.length; i++){
            blacks[i].disabled = true;
        }
        var reds = document.getElementsByClassName("red-action-button");
        for(var i = 0; i<reds.length; i++){
            reds[i].disabled = false;
        }
    }

    document.getElementById("winner-red").style.display = "none";
    document.getElementById("winner-black").style.display = "none";
}

function heuristicValue(board){
    var score = 0;
    var counter = 0;

    for(var i = 0; i<board.length; i++){
        for(var j = 0; j<board[i].length; j++){
            if(board[i][j] == MAX_PLAYER || board[i][j] == 0){
                counter = 0;
                if(j <= 4 && (game[i][j+1] == MAX_PLAYER || game[i][j+1] == 0) && (game[i][j+2] == MAX_PLAYER || game[i][j+2] == 0) && (game[i][j+3] == MAX_PLAYER || game[i][j+3] == 0)){
                    if(j <= 4 && game[i][j+1] == MAX_PLAYER){
                        counter++;
                    }
                    if(j <= 4 && game[i][j+2] == MAX_PLAYER){
                        counter++;
                    }
                    if(j <= 4 && game[i][j+3] == MAX_PLAYER){
                        counter++;
                    }
                }
                if(counter >= 1){
                    score += Math.pow(10,counter);
                }
                counter = 0;
                if(i <= 3 && (game[i+1][j] == MAX_PLAYER || game[i+1][j] == 0) && (game[i+2][j] == MAX_PLAYER || game[i+2][j] == 0) && (game[i+3][j] == MAX_PLAYER || game[i+3][j] == 0)){
                    if(i <= 3 && game[i+1][j] == MAX_PLAYER){
                        counter++;

                    }
                    if(i <= 3 && game[i+2][j] == MAX_PLAYER){
                        counter++;
                        
                    }
                    if(i <= 3 && game[i+3][j] == MAX_PLAYER){
                        counter++;
                        
                    }
                }
                if(counter >= 1){
                    score += Math.pow(10,counter);
                }
                counter = 0;
                if(j<=4 && i <= 3 && (game[i+1][j+1] == MAX_PLAYER || game[i+1][j+1] == 0) && (game[i+2][j+2] == MAX_PLAYER || game[i+2][j+2] == 0) && (game[i+3][j+3] == MAX_PLAYER || game[i+3][j+3] == 0)){
                    if(j<=4 && i <= 3 && game[i+1][j+1] == MAX_PLAYER){
                        counter++;

                    }
                    if(j<=4 && i <= 3 && game[i+2][j+2] == MAX_PLAYER){
                        counter++;
                        
                    }
                    if(j<=4 && i <= 3 && game[i+2][j+2] == MAX_PLAYER){
                        counter++;
                        
                    }
                }
                if(counter >= 1){
                    score += Math.pow(10,counter);
                }
                counter = 0;
                if(j>=3 && i <= 3 && (game[i+1][j-1] == MAX_PLAYER || game[i+1][j-1] == 0) && (game[i+2][j-2] == MAX_PLAYER || game[i+2][j-2] == 0) && (game[i+3][j-3] == MAX_PLAYER || game[i+3][j-3] == 0)){
                    if(j>=3 && i <= 3 && game[i+1][j-1] == MAX_PLAYER){
                        counter++;

                    }
                    if(j>=3 && i <= 3 && game[i+2][j-2] == MAX_PLAYER){
                        counter++;
                        
                    }
                    if(j>=3 && i <= 3 && game[i+3][j-3] == MAX_PLAYER){
                        counter++;
                        
                    }
                }
                if(counter >= 1){
                    score += Math.pow(10,counter);
                }
                counter = 0;
            }

            if(board[i][j] == MIN_PLAYER || board[i][j] == 0){
                counter = 0;
                if(j <= 4 && (game[i][j+1] == MIN_PLAYER || game[i][j+1] == 0) && (game[i][j+2] == MIN_PLAYER || game[i][j+2] == 0) && (game[i][j+3] == MIN_PLAYER || game[i][j+3] == 0)){
                    if(j <= 4 && game[i][j+1] == MIN_PLAYER){
                        counter++;
                    }
                    if(j <= 4 && game[i][j+2] == MIN_PLAYER){
                        counter++;
                    }
                    if(j <= 4 && game[i][j+3] == MIN_PLAYER){
                        counter++;
                    }
                }
                if(counter >= 1){
                    score -= Math.pow(10,counter);
                }
                counter = 0;
                if(i <= 3 && (game[i+1][j] == MIN_PLAYER || game[i+1][j] == 0) && (game[i+2][j] == MIN_PLAYER || game[i+2][j] == 0) && (game[i+3][j] == MIN_PLAYER || game[i+3][j] == 0)){
                    if(i <= 3 && game[i+1][j] == MIN_PLAYER){
                        counter++;

                    }
                    if(i <= 3 && game[i+2][j] == MIN_PLAYER){
                        counter++;
                        
                    }
                    if(i <= 3 && game[i+3][j] == MIN_PLAYER){
                        counter++;
                        
                    }
                }
                if(counter >= 1){
                    score -= Math.pow(10,counter);
                }
                counter = 0;
                if(j<=4 && i <= 3 && (game[i+1][j+1] == MIN_PLAYER || game[i+1][j+1] == 0) && (game[i+2][j+2] == MIN_PLAYER || game[i+2][j+2] == 0) && (game[i+3][j+3] == MIN_PLAYER || game[i+3][j+3] == 0)){
                    if(j<=4 && i <= 3 && game[i+1][j+1] == MIN_PLAYER){
                        counter++;

                    }
                    if(j<=4 && i <= 3 && game[i+2][j+2] == MIN_PLAYER){
                        counter++;
                        
                    }
                    if(j<=4 && i <= 3 && game[i+2][j+2] == MIN_PLAYER){
                        counter++;
                        
                    }
                }
                if(counter >= 1){
                    score -= Math.pow(10,counter);
                }
                counter = 0;
                if(j>=3 && i <= 3 && (game[i+1][j-1] == MIN_PLAYER || game[i+1][j-1] == 0) && (game[i+2][j-2] == MIN_PLAYER || game[i+2][j-2] == 0) && (game[i+3][j-3] == MIN_PLAYER || game[i+3][j-3] == 0)){
                    if(j>=3 && i <= 3 && game[i+1][j-1] == MIN_PLAYER){
                        counter++;

                    }
                    if(j>=3 && i <= 3 && game[i+2][j-2] == MIN_PLAYER){
                        counter++;
                        
                    }
                    if(j>=3 && i <= 3 && game[i+3][j-3] == MIN_PLAYER){
                        counter++;
                        
                    }
                }
                if(counter >= 1){
                    score -= Math.pow(10,counter);
                }
                counter = 0;
            }
        }
    }
    return score;
}