var letters = "abcdefghijklmnopqrstuvwxyz";
var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var guessedLetters = [];

document.addEventListener("DOMContentLoaded", function(event) { 
    document.getElementById("result").style.visibility = "hidden"; 
  });

document.onkeydown = function (event) { // when the user presses down a key anywhere in the document, run this function
    var userGuess = event.key; // records player's keystroke to userGuess variable
    var psychicChoice = letters[Math.floor(Math.random() * 26)]; // chooses a random letter from the letters array and puts it in the psychicChoice variable

    // Clears the guessedLetters array and resets guessesRemaining to 10
    var reset = function () {
        guessesRemaining = 10;
        guessedLetters = [];
        document.getElementById("score-left").innerHTML = `<div>${guessesRemaining}</div>`;
    }

    if (letters.indexOf(userGuess) === -1) {
        alert(`${userGuess} is not a letter, asshat.`);
    }

    else if (guessedLetters.indexOf(userGuess) !== -1) {
        alert(`Whoa there buddy, you already chose ${userGuess}.`);
    }

    // If user's guess matches psychic's choice then increment wins
    else if (userGuess === psychicChoice) {
        wins++;
        document.getElementById("score-wins").innerHTML = `<div>${wins}</div>`;
        document.getElementById("result").innerHTML = `<h1>You Win!</h1>`;
        document.getElementById("result").style.visibility = "visible"; 
        setTimeout(() => {
            document.getElementById("result").style.visibility = "hidden"; 
        }, 2000);
        reset();
    }
    // else (if the letters don't match is implied) then reduce guessesRemaining
    else {
        guessedLetters.push(userGuess);
        guessesRemaining--;
        document.getElementById("score-left").innerHTML = `<div>${guessesRemaining}</div>`;
    }

    // if guessesRemaining gets to zero increment losses and run the reset function
    if (guessesRemaining === 0) {
        losses++;
        document.getElementById("score-losses").innerHTML = `<div>${losses}</div>`;
        document.getElementById("result").innerHTML = `<h1>You Lose!</h1>`;
        document.getElementById("result").style.visibility = "visible";
        setTimeout(() => {
            document.getElementById("result").style.visibility = "hidden"; 
        }, 2000); 
        reset();
    }

    // var html = "<p>Wins: " + wins + "</p>" + "<p>losses: " + losses + "<p>Guesses Left: " + guessesRemaining + "<p>Your Guesses so far: " + guessedLetters.join(', '); // separates guessedLetters with a comma
    // document.getElementById("gameStats").innerHTML = html; // sticks them in the HMTL "gameStats" element

    document.getElementById("key-press").innerHTML = `<h1>It's not: ${guessedLetters.join(', ')}</h1>`;

}
