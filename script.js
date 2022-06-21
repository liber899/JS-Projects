'use strict';
//selecting elements 
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden')

let score = [0,0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const init = function(){
    score = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true; 

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden')
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}
init()

//Roll dice
btnRoll.addEventListener('click', function(){
    if(playing){
    
    //generating a random dice roll
    const dice = Math.trunc(Math.random()*6) + 1;
    
    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    
    //check if dice is 1, true => switch player
    if(dice !== 1){
        //add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore
    
    } else {
        //switch
        switchPlayer();
}}})

btnHold.addEventListener('click', function () {
    if(playing){
    // add current score to active player's score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

    //check winner

    if (score[activePlayer] >= 20){
        playing = false;
        document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
        document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
        diceEl.classList.add('hidden');
    } else {
        switchPlayer()
    }
}})

btnNew.addEventListener('click', init)

