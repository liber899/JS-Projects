'use strict';
/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message'). textContent = 'Correct Number!';
document.querySelector('.guess').value = 23;
*/
let secretNumber = Math.trunc(Math.random()*20)+1;
let score = 20;
let highScore = 0 

document.querySelector('.check').addEventListener('click', function(){
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess);
    
    if(!guess) {
        document.querySelector('.message'). textContent = 'No Number!'

    } else if (guess === secretNumber) {
        document.querySelector('.message'). textContent = 'Correct Number!';   
        document.querySelector('.number').textContent = secretNumber;
        document.querySelector('body').style.backgroundColor = '#60b347'
        document.querySelector('.number').style.width = '30rem';
    if (score > highScore){
        highScore = score;
        document.querySelector('.highscore').textContent = highScore;
}
    } else if (guess !== secretNumber){
 if (score > 1){
 document.querySelector('.message'). textContent = guess > secretNumber? 'Too high!': 'Too low';
 score--; 
 document.querySelector('.score').textContent = score;
 } else {
     document.querySelector('.message'). textContent = 'You lost the game!';
     document.querySelector('.score').textContent = 0;
 }
    }
})
document.querySelector('.again').addEventListener('click',function(){
    score = 20;
    secretNumber = Math.trunc(Math.random()*20)+1;
    document.querySelector('.score'). textContent = 20;
    document.querySelector('.message'). textContent = 'Start guessing...';
    document.querySelector('body').style.backgroundColor = '#222'
    document.querySelector('.guess'). value = '';
    document.querySelector('.number'). textContent = '?';
}
)
