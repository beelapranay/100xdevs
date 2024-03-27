/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    str = str.toLowerCase().split(' ').join('');
    let count = 0;
    const split = str.split("");
    
    for(let i = 0; i < split.length; i++) {
      switch(split[i]) {
        case "a":
          count++;
          break;
        case "e":
          count++;
          break;
        case "i":
          count++;
          break;
        case "o":
          count++;
          break;
        case "u":
          count++;
          break;
        default:
          break;
      }
    }

    return count;
}

module.exports = countVowels;