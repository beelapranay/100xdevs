/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

//we are making the promise resolve after 
//the required time has passed, which is
//n seconds, so we use "n * 1000" for ms 
//to convert into s, passing it into setTimeout
//means that the function would get executed 
//after the stipulated time which is n ms.

function wait(n) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, n * 1000)
    })
}

module.exports = wait;
