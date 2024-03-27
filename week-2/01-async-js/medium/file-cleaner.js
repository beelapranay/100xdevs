// <!-- ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ``` -->

const fs = require('fs');

function read(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            resolve(data);
        });
    });
}

function write(file, dataWrite) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, dataWrite, (err) => {
            if(err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function removeSpaces(dataModify) {
    let arr = dataModify.split(" ");
    let dataModified = '';

    for(let i = 0; i < arr.length; i++) {
        if(arr[i] !== "") {
            dataModified += arr[i];
            dataModified += " "
        }
    }

    return dataModified;
}

let fileName = 'a.txt';

read(fileName).then((data) => {
    modifiedData = removeSpaces(data);
    return write(fileName, modifiedData);
}). then(() => {
    console.log("Data has been saved!");
})