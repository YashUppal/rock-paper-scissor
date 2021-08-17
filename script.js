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

const playerImage = document.getElementById("player-img");

const buttons = document.querySelectorAll('.selection');

const observerFunc = () => {
    const result = document.getElementsByClassName("result")[0];

    const config = { childList: true };

    const winner = () => {
        for (const [key, value] of Object.entries(POINT)) {
            if (value === 5) {
                return key.substr(0,key.length-4).toUpperCase()
            }
        }
    }

    const callBack = function (mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log('A child node has been added or removed.');
                if (POINT["playerWins"] === 5 || POINT["computerWins"] === 5) {
                    setTimeout(
                        () => { showModal(winner()) }, 100
                    )
                }
            }
        }
    }

    const observer = new MutationObserver(callBack);

    observer.observe(result, config);

    // observer.disconnect();
}




const randomMove = () => {
    const MOVES = ["ROCK", "PAPER", "SCISSORS"];
    return MOVES[Math.floor((Math.random() * (MOVES.length)))]
}

const reset = () => {
    POINT["computerWins"] = 0;
    POINT["playerWins"] = 0;
    document.getElementById("player-img").src = "assets/DEFAULT.png"
    document.getElementById("computer-img").src = "assets/DEFAULTWHITE.png"
    document.getElementsByClassName('computer-victories')[0].innerText = '';
    document.getElementsByClassName('player-victories')[0].innerText = '';
}

function retry() {
    hideModal();
    reset();
}



const changeImage = (player, comp) => {
    document.querySelector("#player-img").setAttribute("src", IMAGES[player])
    document.querySelector("#computer-img").setAttribute("src", IMAGES[`${comp}WHITE`])
}

const addPoint = (winner) => {

    const point = document.createElement('div');
    point.style.width = "20px";
    point.style.height = "10px";

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
        changeResult("computer");
    } else if (playerSelection === computerMove) {
        changeResult("draw");
    } else {
        changeResult("player");
    }

}

const showModal = (winner) => {
    document.getElementsByClassName("winner")[0].innerText = `${winner} won.`
    document.getElementById("alertModal").style.display = "flex";
    document.getElementsByClassName("modal-container")[0].style.display = "flex";
    disableButtons();
}

const hideModal = () => {
    document.getElementById("alertModal").style.display = "none";
    document.getElementsByClassName("modal-container")[0].style.display = "none";
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

const playRound = (playerMove, computerMove) => {
    // observerFunc()
    const playerSelection = playerMove.target.value.toUpperCase()
    computerMove = randomMove();

    document.getElementById("player-img").classList.add("animate");
    document.getElementById("computer-img").classList.add("animate");
    setTimeout(() => {
        document.getElementById("player-img").classList.remove("animate");
        document.getElementById("computer-img").classList.remove("animate");

        changeImage(playerSelection, computerMove);
        compareMoves(playerSelection, computerMove);
    },500)




}



buttons.forEach(
    (button) => {
        console.log(button.value);
        button.addEventListener('click', playRound)
    }
)

document.addEventListener('load', observerFunc())