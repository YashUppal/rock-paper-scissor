// On click of selection
// Generate computer random selection - random computer selection function
// Compare computer with player - decide winner

const MOVES_PRECEDENCE = {
    "ROCK": "PAPER", // Rock defeated by paper
    "PAPER": "SCISSORS", // Paper defeated by scissors
    "SCISSORS": "ROCK", // Scissors defeated by rock
}

const IMAGES = {
    "ROCK": "assets/ROCK.png",
    "PAPER": "assets/PAPER.png",
    "SCISSORS": "assets/SCISSORS.png",
    "ROCKWHITE": "assets/ROCKWHITE.png",
    "PAPERWHITE": "assets/PAPERWHITE.png",
    "SCISSORSWHITE": "assets/SCISSORSWHITE.png",
    "DEFAULT": "assets/DEFAULT.png",
    "DEFAULTWHITE": "assets/DEFAULTWHITE.png",
}

const POINT = {
    "playerWins": 0,
    "computerWins": 0
}

const buttons = document.querySelectorAll('button');


const randomMove = () => {
    const MOVES = ["ROCK", "PAPER", "SCISSORS"];
    return MOVES[Math.floor((Math.random() * (MOVES.length)))]
}

const changeImage = (player, comp) => {
    document.querySelector("#player-img").setAttribute("src", IMAGES[player])
    document.querySelector("#computer-img").setAttribute("src", IMAGES[`${comp}WHITE`])
}

const addPoint = (winner) => {

    const point = document.createElement('div');
    point.style.width = "20px";
    point.style.height = "10px";
    console.log(point);

    if (winner === "player") {
        point.style.backgroundColor = "rgb(122, 206, 122)";
        document
            .getElementsByClassName('player-victories')[0]
            .appendChild(point)
    } else if (winner === "computer") {
        point.style.backgroundColor = "rgb(230, 160, 120)";
        document
            .getElementsByClassName('computer-victories')[0]
            .appendChild(point);
    }
}

const changeResult = (result) => {


    
    const resultBoard = document.querySelector('.result');

    console.log(resultBoard);

    if (result === "player") {
        resultBoard.className = 'result';
        resultBoard.classList.add("player-win");
        resultBoard.innerText = "Player Wins!"
        POINT["playerWins"] += 1;
        addPoint("player")
        
    } else if (result === "computer") {
        resultBoard.className = 'result';
        resultBoard.classList.add("computer-win");
        resultBoard.innerText = "Computer Wins!"
        POINT["computerWins"] += 1;
        addPoint("computer")
    } else {
        resultBoard.className = 'result'; // reset
        resultBoard.classList.add("draw");
        resultBoard.innerText = "Draw!"
    }



}

const compareMoves = (playerSelection, computerMove) => {

    

    if (MOVES_PRECEDENCE[playerSelection] === computerMove) {
        console.log("Computer wins")
        changeResult("computer");
    } else if (playerSelection === computerMove) {
        console.log("DRAW");
        changeResult("draw");
    } else {
        console.log("Player wins")
        changeResult("player");
    }

    if (POINT["playerWins"] === 5 || POINT["computerWins"] === 5) {
        alert("asdf");
    }
}

const retry = () => {
    POINT["playerWins"] = 0;
    POINT["computerWins"] = 0;
    hideModal();
    document.querySelector("#player-img").setAttribute("src", IMAGES["DEFAULT"])
    document.querySelector("#computer-img").setAttribute("src", IMAGES["DEFAULTWHITE"])
}


const showModal = () => {
    document.getElementById("alertModal").style.display = "flex";
    disableButtons();
}

const hideModal = () => {
    document.getElementById("alertModal").style.display = "none";
    enableButtons();
}

const enableButtons = () => {
    const buttons = document.querySelectorAll(".selection");
    buttons.forEach(
        (btn) => {
            btn.disabled = false;
        }
    )
}

const disableButtons = () => {
    const buttons = document.querySelectorAll(".selection");
    buttons.forEach(
        (btn) => {
            btn.disabled = true;
        }
    )
}

const playRound = (playerMove, computerMove = randomMove()) => {
    // console.log(playerMove.target.value)
    // console.log("Player: " + playerMove.target.value);
    // console.log("Computer: " + computerMove);
    // console.log(MOVES_PRECEDENCE[playerSelection] === computerMove)

    const playerSelection = playerMove.target.value.toUpperCase()

    // changeImage(playerSelection, computerMove);
    compareMoves(playerSelection, computerMove);

}



buttons.forEach(
    (button) => {
        // console.log(button.value);
        button.addEventListener('click', playRound)
    }
)