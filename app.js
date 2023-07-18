let firstNumber = null;
let operator = null;
let shouldResetDisplay = false;
let decimalAdded = false;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = function(operator, a, b) {
    a = Number(a);
    b = Number(b);
  
    switch (operator) {
      case '+':
        return add(a, b);
      case '-':
        return subtract(a, b);
      case '*':
        return multiply(a, b);
      case '/':
        if (b === 0) return null;
        else return divide(a, b);
      default:
        return null;
    }
}


const allNumBtns = [...document.querySelectorAll('.num')];
const numDisplay = document.querySelector('.num-screen');
const allOperatorBtns = [...document.querySelectorAll('.btn-operator')];
const equals = document.querySelector('.equals');
const decimal = document.querySelector('.decimal');
const operatorScreen = document.querySelector('.sign-screen');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');


let displayValue = '';

function updateDisplay(value) {
  numDisplay.textContent = value;
}

function showNum(e) {
  if (shouldResetDisplay) {
    displayValue = '';
    shouldResetDisplay = false;
  }
  if (displayValue.length < 14) {
    displayValue += e.target.textContent;
    updateDisplay(displayValue);
  }
}

function saveAndStore(e) {
  if (firstNumber !== null && operator !== null) {
    const result = operate(operator, firstNumber, displayValue);
    updateDisplay(result);
    firstNumber = result;
  } else {
    firstNumber = displayValue;
  }

  operator = e.target.textContent;
  operatorScreen.textContent = operator;
  shouldResetDisplay = true;
  decimalAdded = false;
}

function equalsOperation() {
  if (firstNumber !== null && operator !== null) {
    const result = operate(operator, firstNumber, displayValue);
    updateDisplay(result);
    firstNumber = result;
    operator = null;
    operatorScreen.textContent = '='
    shouldResetDisplay = true;
    decimalAdded = false;
  }
}

function decimalNum() {
  if (!decimalAdded) {
    displayValue += '.';
    updateDisplay(displayValue);
    decimalAdded = true;
  }
}

function handleKeyboardInput(e) {
    const key = e.key;
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '='];
  
    if (allowedKeys.includes(key)) {
      e.preventDefault();
  
      switch (key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          const numBtn = allNumBtns.find(btn => btn.textContent === key);
          if (numBtn) {
            numBtn.click();
          }
          break;
        case '.':
          decimal.click();
          break;
        case '+':
        case '-':
        case '*':
        case '/':
          const operatorBtn = allOperatorBtns.find(btn => btn.textContent === key);
          if (operatorBtn) {
            operatorBtn.click();
          }
          break;
        case '=':
          equals.click();2
          break;
      }
    }
  }

allNumBtns.forEach((el) => el.addEventListener('click', showNum));
allOperatorBtns.forEach((el) => el.addEventListener('click', saveAndStore));
equals.addEventListener('click', equalsOperation);
decimal.addEventListener('click', decimalNum);
clearBtn.addEventListener('click', () => {
    displayValue = '';
    updateDisplay('0');
    operatorScreen.textContent = '';
    firstNumber = null;
    operator = null;
    shouldResetDisplay = false;
    decimalAdded = false;
});
document.addEventListener('keydown', handleKeyboardInput);
