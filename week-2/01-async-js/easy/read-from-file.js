// ## Reading the contents of a file

// Write code to read contents of a file and print it to the console. 
// You can use the fs library to as a black box, the goal is to understand async tasks. 
// Try to do an expensive operation below the file read and see how it affects the output. 
// Make the expensive operation more and more expensive and see how it affects the output. 

const fs = require('fs');

fs.readFile('a.txt', 'utf-8', (err, data) => {
    console.log(data);
});

//even though the read has been completed, due to the
//for loop, and the single threaded nature of JS. The 
//file contents do not get logged. Instead they get logged
//after the for loop.

let ans = 0;
for(let i = 1; i < 10000; i++) {
    console.log(0);
}