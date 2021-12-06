/*
GAME RULES

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice1, lastDice2;

alert(`- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game`)

init();

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('#dice1').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('#name-0').textContent = prompt("Player 1: ");
    document.querySelector('#name-1').textContent = prompt("Player 2: ");

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};

function nextPlayer() {

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

};

// Anonymous function

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2.  Display the result
        var dice1DOM = document.querySelector('#dice1')
        var dice2DOM = document.querySelector('#dice2')
        dice1DOM.style.display = 'block';
        dice2DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + dice1 + '.png';
        dice2DOM.src = 'dice-' + dice2 + '.png';


        // 3.  Update round score IF rolled number is not 1
        if (dice1 !== 1 && dice2 !== 1) {
            // add score
            roundScore = roundScore + (dice1 + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // next player
        nextPlayer();
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gamePlaying) {

        // Add current score to global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector('.final-score').value
        var winnigScore;

        if (input) {
            winnigScore = input;
        } else {
            winnigScore = 100;
        }

        // Check winner
        if (scores[activePlayer] >= winnigScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('#dice1').style.display = 'none';
            document.querySelector('#dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

