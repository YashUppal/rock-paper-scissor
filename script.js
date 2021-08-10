
const MOVES = ["ROCK", "PAPER", "SCISSORS"];

const moveRanks = {
    "ROCK": "SCISSORS",
    "PAPER": "ROCK",
    "SCISSORS": "PAPER"
}

const computerPlay = () => {
    return randomMove();
}

const randomMove = () => {
    return MOVES[Math.floor(Math.random() * MOVES.length)];
}

const playRound = (playerSelection, computerSelection) => {
    playerSelection = playerSelection.toUpperCase();

    if (playerSelection === computerSelection) {
        return "Draw!";
    } else if (moveRanks[playerSelection] === computerSelection) {
        return "You Win!";
    } else {
        return `You Lose! ${computerSelection} beats ${playerSelection}`;
    }
}

const playerInputValidate = (playerSelection) => {
    if (!MOVES.includes(playerSelection.toUpperCase())) {
        alert("Please choose among 1.Rock 2.Paper 3.Scissors");
        return true;
    }
    return false;
}

const game = () => {
    let playerScore = 0;
    let computerScore = 0;

    let playGame = true;
    
    while (playGame) {
        
        let playerSelection = prompt("Choose your weapon.");

        while (playerInputValidate(playerSelection)) {
            // Hold
            playerSelection = prompt("Choose your weapon.");
        }

        let computerSelection = computerPlay()

        console.log(`player: ${playerSelection} computer:${computerSelection}`)

        let result = playRound(playerSelection, computerSelection);
        if (result === "You Win!") {
            playerScore++;
        } else if (result === "Draw!") {
            // Do nothing
        } else {
            computerScore++;
        }
        console.table({ "Player: ":playerScore, "Computer: ":computerScore})
        console.info(`%c${result}`,"font-size:20px; color: green");

        if (playerScore === 5 || computerScore === 5) {
            playGame = false;
        }
    }
}