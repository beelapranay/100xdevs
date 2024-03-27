// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

let i = 1;

function consoleNumber() {
    console.log(i);
    i++;
    if(i <= 10) {
        setTimeout(consoleNumber, 1000);
    }
}

consoleNumber();
