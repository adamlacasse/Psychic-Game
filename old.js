// Define Variables
var letters = "abcdefghijklmnopqrstuvwxyz";
var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var guessedLetters = [];

document.onkeydown = function (event) { // when the user presses down a key anywhere in the document, run this function
    var userGuess = event.key; // records player's keystroke to userGuess variable
    guessedLetters.push(userGuess); // adds the player's keystroke to the guessedLetters array
    var psychicChoice = letters[Math.floor(Math.random() * 26)]; // chooses a random letter from the letters array and puts it in the psychicChoice variable

    // Clears the guessedLetters array and resets guessesRemaining to 10
    var reset = function () {
        guessesRemaining = 10;
        guessedLetters = [];
    }

    // If user's guess matches psychic's choice then increment wins
    if (userGuess === psychicChoice) {
        wins++;
    }
    // else (if the letters don't match is implied) then reduce guessesRemaining
    else {
        guessesRemaining--;
    }

    // if guessesRemaining gets to zero increment losses and run the reset function
    if (guessesRemaining === 0) {
        losses++;
        reset();
    }

    var html = "<p>Wins: " + wins + "</p>" + "<p>losses: " + losses + "<p>Guesses Left: " + guessesRemaining + "<p>Your Guesses so far: " + guessedLetters.join(', '); // separates guessedLetters with a comma
    document.getElementById("gameStats").innerHTML = html; // sticks them in the HMTL "gameStats" element
}
