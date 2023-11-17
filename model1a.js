let board = [0,0,0,0,0,0,0,0,0]
let cells = []
let blocker = false
let gameEnd = false

function turn() {
  let ceros = 0;
  for (let i = 0; i < 9; i++) {
    board[i] === 0 && (ceros+=1);
  }
  return 2 - ceros%2
}

function loop(quant = 1, funct) {
  for (let i = 0; i < quant; i++) {
    funct(i)
  }
}

function createCells(i) {
  let newCell = document.createElement('div');
  newCell.classList.add('cell');
  newCell.id = `id${i}`;
  let cellParagraph = document.createElement('p');
  cellParagraph.innerText = "";
  newCell.appendChild(cellParagraph)
  newCell.onclick = function() {
    if (board.filter(x => x===0).length === 0) {
      return
    }
    if (board[i] !== 0 && !blocker && !gameEnd) {
      document.body.querySelector("#visor p").innerText = "Ocuppied";
    }
    if (board[i] === 0 && !blocker && !gameEnd) {
      blocker = true;
      //console.log(true)
      playMove(i);
      if (!gameEnd) {callAI()};
    } 
  }
  cells.push(newCell);
  document.getElementById('board').appendChild(newCell);
}

loop(9, createCells)


function evaluateState() {
  let result =verificacionEstado(board)
  if (result[0] !== null) {endGame(result)}
}



function callAI() {
  let time = 600;
  if (!board.includes(1)) {
    console.log("Line 58");
    time = 000};
  setTimeout(function(){
    if (gameEnd) {return};
  
    let posicion = getPosition(board, negamax(board)[0])
    
    playMove(posicion)
      
    blocker = false
    //console.log(false); 
  }, time)
  
}

function playMove(posicion) {
  if (gameEnd) {return}

  let turno = turn();
  board[posicion] = turno;
  let cell = document.getElementById(`id${posicion}`);
  cell.querySelector("p").innerText = {1:"X", 2:"O"}[turno];
  cell.style.color = {1:"rgb(255, 100, 100)",2:"rgb(100, 100, 255)"}[turno];
  cell.style.textShadow = {1:"0px 0px 0.1vw rgb(235, 50, 50)",2:"0px 0px 0.1vw rgb(50, 50, 235)"}[turno];
  document.body.querySelector("#visor p").innerText = "";
  
  evaluateState()
}


function endGame(result) {
  gameEnd = true;
  if (result[0] === 11) {
    document.body.querySelector("#visor p").innerText = `${result[2]} wins!`;
    let punctuation = document.body.querySelector({"X":"#redPunctuation p","O":"#bluePunctuation p"}[result[2]]);
    punctuation.innerText = `${parseInt(punctuation.innerText)+1}`
    for (let i=0; i < 3; i++) {
      let winningCell = document.getElementById(`id${result[1][i]}`);
      winningCell.style.backgroundColor = {"X":"rgb(255,225,225)","O":"rgb(225,225,255)"}[result[2]]
    }
  } else {
    document.body.querySelector("#visor p").innerText = `It's a tie!`;
  }
}


function resetButtonPress(key = false) {
  if (blocker && !gameEnd) {
    //console.log("DKDK")
    return}
  blocker = true
  gameEnd = false
  loop(9, function (i) {
    document.body.querySelector(`#id${i} p`) .innerText = "";
    document.body.querySelector("#visor p").innerText = "";
    board = [0,0,0,0,0,0,0,0,0];
    for (let i = 0; i < 9; i++) {
      document.getElementById(`id${i}`).style.backgroundColor = "rgb(255,255,255)"
    }
  })

  if (document.getElementById("switchButton").innerText === "2" && key) {
    callAI()
  } else {
    blocker = false
  }
}


function switchButtonPress() {
  if (blocker && !gameEnd) {return}
  blocker = true
  gameEnd = false
  switchButton = document.getElementById("switchButton");
  document.body.querySelector("#redPunctuation p").innerText = "0"
  document.body.querySelector("#bluePunctuation p").innerText = "0"
  loop(9, function (i) {
    document.body.querySelector(`#id${i} p`) .innerText = "";
    document.body.querySelector("#visor p").innerText = "";
    board = [0,0,0,0,0,0,0,0,0];
    for (let i = 0; i < 9; i++) {
      document.getElementById(`id${i}`).style.backgroundColor = "rgb(255,255,255)"
    }
  })
  if (switchButton.innerText === "1") {
    switchButton.innerText = "2";
    switchButton.style.backgroundColor = "rgb(120, 120, 255)";
    callAI();
  } else {
    switchButton.innerText = "1";
    switchButton.style.backgroundColor = "rgb(255, 120, 120)";
    blocker = false;
  }
  
}
