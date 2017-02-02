$(document).ready(function(){
  
  const VAL_X = 5, VAL_0 = 1; 
  var turn = 1, 
  player1 = "human",
  player2 = "computer",
  player1Score = 0,
  player2Score = 0, 
  currentValue = VAL_X, 
  nonCurrentValue = VAL_0, 
  currentSymbol = "X", 
  gameSituation = "in progress",
      
  gameBoard = [0,0,0,0,0,0,0,0,0],
  generalStrategyArray = [0,0,0,0,0,0,0,0,0],
  row1, row2, row3, col1, col2, col3, diag1, diag2, sides,
  winArray = [[0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],[0,0,0]],
  
  btnIndex = [["#btn0", "#btn1", "#btn2"], ["#btn3", "#btn4", "#btn5"], ["#btn6", "#btn7", "#btn8"], ["#btn0", "#btn3", "#btn6"], ["#btn1", "#btn4", "#btn7"], ["#btn2", "#btn5", "#btn8"], ["#btn0", "#btn4", "#btn8"], ["#btn2", "#btn4", "#btn6"]],
  
  generalStrategyBtns = ["#btn4", "#btn0", "#btn2", "#btn6", "#btn8", "#btn1", "#btn3", "#btn5", "#btn7"],
      oppositeSideBtns = ["#btn7", "#btn5", "#btn3", "#btn1"];
  
  
  
  /*--------------------------------------------------------------
  BUTTON CLICK EVENTS 
  ---------------------------------------------------------------*/

  $("#player1").on('click', function(){
    if ($(this).html() == "Human - X") {
      $(this).html("Skynet - X");
      player1 = "computer";
    } else {
       $(this).html("Human - X");
      player1 = "human";
    }
    resetScore();
    $("#newGame").click();
  });
  
   $("#player2").on('click', function(){
    if ($( this ).html() == "O - Human") {
      $(this).html("O - Skynet");
      player2 = "computer";
    } else {
       $(this).html("O - Human");
      player2 = "human";
    }
     resetScore(); 
     $("#newGame").click();
  });
  
  $("#newGame").on('click', function(){
    turn = 1;
    gameSituation = "in progress";
    currentValue = VAL_X; 
    currentSymbol = "X"; 
    underlinePlayerToPlay();
    gameBoard = [0,0,0,0,0,0,0,0,0];
    generalStrategyArray = [0,0,0,0,0,0,0,0,0];
    winArray = [[0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0]];
    $("#scoreBoard").html(`${player1Score} : ${player2Score}`);
    $(".boardButton").html("").removeClass("player1Style player2Style winAnimation").prop("disabled", false);
    $("#newGame").html("New Game");
    if (player1 == "computer") {
      console.log("computer should play now!!");
      computerAI(); 
    } else {
      return; 
    }
  }) //newgame
  
  $(".boardButton").on("click", function(){
   $(this).html(currentSymbol);
   let tempStyle = turn % 2 === 0 ? "player2Style" : "player1Style"; 
   $(this).addClass(tempStyle); 
   $(this).prop("disabled", true);
   let btnClicked = $(this).data("num"); 
   updateGameBoard(btnClicked); 
   evaluateWin(); 
   turnUpdate();
 });
  
  /*--------------------------------------------------------------
  END OF TURN FUNCTIONS 
  ---------------------------------------------------------------*/ 
  
  function underlinePlayerToPlay() {
    if (currentSymbol == "X") {
      $("#player1").addClass("underline");
      $("#player2").removeClass("underline");     
    } else {
      $("#player2").addClass("underline");
      $("#player1").removeClass("underline");
    }
  }
  
  function turnUpdate(){
    if (turn < 9 && gameSituation == "in progress") {
      turn += 1; 
      currentSymbol = turn % 2 === 0 ? "O" : "X";
      currentValue = turn % 2 === 0 ? VAL_0 : VAL_X;
      nonCurrentValue = turn % 2 === 0 ? VAL_X : VAL_0;
      underlinePlayerToPlay();
        if (player1 == "computer" && turn % 2 !== 0 || player2 == "computer" && turn % 2 === 0) {
          computerAI(); 
        } else {
          return; 
        }
    } else if (turn == 9 && gameSituation == "in progress") {
      $("#newGame").html("Play again?");
    }  
  }
   
  function evaluateWin () {
    for (let i = 0; i < winArray.length; i++) {
      if ((winArray[i][0] + winArray[i][1] + winArray[i][2]) == currentValue * 3)  {
        $(".boardButton").prop("disabled", true);
        highlightWin(i);
        updateScore(); 
        gameSituation = "winner"; 
        $("#newGame").html("Play again?");
      } 
    }      
  }
  
  function highlightWin(arrayNo){
    $(btnIndex[arrayNo][0]).addClass("winAnimation");
    $(btnIndex[arrayNo][1]).addClass("winAnimation");
    $(btnIndex[arrayNo][2]).addClass("winAnimation");
  }
  
 /*--------------------------------------------------------------
 SCORE UPDATE FUNCTIONS
 ---------------------------------------------------------------*/
  
  function updateScore() {
    if (currentSymbol == "X") {
      player1Score += 1; 
    } else {
      player2Score += 1; 
    }
    $("#scoreBoard").html(`${player1Score} : ${player2Score}`);
  }
  
  function resetScore() {
    player1Score = 0; 
    player2Score = 0;
    $("#scoreBoard").html(`${player1Score} : ${player2Score}`);
  }
  
  /*--------------------------------------------------------------
  GAMEBOARD MODELLING FUNCTION
  ---------------------------------------------------------------*/
  
  function updateGameBoard(btnNo){
    gameBoard[btnNo] = currentValue; 
    row1 = [gameBoard[0], gameBoard[1], gameBoard[2]];
    row2 = [gameBoard[3], gameBoard[4], gameBoard[5]];
    row3 = [gameBoard[6], gameBoard[7], gameBoard[8]];
    col1 = [gameBoard[0], gameBoard[3], gameBoard[6]];
    col2 = [gameBoard[1], gameBoard[4], gameBoard[7]];
    col3 = [gameBoard[2], gameBoard[5], gameBoard[8]];
    diag1 = [gameBoard[0], gameBoard[4], gameBoard[8]];
    diag2 = [gameBoard[2], gameBoard[4], gameBoard[6]];
    sides = [gameBoard[1], gameBoard[3], gameBoard[5], gameBoard[7]];
    winArray = [row1, row2, row3, col1, col2, col3, diag1, diag2];   
    generalStrategyArray = [gameBoard[4], gameBoard[0], gameBoard[2], gameBoard[6], gameBoard[8], gameBoard[1], gameBoard[3], gameBoard[5], gameBoard[7]];
  } 
  
  /*----------------------------------------------------------
  AI AUXILIARY FUNCTIONS
  -----------------------------------------------------------*/

  function canIWinThisTurn() {
    for (let i = 0, x = winArray.length; i < x; i++) {
      if ((winArray[i][0] + winArray[i][1] + winArray[i][2]) == currentValue * 2) { 
        let winBtn = btnIndex[i][winArray[i].indexOf(0)]; 
        $(winBtn).click();
        return true; 
      } 
    }  return false; 
  }  
    
  function canYouWinNextTurn() {
    for (let i = 0, x = winArray.length; i < x; i++) {
      if ((winArray[i][0] + winArray[i][1] + winArray[i][2]) == nonCurrentValue * 2) {
        let blockBtn = btnIndex[i][winArray[i].indexOf(0)];
        $(blockBtn).click();
        return true; 
      } 
    } return false; 
}
  
  function generalStrategy() {
    console.log("GS CALL");
    for (let i in generalStrategyArray) {
      if (generalStrategyArray[i] === 0) {
        $(generalStrategyBtns[i]).click(); 
         break; 
      } 
    } 
  }

  function equalArrays(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

  function sumArray(array) {
    var count = 0;
   for (var i=array.length; i--;) {
     count += array[i];
   }
    return count; 
  }
 
  /*---------------------------------------------------------
  AI CONTROL FUNCTION
  ----------------------------------------------------------*/
   
  function computerAI() {   

    setTimeout(function(){
      
  var didWin =  canIWinThisTurn(); 
    console.log("didwin" + didWin); 
    if (didWin) {
      return; 
    }

  var didBlock = canYouWinNextTurn();
      console.log("didblock" + didBlock);
    if (didBlock) {
      return; 
    }

     if (turn == 5 && gameBoard[1] == 1 && gameBoard[6] === 0) {
     $("#btn6").click();
     return;
   }    
    if (turn == 4 && (equalArrays(diag1, [5,1,5]) || equalArrays(diag2, [5,1,5]))) {
       $("#btn1").click();
        return;
   } 
   
     if (turn == 4 && sumArray(row1) == 6 && sumArray(row3) == 5) {
        $("#btn8").click(); 
        return; 
      }
     if (turn == 4 && sumArray(row1) == 5 && sumArray(row3) == 6) {
        $("#btn0").click(); 
        return; 
      }
     if (turn == 4 && sumArray(col1) == 6 && sumArray(col3) == 5) {
        $("#btn2").click(); 
        return; 
      }
     if (turn == 4 && sumArray(col1) == 5 && sumArray(col3) == 6) {
        $("#btn6").click(); 
        return; 
      }
     
      if (turn == 4 && (equalArrays(sides, [1,0,5,5]) || equalArrays(sides, [1,5,0,5]) || equalArrays(sides, [5,5,1,0]) || equalArrays(sides, [0,5,1,5]))) {
        $("#btn6").click(); 
        return;
      }
      
      if (turn == 4 && (equalArrays(sides, [5,1,5,0]) || equalArrays(sides, [0,1,5,5]) || equalArrays(sides, [5,0,5,1]) || equalArrays(sides, [5,5,0,1]))) {
        $("#btn2").click(); 
        return;
      }
      
     if (turn == 2) {
       for (let i in sides) {
        if (sides[i] == 5) {
          let btn = oppositeSideBtns[i]; 
          $(btn).click();
          return; 
        }  
      } 
     } 
      
     generalStrategy(); 
   
 }, 200);
     
  } //computerAI func
 
   
}); //docready