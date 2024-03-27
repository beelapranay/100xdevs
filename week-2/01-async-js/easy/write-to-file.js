// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require('fs');

fs.writeFile('a.txt', 'beign written onto a.txt', (err) => {
    console.log('Done!');
})

let ans = 0;
for(let i = 1; i < 10000; i++) {
    console.log(0);
}