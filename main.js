// A simple minimalist calculator made by Ed.
// I was inspired by this link:
// https://www.behance.net/gallery/95098145/Daily-UI-4-Calculator
// The code is all mine.
// If you find any errors or would like 
// it to have some other function let me know.


// This line verifies that all content has been loaded.
document.addEventListener("DOMContentLoaded", function(event) {

// Declaration of constants
const showOperations    = document.querySelector('#show-operations'),
      textResult        = document.querySelector('#text-result'),
      multiplier        = 1000;

// Declaration of variables     
let accumulator = '';
let number1, 
    number2, 
    result, 
    operator, 
    activeOperation = true, 
    activeEqual     = false,
    disableNumbers  = false;

/** This section listens if a click is pressed 
and returns the text that is inside a <span> tag
*/

document.body.addEventListener('click', (event) => {
    if( event.target.tagName == 'SPAN' ){
        span = event.target.textContent;

        /** Choose an option depending on the 
        text obtained when clicking
        */
            switch(span) {
                // 'C' clears all the variables
                case 'C': {
                    accumulator = '';
                    result = undefined;
                    number1 = undefined;
                    number2 = undefined;
                    operator = undefined;
                    disableNumbers = false;
                    showOperations.innerHTML = '';
                    textResult.innerHTML = 0;
                    break;
                }
                // '±' changes the sign of the result or the last number written
                case '±': {
                    if(!activeOperation){
                        accumulator = -1*accumulator;
                        if(number1 == undefined && number2 == undefined){
                            showOperations.innerHTML = `${accumulator}`;
                        } else if(number1 != undefined && number2 == undefined){
                            showOperations.innerHTML = `${number1} ${operator} ${accumulator}`;  
                        } else {
                        showOperations.innerHTML = `${result} ${operator} ${accumulator}`;
                        }
                    }
                    break;
                }
                // '<' deletes the last number being written
                case '<': {
                    if(!disableNumbers){
                    accumulator = accumulator.slice(0, -1);
                    if(operator == undefined){
                        showOperations.innerHTML = `${accumulator}`;
                    }else{
                        printOperation(operator);
                    }
                }
                    break;
                }
                // '%' calculates the percentage
                case '%': {
                    getOperator('%');
                    break;
                }
                // '÷' divides two numbers
                case '÷': {
                    getOperator('/');
                    break;
                }
                // 'x' multiplies two numbers
                case 'x': {
                    getOperator('*');
                    break;
                }
                // '-' subtracts two numbers
                case '-': {
                    getOperator('-');
                    break;
                }
                // '+' adds two numbers
                case '+': {
                   getOperator('+');
                    break;
                }
                // '=' gives the result of the last selected operation
                case '=': {
                   disableNumbers = true;
                   if(!activeEqual){
                    getResult(result);
                    activeOperation = false;
                    activeEqual = true;
                   }                             
                    break;
                }
                // Default option let the user write numbers
                default: {
                    if(!disableNumbers){
                        activeEqual = false;
                        activeOperation = false;
                        accumulator = `${accumulator}${span}`    
                        if(number1 == undefined && number2 == undefined) {
                            showOperations.innerHTML = `${accumulator}`;
                         } else if(number1 != undefined && number2 == undefined){
                            showOperations.innerHTML = `${number1} ${operator} ${accumulator}`;  
                        }
                        else {
                            showOperations.innerHTML = `${result} ${operator} ${accumulator}`;
                        }
                    }
                break;
            }


        }

// Functions
        // It converts the string of <span> tag in a number
        function  getNumber() {  
            let value = parseFloat(accumulator, 10);
            accumulator = '';
            return value;
            
        }

        // It gives the selected operator to the runOperation function
        function getOperator(symbol) {
            activeEqual = true;
                    disableNumbers = false;
                    if(!activeOperation){
                        if(number1 == undefined){
                            operator = symbol;
                        }
                        result = Math.round(runOperation(operator)*multiplier)/multiplier;
                        operator = symbol;
                         printOperation(operator);
                    }

        }

        function getResult(result) {
            
            if(result == undefined && activeOperation == false){
                if(number1 == undefined && number2 == undefined){
                    number1 = getNumber();
                    result = number1
                    showOperations.innerHTML = `${result}`;
                    textResult.innerHTML = result;
                } else if(number1 != undefined && number2 == undefined){
                    result = roundResult();
                }
            } else if (result != undefined && activeOperation == false){
                result = roundResult();
            }
           if(result != undefined && activeEqual == false){
            accumulator = result;
            number1 = undefined;
            number2 = undefined;
            result = undefined;
           }
           return result;
        }

        // This function rounds to three digits and prints the result
        function roundResult() {
            result = Math.round(runOperation(operator)*multiplier)/multiplier;
            showOperations.innerHTML = `${number1} ${operator} ${number2}`;
            textResult.innerHTML = result;
            return result;
        }


         // It runs the selected operation
        function runOperation(operator) {         
            if(number1 == undefined && number2 == undefined){
                number1 = getNumber();           
                
            }else if(number1 != undefined && number2 == undefined) {
                number2 = getNumber();
                result  = selectOperation(operator);
            }
            else {
                number1 = result;
                number2 = getNumber();
                result  = selectOperation(operator);
            }
            activeOperation = true;
            return result;
               
        }

        // It prints the operation in the web page
        function printOperation(operator) {
            if(number1 == undefined && number2 == undefined){
                showOperations.innerHTML = `${accumulator}${operator}`;
            }
            else if(number1 != undefined && number2 == undefined){
                showOperations.innerHTML = `${number1} ${operator} ${accumulator}`;  
               }
            else{
            showOperations.innerHTML = `${result} ${operator} ${accumulator}`;
            textResult.innerHTML = result;
            }

        }

        /**  It assigns the value of the numbers
          and the operator to the calculator function
        */
        function selectOperation( operator ) {
            switch(operator) {
                case '%' : {
                    result = calculator(number1, number2, percentage); 
                    break;
                }
                case '/' : {
                    result = calculator(number1, number2, division); 
                    break;
                }
                case '*' : {
                    result = calculator(number1, number2, multiplication); 
                    break;
                }
                case '-' : {
                    result = calculator(number1, number2, subtraction); 
                    break;
                }
                case '+' : {
                    result = calculator(number1, number2, addition); 
                    break;
                }
            }
            return result;  
        }
    }
    });
});


// It returns the selected operation
function calculator( number1, number2, calculus) {
        return calculus(number1, number2);
}

    // Function to calculate the percentage between two numbers
    function percentage( number1, number2 ) {
        return (number1 / number2 * 100);
    }
    // Function to calculate the division between two numbers
    function division( number1, number2 ) {
        return number1 / number2;
    }
    // Function to calculate the multiplication between two numbers
    function multiplication( number1, number2 ) {
        return number1 * number2;
    }
    // Function to calculate the addition between two numbers
    function addition( number1, number2 ) {
        return number1 + number2;
    }
    // Function to calculate the subtraction between two numbers
    function subtraction( number1, number2 ) {
        return number1 - number2;
    }




