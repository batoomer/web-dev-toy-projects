// Mapping of integers to choices
const CHOICE_MAPPING = {
    0 : 'paper',
    1 : "rock",
    2 : "scissors"
};

// Constants representing the choices
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

// Variables tracking the scores
let playerScore = 0;
let computerScore = 0;


// Generates a random integer in the range [min, max)
function getRandomInteger(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

// Generates a random choice for the computer
function getComputerChoice(){
    // Get a random integer between 0 and 2
    const KEY = getRandomInteger(0,3)
    // Return the string corresponding to the random integer
    return CHOICE_MAPPING[KEY]
};

// Gets the choice of the player
function getPlayerChoice(){
    // Get an input from the player and check if it is valid.
    // If the input is invalid, alert the user and get a new input until a valid one is entered.
    let playerChoice = prompt("Choose your weapon:");
    while (!Object.values(CHOICE_MAPPING).includes(playerChoice)){
        alert(`Not a correct weapon: ${playerChoice}. Try again.`)
        playerChoice = prompt("Choose your weapon:");
    }

    return playerChoice
};

// Checks if the player wins and returns True
function doesPlayerWin(playerChoice, computerChoice){
    return (
        (playerChoice === ROCK && computerChoice === SCISSORS) ||
        (playerChoice === PAPER && computerChoice === ROCK) ||
        (playerChoice === SCISSORS && computerChoice === PAPER)
    );
}

// Plays a single round of the game
function playRound(playerChoice, computerChoice){
    if (playerChoice === computerChoice){
        return "It's a tie";
    } else if (doesPlayerWin(playerChoice, computerChoice)){
        playerScore++;
        return "Player wins";
    } else {
        computerScore++;
        return "Computer wins";
    }
};

// Plays the game for 5 rounds
function playGame(){
    let status = ''
    for(i=0; i<5; i++){
        const p1 = getPlayerChoice()
        const p2 = getComputerChoice()
        console.log(`Player: ${p1} vs Computer: ${p2}`)
        status = playRound(p1, p2);
        console.log(`${status}. Player: ${playerScore} | Computer: ${computerScore}`)
    }
}
 
playGame()
