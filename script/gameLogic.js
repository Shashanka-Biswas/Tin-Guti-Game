const places = document.querySelectorAll(".place");
const playaAgain = document.querySelector("#play_again");
playaAgain.addEventListener("click", () => { document.referrer });
const activePlayer = document.querySelector(".active_player");
let allGutiPlaced = false;
let gutiNumber = 0;
let curentGuti;  //currently clicked guti
let curentGutiClass;
//  array for holding possition
let player1X = [];
let player1Y = [];
let player2X = [];
let player2Y = [];

// Game Loop Start
function gameLoop(curentTime) {
  window.requestAnimationFrame(gameLoop);

  // guti draging
  const guties = document.querySelectorAll(".guti");
  for (let guti of guties) {
    guti.addEventListener('dragstart', dragStart);
    guti.addEventListener('dragend', dragEnd);
  }

  // Co-Linear checking ((GAME OVER and WONER checking))

  // collecting player 1 possition
  const player1Guties = document.querySelectorAll(".player_1_guti")
  for (let guti of player1Guties) {
    player1X.push(guti.offsetLeft);
    player1Y.push(guti.offsetTop);
  }
  // collecting player 2 possition
  const player2Guties = document.querySelectorAll(".player_2_guti")
  for (let guti of player2Guties) {
    player2X.push(guti.offsetLeft);
    player2Y.push(guti.offsetTop);
  }

  // Who is the winner
  if (coLinear(player1X, player1Y)) {
    const result = document.querySelector("#result");
    result.innerText = "RED WIN"
    playaAgain.style.display = "flex";
  } else if (coLinear(player2X, player2Y)) {
    const result = document.querySelector("#result");
    result.innerText = "BLUE WIN"
    playaAgain.style.display = "flex";

  }

  // clearing the position array
  // so that after one loop it can contain the new possition
  player1X = [];
  player1Y = [];
  player2X = [];
  player2Y = [];
}
window.requestAnimationFrame(gameLoop);
// Game Loop End

// Creating guties and draging 
for (const place of places) {
  place.addEventListener('click', addGuti);

  place.addEventListener('dragover', dragOver);
  place.addEventListener('dragenter', dragEnter);
  place.addEventListener('dragleave', dragLeave);
  place.addEventListener('drop', dragDrop);
}

// Drag Functions
function dragStart(e) {
  curentGuti = e.target; //saving current guti
  curentGutiClass = curentGuti.className; //saving current guti class
  setTimeout(() => { this.className = ' invisible' }, 0);
}
function dragEnd() {
  this.className = curentGutiClass; //restoring current guti class
}
function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
  this.className += ' hover';
}
function dragLeave() {
  this.className = 'place';
}
function dragDrop(e) {
  if (e.target.className == 'place hover' && e.target.innerHTML == '') {
    this.className = 'place';
    this.append(curentGuti);  //Adding guti inside the droped place
    if(curentGutiClass == "player_1_guti guti"  && allGutiPlaced){
      activePlayer.innerText = "blue turn";
    }else if(allGutiPlaced){
      activePlayer.innerText = "red turn";
    }
  } else {
    alert(" exist");
    e.target.parentElement.className = 'place';
  }
}

// Guti making callback function
// This function creat two types of guties considering the
// even and ode time play
function addGuti(e) {
  if (gutiNumber < 6) {
    if (gutiNumber % 2 == 0) {
      const guti = document.createElement("div");
      guti.className = "player_1_guti guti";
      guti.setAttribute("draggable", "true");
      if (e.target.innerHTML == '' && e.target.className == "place") {
        e.target.appendChild(guti);
        activePlayer.innerText = "blue turn";
        gutiNumber++;
      } else {
        alert("Allready exist");
      }
    } else {
      const guti = document.createElement("div");
      guti.className = "player_2_guti guti";
      guti.setAttribute("draggable", "true");
      if (e.target.innerHTML == '' && e.target.className == "place") {
        e.target.appendChild(guti);
        activePlayer.innerText = "red turn";
        gutiNumber++;
      } else {
        alert("allready exist");
      }
    }
  }
  if(gutiNumber == 6){
    allGutiPlaced = true;
  }
}

// winner checking function
//  this function check if the  gutis are aline in one line
// This is check with the slop of the three guties
function coLinear(arrX, arrY) {  // slop = distance in Y / distance in X
  if ((arrY[0] - arrY[1]) / (arrX[0] - arrX[1]) == (arrY[1] - arrY[2]) / (arrX[1] - arrX[2])) {
    return true;
  } else {
    return false;
  }
}