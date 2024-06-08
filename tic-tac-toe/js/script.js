/**
 * Factory Pattern that returns a Player Object.
 * @param {string} name 
 * @returns Player Object
 */
const playerFactory = (name) =>{
    let score = 0;
    /**
     * Returns the player score
     * @returns int player score
     */
    const getScore = () => {return score};
    
    /**
     * Updates the score by adding the value provided
     * @param {int} value score update value
     */
    const updateScore = (value) => {
        score += value;
    } 

    /**
     * Resets the player score
     */
    const resetScore = () => {score=0;}

    return {name, getScore, updateScore, resetScore};
};


/**
 * Factory Pattern that returns an Option Object
 * @param {Player} playerX Player Object for player X
 * @param {Player} playerO Player Object for player O
 * @param {String} gameType game type, pvp or pve
 * @param {String} difficulty defaults to 'easy'.
 * @returns Option Object
 */
const optionFactory = (playerX, playerO, gameType, difficulty="easy") => {
    return {playerX, playerO, gameType, difficulty};
};

/**
 * Module Pattern that represents the gameboard
 */
const Gameboard = (()=> {
    let gameboard = new Array(9).fill('');
   
    /**
     * Checks if the index is in range. 0 - 8.
     * @param {int} index position of the field
     * @returns boolean 
     */
    const isIndexValid = (index) => {return (0 <= index && index < 9) ? true : false};

    const isFieldFree = (index) => {return (gameboard[index] === '') ? true : false};
    
    /**
     * Returns the value of the given field.
     * @param {int} index position of the field
     * @returns the field value
     */
    const getMove = (index) => {
        if (!isIndexValid(index)) throw new RangeError('Index out of range [0,9)');
        return gameboard[index];
    }

    /**
     * Adds a move to the given gameboard field;
     * @param {int} index position of the field
     * @param {String} move move to add to the field
     */
    const addMove = (index, move) => {
        if (!isIndexValid(index)) throw new RangeError('Index out of range [0,9)');
        gameboard[index] = move;
    };

    /**
     * Removes the move from the given field
     * @param {int} index position of the field
     */
    const deleteMove = (index) => {
        if (!isIndexValid(index)) throw new RangeError('Index out of range [0,9)');
        gameboard[index] = '';
    };

    /**
     * Returns the lenght of the gameboard.
     * @returns int, lenght of the gameboard
     */
    const length = () => {return gameboard.length};

    /**
     * Checks if the gameboard is full
     * @returns boolean
     */
    const isFull = () => {return gameboard.includes('') ? false: true};

    /**
     * Resets the gameboard by creating a new gameboard
     */
    const reset = () => {gameboard = new Array(9).fill('')};

    // For DEBUGGING
    const printGameboard = () => {console.log(gameboard, length())};
    
    return {
        printGameboard,
        isFieldFree,
        getMove,
        addMove,
        isFull,
        length,
        reset,
        deleteMove
    };

})();

/**
 * Module Pattern that Contains the game logic
 */
const GameController = (()=>{

    let currentPlayer = 'x';
    let currentRoundStarter = 'x';
    let round = 0;




    /**
     * Checks if the move has an winning/tying/none impact.
     * @returns String 'win' for winning move, 'tie' for a tying move, '' for a move without a result
     */
    const isWinningMove = () => {
        let winState = '';
        
        // Check Horizontal Lines
        //  0 - 1 - 2
        if ((Gameboard.getMove(0) !== '') && (Gameboard.getMove(0) === Gameboard.getMove(1)) && (Gameboard.getMove(0) === Gameboard.getMove(2))) {
            winState = 'win';
            return winState;
        };
        //  3 - 4 - 5
        if ((Gameboard.getMove(3) !== '') && (Gameboard.getMove(3) === Gameboard.getMove(4)) && (Gameboard.getMove(3) === Gameboard.getMove(5))) {
            winState = 'win';
            return winState;
        };
        
        //  6 - 7 - 8
        if ((Gameboard.getMove(6) !== '') && (Gameboard.getMove(6) === Gameboard.getMove(7)) && (Gameboard.getMove(6) === Gameboard.getMove(8))) {
            winState = 'win';
            return winState;
        };


        // Check Vertical Lines
        //  0 - 3 - 6
        if ((Gameboard.getMove(0) !== '') && (Gameboard.getMove(0) === Gameboard.getMove(3)) && (Gameboard.getMove(0) === Gameboard.getMove(6))) {
            winState = 'win';
            return winState;
        };
        

        //  1 - 4 - 7
        if ((Gameboard.getMove(1) !== '') && (Gameboard.getMove(1) === Gameboard.getMove(4)) && (Gameboard.getMove(1) === Gameboard.getMove(7))) {
            winState = 'win';
            return winState;
        };

        //  2 - 5 - 8
        if ((Gameboard.getMove(2) !== '') && (Gameboard.getMove(2) === Gameboard.getMove(5)) && (Gameboard.getMove(2) === Gameboard.getMove(8))) {
            winState = 'win';
            return winState;
        };
        

        // Check Cross 
        //0 - 4 - 8
        if ((Gameboard.getMove(4) !== '') && (Gameboard.getMove(0) === Gameboard.getMove(4)) && (Gameboard.getMove(0) === Gameboard.getMove(8))) {
            winState = 'win';
            return winState;
        };
        // 2 - 4 - 6
        if ((Gameboard.getMove(4) !== '') && (Gameboard.getMove(2) === Gameboard.getMove(4)) && (Gameboard.getMove(2) === Gameboard.getMove(6))) {
            winState = 'win';
            return winState;
        };

        // Check if Gameboard is FULL and There is no winner
        if (Gameboard.isFull()){
            winState = 'tie';
            return winState;
        };

        return winState;
    };

    /**
     * Return the current player
     * @returns string current player
     */
    const getCurrentPlayer = () => {return currentPlayer};

    /**
     * Returns the round;
     * @returns int round
     */
    const getRound = () => {return round};
    
    /**
     * Swaps the current player with the new player
     */
    const swapPlayer = () => {
        if (currentPlayer === 'x') {
            currentPlayer = 'o';
        } else {
            currentPlayer = 'x';
        };
    };

    /**
     * Sets the player starting the new round.
     * Players Alternate between each round.
     */
    const setRoundStarter = () => {
        if (currentRoundStarter === 'x') {
            
            currentRoundStarter = 'o';
        }else {
            currentRoundStarter = 'x'
        }
        currentPlayer = currentRoundStarter;
    }

    /**
     * Makes a move and checks if it has any impact on the game. If 
     * the move is a finishing/ending move increments the round. Also swaps
     * the player after the move was made.
     * @param {int} position field position to make the move 
     * @returns the impact on the game if any
     */
    const makeMove = (position) => {
        
        Gameboard.addMove(position, currentPlayer);
        let winState = isWinningMove();
        if (winState === 'win') {
            round++;
            setRoundStarter();
            currentPlayer = currentRoundStarter;
        } else if (winState === 'tie'){
            round++;
            setRoundStarter();
        } else {
            swapPlayer();
        }

        return winState;
    };

    /**
     * Resets the game controller. Round and CurrentPlayer
     */
    const reset = () => {
        currentPlayer = 'x';
        currentRoundStarter = 'x';
        round = 0;
    };

    return {
        makeMove,
        isWinningMove,
        getCurrentPlayer,
        getRound,
        reset
    };

})();



/**
 * Module Pattern that contains the diffrent type of AI for TicTacToe
 */
const ComputerLogic = (() => {

    /**
     * @returns all free fields available
     */
    const getFreeFields = () => {
        let freeFields = []
        for (let i=0; i<Gameboard.length(); i++){
            if (Gameboard.isFieldFree(i)){
                freeFields.push(i);
            }
        };
        return freeFields;
    };


    /**
     * The minmax algorithm in Game Theory
     */
    const minxmax = (depth, isMaximizing) => {
        let moveResult = GameController.isWinningMove();
        if (moveResult === 'win'){
            if (isMaximizing){
                return -1;
            };
            if (!isMaximizing){
                return +1;
            }
        };
        if (moveResult === 'tie'){
            return 0;
        }


        if (isMaximizing) {
            let bestScore = -Infinity;
            let availableMoves = getFreeFields();
            
            while(availableMoves.length) {
                let move = availableMoves.pop();
                Gameboard.addMove(move, 'o');
                let score = minxmax(depth+1, false);
                bestScore = Math.max(score, bestScore);
                Gameboard.deleteMove(move);
            };

            return bestScore;

        } else {
            let bestScore = +Infinity;
            let availableMoves = getFreeFields();
            
            while(availableMoves.length) {
                let move = availableMoves.pop();
                Gameboard.addMove(move, 'x');
                let score = minxmax(depth+1, true);
                bestScore = Math.min(score, bestScore);
                Gameboard.deleteMove(move);
            };

            return bestScore;

        }
    }; 



    /**
     * Return a random move for the computer. -EASY DIFFICULTY
     * @returns computer move
     */
    const getEasyMove = () => {
        let index = Math.floor(Math.random() * 9);
        while (!Gameboard.isFieldFree(index)){
            index = Math.floor(Math.random() * 9);
        };
        return index;
    };

    /**
     * A brute force approach. 
     * (1) Start by making a move in the center, if available else, make a random move. 
     * (2) Make a second random move.
     * (3) After making two moves:
     *     (a) Try to make a winning move else make a random move
     *     (b) Repeat (a) until game finishes
     * @returns computer move
     */
    const getNormalMove = () => {
        let index = NaN;
        let freeFields = getFreeFields();

        // If it is the first move make a move to the center else make a random move
        if (freeFields.length >= 8){
            index = Gameboard.isFieldFree(4) ? 4 : getEasyMove();
            return index;
        }
        
        // If it is the second move, make a random move
        if (freeFields.length >=6) {
            index = getEasyMove();
            return index;
        }

        // Try to make a winning move else make a random move
        console.log(freeFields)
        while (freeFields.length){
            let tempMove = freeFields.pop();

            Gameboard.addMove(tempMove, 'o');

            if (GameController.isWinningMove() === 'win'){
                index = tempMove;
                Gameboard.deleteMove(tempMove)
                break;
            };

            Gameboard.deleteMove(tempMove)    
        }

        if (isNaN(index)) {
            index=getEasyMove()
        };
        console.log('After NAN IF', index)
        return index;
    };

    /**
     * Returns the best move the computer can make. Minmax algorithm
     * @returns optimal computer move
     */
    const getImpossibleMove = () => {
        let bestScore = -Infinity;
        let bestMove = 0;
        let availableMoves = getFreeFields();

        while(availableMoves.length) {
            let move = availableMoves.pop();
            Gameboard.addMove(move, 'o');
            let score = minxmax(0, false);
            if (score > bestScore){
                bestScore = score;
                bestMove = move;
            };
            Gameboard.deleteMove(move);
        };


        return bestMove;
    };


    /**
     * Returns the computer move based on the selected difficulty
     * @param {String} difficulty
     * @returns the computer move 
     */
    const getComputerMove = (difficulty) => {
        switch (difficulty){
            case 'easy':
                return getEasyMove();
            case 'normal':
                return getNormalMove();
            case 'impossible':
                return getImpossibleMove();
        };
    };

    /**
     * Makes A Computer move by clicking on the coressponding field.
     * @param {String} difficulty 
     */
    const makeComputerMove = (difficulty) => {
        let move = getComputerMove(difficulty);
        document.querySelector(`[data-index='${move}']`).click();
    }

    return {
        makeComputerMove,
    }

})();




/**
 * Module Pattern That Handles All The Display Logic And DOM Manipulation
 */
const DisplayController = (()=> {
    const startMenu = document.querySelector('.start-menu');
    const startMenuPvpButton = document.querySelector('.start-menu > :nth-child(2)')
    const startMenuPveButton = document.querySelector('.start-menu > :nth-child(3)')
    
    const pvpMenu = document.querySelector('.pvp-menu');
    const pvpMenuBackButton = document.querySelector('.pvp-menu > .nav-buttons :nth-child(1)');
    const pvpMenuStartButton = document.querySelector('.pvp-menu > .nav-buttons :nth-child(2)');
    const pvpMenuPlayerXInput = document.querySelector('#player-x');
    const pvpMenuPlayerXName = document.querySelector('.pvp-menu > .options > :nth-child(1) > :first-child > span');
    const pvpMenuPlayerOInput = document.querySelector('#player-o');
    const pvpMenuPlayerOName = document.querySelector('.pvp-menu > .options > :nth-child(1) > :last-child > span');

    const pveMenu = document.querySelector('.pve-menu');
    const pveMenuBackButton = document.querySelector('.pve-menu > .nav-buttons :nth-child(1)');
    const pveMenuStartButton = document.querySelector('.pve-menu > .nav-buttons :nth-child(2)');
    
    const pveMenuEasyButton = document.querySelector('.pve-menu > .options > :nth-child(2) > :nth-child(2) > :nth-child(1)');
    const pveMenuNormalButton = document.querySelector('.pve-menu > .options > :nth-child(2) > :nth-child(2) > :nth-child(2)');
    const pveMenuImpossibleButton = document.querySelector('.pve-menu > .options > :nth-child(2) > :nth-child(2) > :nth-child(3)');



    const gameMenu = document.querySelector('.game-menu');
    const gameMenuBackButton = document.querySelector('.game-menu > .nav-buttons :nth-child(1)');
    const gameMenuRestartButton = document.querySelector('.game-menu > .nav-buttons :nth-child(2)');
    const gameMenuPlayerXContainer = document.querySelector('.game-menu > .scoreboard > div > :first-child');
    const gameMenuPlayerXName = document.querySelector('.game-menu > .scoreboard > div > :first-child > :nth-child(2)');
    const gameMenuPlayerXScore = document.querySelector('.game-menu > .scoreboard > div > :first-child > :nth-child(3)');
    const gameMenuPlayerOContainer = document.querySelector('.game-menu > .scoreboard > div > :last-child');
    const gameMenuPlayerOName = document.querySelector('.game-menu > .scoreboard > div > :last-child > :nth-child(2)');
    const gameMenuPlayerOScore = document.querySelector('.game-menu > .scoreboard > div > :last-child > :nth-child(3)');
    const gameMenuGameboardFields = document.querySelectorAll('[data-index]');
    const gameMenuRound = document.querySelector('.game-menu .scoreboard > p > :first-child');

    const gamePopUp = document.querySelector('.game-pop-up');

    let activeDifficultyButton = pveMenuEasyButton;
    let gameOption = {};



    // =============== START Gameboard Field Listeners =================== 

    /**
     * Enables the pop up menu and displays the correct message
     * @param {String} moveResult the result of the move made
     * @param {String} currentPlayer the current player symbol
     */
    const enablePopUpMenu = (moveResult, currentPlayer) => {
        gamePopUp.style.display = 'flex';
        if (moveResult === 'win'){
            if (currentPlayer === 'x'){
                gamePopUp.firstElementChild.innerHTML = `<p><img src="./assets/symbols/symbol-x.svg"> ${gameOption.playerX.name} Wins!</p>`;
            } else {
                gamePopUp.firstElementChild.innerHTML = `<p><img src="./assets/symbols/symbol-o.svg"> ${gameOption.playerO.name} Wins!</p>`;
            }
        } else if (moveResult === 'tie'){
            gamePopUp.firstElementChild.innerHTML = `It's a Tie!</p>`;
        };
    }

    /**
     * Disables the pop up menu and clears it
     */
    const disablePopUpMenu = () => {
        gamePopUp.style.display = 'none';
        gamePopUp.firstElementChild.innerHTML = '';
    }
    
    /**
     * Adds the correct player symbol to the display
     * @param {Element} field gameboard field to make the move
     * @param {String} currentPlayer the current player sybmol
     */
    const setPlayerMoveClass = (field, currentPlayer) => {
        if (currentPlayer === 'o')
            field.classList.add('player-o-move');
        else{
            field.classList.add('player-x-move');
        };
    };

    /**
     * Swaps the Current Player on the display
     * @param {String} currentPlayer the current player sybmol
     */
    const swapActivePlayer = (currentPlayer) => {
        if (currentPlayer === 'x') {
            gameMenuPlayerOContainer.classList.add('active-player');
            gameMenuPlayerXContainer.classList.remove('active-player');
        } else if (currentPlayer ==='o'){
            gameMenuPlayerOContainer.classList.remove('active-player');
            gameMenuPlayerXContainer.classList.add('active-player');
        };
    };
    
    /**
     * Updates the Scoreboard on the display
     * @param {String} moveResult the result of the move made
     * @param {String} currentPlayer the current player sybmol
     */
    const updateScoreboard = (moveResult, currentPlayer) => {
        let round = GameController.getRound();
        if (moveResult === 'win'){
            if (currentPlayer === 'x'){
                gameOption.playerX.updateScore(1);
            }else{
                gameOption.playerO.updateScore(1);
            }
        };
        updateGameMenuScores();
        gameMenuRound.textContent = round;
    };

    /**
     * Resets the Game Display for the next round
     */
    const resetGameDisplay = () => {
        // Reset the Gameboard
        Gameboard.reset();
        // Clear the gameboard field display
        gameMenuGameboardFields.forEach(
            gameMenuGameboardField => {
                gameMenuGameboardField.classList.remove('player-x-move');
                gameMenuGameboardField.classList.remove('player-o-move');
            }
        );

        // Add event listeners;
        addGameboardFieldListeners();
        
        if (GameController.getCurrentPlayer() === 'x')
            swapActivePlayer('o');
        else {
            swapActivePlayer('x');
        }
    };

    /**
     * Restarts the Game Display === Restarts the Game
     */
    const restartGameDisplay = () => {
        // Remove Possible Listeners
        removeGameboardFieldListeners();
        // Reset Game Display
        resetGameDisplay()
        // Reset Game Controller
        GameController.reset();
        // Reset Active Player
        swapActivePlayer('o');
        // Reset Player Scores
        gameOption.playerX.resetScore();
        gameOption.playerO.resetScore();
        //Update Screen Display
        updateGameMenuScores();
        gameMenuRound.textContent = GameController.getRound();
    }

    /**
     * The Main Function that the game is played
     * @param {Event} event 
     */
    function playRound(event){
        // Get the field that was clicked and remove its click event
        event.target.removeEventListener('click', playRound);
        movePosition = parseInt(event.target.dataset['index']);
        
        // Set the Player Symbol on the display
        let currentPlayer = GameController.getCurrentPlayer();

        
        // Make the move
        let moveResult = GameController.makeMove(movePosition);
        setPlayerMoveClass(event.target, currentPlayer);
        swapActivePlayer(currentPlayer);

        if (!moveResult) {


            if (gameOption.gameType === 'pve' && GameController.getCurrentPlayer()==='o') {
                ComputerLogic.makeComputerMove(gameOption.difficulty);
            };
            return;
        }
        
        updateScoreboard(moveResult, currentPlayer);
        removeGameboardFieldListeners();
        enablePopUpMenu(moveResult, currentPlayer);

        setTimeout(function () {
            resetGameDisplay();
            disablePopUpMenu();
            if (gameOption.gameType === 'pve' && GameController.getCurrentPlayer()==='o') {
                ComputerLogic.makeComputerMove(gameOption.difficulty);
            };
        }, 3000);
        
    };

    /**
     * Adds the event listeners for the gameboard fields
     * @param {function} callback Function containing the game logic
     */
    const addGameboardFieldListeners = () => {
        gameMenuGameboardFields.forEach(
            gameMenuGameboardField => gameMenuGameboardField.addEventListener('click', playRound)
        );
    };

    /**
     * Removes the event listeners for the gameboard fields
     */
    const removeGameboardFieldListeners = () => {
        gameMenuGameboardFields.forEach(
            gameMenuGameboardField => gameMenuGameboardField.removeEventListener('click', playRound)
        );
    }
    // =============== END Gameboard Field Listeners =================== 


    // =============== START Option Listeners PVP/PVE Menus =========
    /**
     * Displays the input of the Input Element to a given Output Element.
     * @param {Element} displayElement Element to display the value to
     * @param {Element} inputElement input element to get the value from
     */
    const handleNameInput = (displayElement, inputElement) => {
        displayElement.textContent = inputElement.value.trim();
    };

    /**
     * Adds the Option Listeners for the PVP Menu. (Name Inputs)
     */
    const addPvpMenuOptionListeners = () => {
        // PlayerX Name
        pvpMenuPlayerXInput.addEventListener('input', () => {
            handleNameInput(pvpMenuPlayerXName, pvpMenuPlayerXInput);
        });

        // PlayerO Name
        pvpMenuPlayerOInput.addEventListener('input', () => {
            handleNameInput(pvpMenuPlayerOName, pvpMenuPlayerOInput);
        });
    };

    /**
     * Toogles the active class on the selected difficulty button
     * and sets the activeDifficultyButton to the clicked difficulty button
     * @param {Event} e 
     */
    const handleDifficulty = (e) => {
        activeDifficultyButton.classList.remove('active-difficulty');

        e.target.classList.add('active-difficulty');
        activeDifficultyButton = e.target;
    };

    /**
     * Adds the Option Listeners for the PVE Menu. (Difficulty Buttons)
     */
    const addPveMenuOptionListeners = () => {
       
        // Easy Button
        pveMenuEasyButton.addEventListener('click', (e) => {
            handleDifficulty(e);
        });
        
        // Normal Button
        pveMenuNormalButton.addEventListener('click', (e) => {
            handleDifficulty(e);
        });

        // Impossible Button
        pveMenuImpossibleButton.addEventListener('click', (e) => {
            handleDifficulty(e);
        });
    };


    const addOptionListeners = () => {
        addPvpMenuOptionListeners();
        addPveMenuOptionListeners();
    }
    // =============== END Option Listeners PVP/PVE Menus =========

    


    // =============== START Navigation Between Menus ==============
    /**
     * Changes the menu to display on the screen by changing the display attribute.
     * @param {Element} from menu Element to navigate from
     * @param {Element} to menu Element to navigate to
     */
    const handleNavigation = (from, to) => {
        from.style.display = 'none';
        to.style.display = 'flex';
    };

    /**
     * Generates the options for the game.
     * @param {String} menuType the type of the menu, should be pvp or pve
     * @returns object containing options for the game
     */
    const generateOptions = (menuType) => {
        if (menuType === 'pvp'){
            const playerX = playerFactory(pvpMenuPlayerXName.firstChild.nodeValue.trim());
            const playerO = playerFactory(pvpMenuPlayerOName.firstChild.nodeValue.trim());
            const gameType = 'pvp';
            return optionFactory(playerX, playerO, gameType);
        } else if (menuType === 'pve'){
            const playerX = playerFactory('Player');
            const playerO = playerFactory('Robot');
            const gameType = 'pve';
            const difficulty = activeDifficultyButton.dataset['difficulty'];
            return optionFactory(playerX, playerO, gameType, difficulty);
        } else {
            throw new Error('Unknown game menu');
        }

    };

    /** Updates Game Menu Player Names */
    const updateGameMenuNames = () => {
        gameMenuPlayerXName.textContent = gameOption.playerX.name;
        gameMenuPlayerOName.textContent = gameOption.playerO.name;
    };

    /** Updates Game Menu Player Scores */
    const updateGameMenuScores = () => {
        gameMenuPlayerXScore.textContent = gameOption.playerX.getScore();
        gameMenuPlayerOScore.textContent = gameOption.playerO.getScore();
    }

    /**
     * Adds the event listeners for the Start Menu Navigation Buttons.
     * NOTE: The Start Menu Navigation buttons are implemented with divs not buttons
     */
    const addStartMenuNavigationListeners = () => {
        // PVP Button
        startMenuPvpButton.addEventListener('click', () => {
            handleNavigation(startMenu, pvpMenu)
        });
        // PVE Button
        startMenuPveButton.addEventListener('click', () => {
            handleNavigation(startMenu, pveMenu)});
    };

    const startGameMenuDisplay = () => {
        updateGameMenuNames();
        restartGameDisplay();
    }

    /**
     * Adds the event listeners for the PVP Menu Navigation Buttons.
     */
    const addPvpMenuNavigationListeners = () => {
        //pvp back button
        pvpMenuBackButton.addEventListener('click', () => {
            handleNavigation(pvpMenu, startMenu);
        });
        //pvp start button
        pvpMenuStartButton.addEventListener('click', () => {
            handleNavigation(pvpMenu, gameMenu);
            gameOption = generateOptions('pvp');
            startGameMenuDisplay();
        });
    };

    /**
     * Adds the event listeners for the PVE Menu Navigation Buttons.
     */
    const addPveMenuNavigationListeners = () => {
        //pve back button
        pveMenuBackButton.addEventListener('click', () => {
            handleNavigation(pveMenu, startMenu);
        });
        //pve start button
        pveMenuStartButton.addEventListener('click', () => {
            handleNavigation(pveMenu, gameMenu);
            gameOption = generateOptions('pve');
            startGameMenuDisplay();
        });
        
    };

    /**
     * Adds the event listeners for the Game Menu Navigation Buttons.
     */
    const addGameMenuNavigationListeners = () => {
        //game back button
        gameMenuBackButton.addEventListener('click', () => {
            handleNavigation(gameMenu, startMenu);
            resetGameDisplay();
        });

        //TODO IMPLEMENT LOGIC
        gameMenuRestartButton.addEventListener('click', () => {
            restartGameDisplay();
        });

    };


    /**
     * Adds the event listeners for Navigating between the menus.
     */
    const addNavigationListeners = () => {
        addStartMenuNavigationListeners();
        addPveMenuNavigationListeners();
        addPvpMenuNavigationListeners();
        addGameMenuNavigationListeners();
    }
    // =============== END Navigation Between Menus ==============


    return {
        addNavigationListeners,
        addOptionListeners
    }
})();


DisplayController.addNavigationListeners();
DisplayController.addOptionListeners();