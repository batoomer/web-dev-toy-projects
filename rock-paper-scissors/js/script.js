// Mapping of integers to choices
const CHOICE_MAPPING = {
    0 : "paper",
    1 : "rock",
    2 : "scissors"
};

// Mapping of choices to icon paths
const PATH_MAPPING = {
    "paper" : "assets/icons/paper.png",
    "rock" : "assets/icons/rock.png",
    "scissors" : "assets/icons/scissors.png",
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

// Checks if the player wins and returns True
function doesPlayerWin(playerChoice, computerChoice){
    return (
        (playerChoice === ROCK && computerChoice === SCISSORS) ||
        (playerChoice === PAPER && computerChoice === ROCK) ||
        (playerChoice === SCISSORS && computerChoice === PAPER)
    );
}

// Updates the player choice and the computer choice images
function setChoiceImages(playerChoice, computerChoice){
    document.querySelector("#player-icon").src = PATH_MAPPING[playerChoice];
    document.querySelector("#computer-icon").src = PATH_MAPPING[computerChoice];
};

// Increments the player score and updates the UI
function incrementPlayerScore(){
    playerScore++;
    document.querySelector("#player-score").textContent = `${playerScore}`;
}

// Increments the computer score and updates the UI
function incrementComputerScore(){
    computerScore++;
    document.querySelector("#computer-score").textContent = `${computerScore}`;
}


// Plays a single round of the game and updates the ui
function playRound(playerChoice, computerChoice){
    if (playerChoice === computerChoice){
        document.querySelector("#game-status").textContent = 'It is a tie!';
    } else if (doesPlayerWin(playerChoice, computerChoice)){
        incrementPlayerScore();
        document.querySelector("#game-status").textContent = "Player wins!";
    } else {
        incrementComputerScore();
        document.querySelector("#game-status").textContent = "Computer wins!";
    }
};


// Add event listeners to all buttons for playing the game
document.querySelectorAll('button').forEach(
    btn => {
        btn.addEventListener(
            'click', () => {
                // Get the player's choice from the button's ID
                let playerChoice = btn.id;
                // Generate the computer's choice
                let computerChoice = getComputerChoice();
                // Update the choice image
                setChoiceImages(playerChoice, computerChoice);
                // Play a round and update the game
                playRound(playerChoice, computerChoice);
            }
        );
    }
);
