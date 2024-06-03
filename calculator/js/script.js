// Get HTML Elements
const screenSmall = document.getElementById('small-screen');
const screenMain = document.getElementById('main-screen');
const resetButton = document.getElementById('reset-btn');
const backButton = document.getElementById('back-btn');
const dotButton = document.getElementById('dot-btn');
const equalButton = document.getElementById('equal-btn');
const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');


// Declare Variables
let currentOperand = '';
let previousOperand = '';
let operator = '';


// format the number for display
function formatNumber(num) {
    // Convert to string and check length
    const numStr = num.toString();
    if (numStr.length > 11) {
        // If the number is too long, display it in scientific notation
        const scientificNotation = parseFloat(num).toExponential(5);
        return scientificNotation;
    }
    return numStr;
}


const add = (a,b) => {return a+b}
const subtract = (a,b) => {return a-b}
const multiply = (a,b) => {return a*b}
const divide = (a,b) => {return a/b}

function operate(a,b, operator){
    let result = NaN;
    // Convert srings into numbers
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator){
        case '+':
            result = add(a,b);
            break;
        case '-':
            result = subtract(a,b);
            break;
        case 'x':
            result = multiply(a,b);
            break;
        case '/':
            if (b != 0){
                result = divide(a,b);
            }else{
                result = NaN;
            }
            break;
        default:
            return;
    };

    currentOperand = result.toString();
    previousOperand = '';
};

// Update the screen
function updateDisplay(){
    screenMain.innerHTML = formatNumber(currentOperand);
    screenSmall.textContent = previousOperand + ' ' + operator;
};

// Handle the number click by updating the current operand and the display
function handleNumberClick(val){
    if (!previousOperand && operator){
        previousOperand = currentOperand;
        currentOperand = '';
    };
    if (operator === "="){
        handleResetClick();
    }
    currentOperand += val;
    updateDisplay();
};

// Handle the reset click by resetting the variables and updating the display
function handleResetClick(){
    currentOperand = '';
    previousOperand = '';
    operator = '';
    updateDisplay();
};

// Handle the back click, by removing the last character from the string
function handleBackClick(){
    currentOperand = currentOperand.slice(0,-1);
    updateDisplay();
};

// Handle dot click, by adding ',' if it does not exist already.
function handleDotClick(){
    if (operator === "="){
        handleResetClick();
    }
    if (currentOperand.includes('.')) return;
    if (!previousOperand && operator){
        previousOperand = currentOperand;
        currentOperand = '';
    };

    currentOperand += currentOperand ? '.' : '0.';
    updateDisplay();
};

// Handle Operator Click
function handleOperatorClick(val){
    if (!currentOperand && !previousOperand) return;

    if (!currentOperand && previousOperand) {
        operator = val;
        updateDisplay();
        return;
    };

    if (!previousOperand) {
        previousOperand = currentOperand;
        currentOperand = '';
        operator = val;
        updateDisplay();
    }else{
        operate(previousOperand, currentOperand, operator)
        operator = '';
        updateDisplay();
        operator = val;
    }; 
};


// Handle the equal button click
function handleEqualClick(){
    if (currentOperand && previousOperand && operator){
        operate(previousOperand, currentOperand, operator);
        operator = '';
        updateDisplay();
        operator = '='
    }
};


// Add the Event Listeners
dotButton.addEventListener('click', handleDotClick);

backButton.addEventListener('click', handleBackClick);

resetButton.addEventListener('click', handleResetClick);

equalButton.addEventListener('click', handleEqualClick);

numberButtons.forEach(btn => {
    btn.addEventListener('click', (e) => handleNumberClick(e.target.textContent))
})

operatorButtons.forEach(btn => {
    btn.addEventListener('click', (e) => handleOperatorClick(e.target.textContent));
})


