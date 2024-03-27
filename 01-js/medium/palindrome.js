/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrome as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.toLowerCase().split(" ").join("");
  // "/[ ]/g" insert all the chars b/w "[]" "g" represents global, which means
  // it will replace the chars from the whole string
  str = str.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '');

  j = str.length - 1;

  for(let i = 0; i < str.length/2; i++) {
    if(str[i] != str[j]) {
      return false
    }
    j--;
  }
  return true;
}

module.exports = isPalindrome;
