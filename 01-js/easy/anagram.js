/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {

  if(str1.length !== str2.length)
    return false;

  str1 = str1.toLowerCase().trim();
  str2 = str2.toLowerCase().trim();

  //initialize a map to count all the chars in str1
  const sChars = {};

  //count all the chars in str1
  for(let char of str1) {
    if(!sChars[char]) {
      sChars[char] = 1;
    } else {
      sChars[char]++
    }
  }

  //check and subtract existing chars from the map
  for(let char of str2) {
    if(!sChars[char]) { //if the char does not exist, you can return early
      return false;
    } else {
      sChars[char]--;
      if(sChars[char] === 0)
        delete sChars[char];
    }
  }

  return Object.keys(sChars).length === 0; //check number of remaining keys 
}

module.exports = isAnagram;
