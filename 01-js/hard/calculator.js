/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor() {
    this.res = 0;
  }

  add(num) {
    this.res += num;
  }

  subtract(num) {
    this.res -= num;
  }

  multiply(num) {
    this.res *= num;
  }

  divide(num) {
    this.res /= num;
  }

  clear() {
    this.res = 0;
  }

  getResult() {
    return this.res;
  }

  calculate(str) {
    str = str.replace(/\s/g, '');

    // Define an array to store tokens
    let tokens = [];

    // Iterate through the string to tokenize it
    let currentToken = '';
    for (let i = 0; i < str.length; i++) {
        let char = str[i];

        if(/^[a-zA-Z]$/.test(char)) {
          throw console.error("error input!");;
        }

        // Check if the character is a digit or a decimal point
        else if (/[\d.]/.test(char)) {
            // Append the character to the current token
            currentToken += char;
        } else {
            // If the current token is not empty, push it to the tokens array
            if (currentToken !== '') {
                tokens.push(currentToken);
                currentToken = '';
            }
            // Push the operator or parentheses to the tokens array
            tokens.push(char);
        }
    }

    // If there's any remaining token, push it to the tokens array
    if (currentToken !== '') {
        tokens.push(currentToken);
    }

    

  }
}

new Calculator().calculate("5 + abc");
//module.exports = Calculator;
