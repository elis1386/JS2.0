'use strict';

const riddle = parseInt(Math.random() * 100);

function guess(num) {
    let answer = parseInt(prompt('Guess a number from 0 to 99'));
    if (answer > num) {
        alert('Number to big');
    } if (answer < num) {
        alert('Number to small');
    } if (answer == num) {
        alert('Got it!');
        return;
    }

}

guess(riddle);