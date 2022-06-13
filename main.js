//DOM
const resultElement = document.getElementById('result');
const lengthElement = document.getElementById('length');
const upperCaseElement = document.getElementById('uppercase');
const lowerCaseElement = document.getElementById('lowercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const generatePassword = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');


//eventListeners
generatePassword.addEventListener('click', createPassword);
clipboard.addEventListener('click', copyPassword);

//Parameters necessary for password generation
function createPassword() {
    const length = +lengthElement.value
    const isLower = lowerCaseElement.checked;
    const isUpper = upperCaseElement.checked;
    const isNumber = numbersElement.checked;
    const isSymbol = symbolsElement.checked;

    result.innerText = displayPassword(isUpper, isLower, isNumber, isSymbol, length)

};

//display password
function displayPassword(lower, upper, symbol, number, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArray = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunction[funcName]();
        })
    }

    return (generatedPassword.slice(0, length))
}

//copyPassword
function copyPassword() {
    const textarea = document.createElement('textarea');
    const password = result.innerText;

    if (!password) {
        return;
    } else {
        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy')
        textarea.remove();
        alert('password copied to the clipboard');
    }
}

//name random letters, numbers and symbols function
const randomFunction = {
    lower: getRandomLowerCase,
    upper: getRandomUpperCase,
    number: getRandomNumber,
    symbol: getRandomSymbol
}


//Generator functions
function getRandomLowerCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}


function getRandomUpperCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}


function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}


function getRandomSymbol() {
    symbols = '!@#$%^&*(){}[]=<>/?~'
    return symbols[Math.floor(Math.random() * symbols.length)]
}
