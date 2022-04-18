const letters = "abcdefghijklmnopqrstuvwxyz";
let wins = 0;
let losses = 0;
let guessesRemaining = 10;
let guessedLetters = [];

const psychicChoice = letters[Math.floor(Math.random() * 26)];

const gamesPlayedElement = document.getElementById("games-played");
gamesPlayedElement.textContent = wins + losses;

const startGame = () => {
    document.getElementById("no-guesses").style.display = "none";
    document.getElementById("past-guesses").style.display = "flex";
};

// Modal schtuff
const modal = document.getElementById("modal");

const modalCloseButton = document.getElementById("modal-close-button");
modalCloseButton.addEventListener("click", () => {
    modal.style.display = "none";
});

const giveUserFeedbackInTheModal = (title, message) => {
    const modalTitle = document.getElementById("modal-title");
    modalTitle.textContent = title;

    const modalContent = document.getElementById("modal-content");
    modalContent.textContent = message;
    modal.style.display = "block";
};

const handleModalCountdown = () => {
    let countdown = 5;

    const modalCountdown = document.getElementById("modal-countdown");
    modalCountdown.textContent = `This modal will close in ${countdown} seconds`;

    const modalCountdownInterval = setInterval(() => {
        countdown--;
        modalCountdown.textContent = `This modal will close in ${countdown} seconds`;
        if (countdown === 0) {
            clearInterval(modalCountdownInterval);
            modal.style.display = "none";
        }
    }, 1000);
};

document.addEventListener("keyup", function(event) {
    const userGuess = event.key.toLowerCase();

    if (modal.style.display === "block" && userGuess === "escape") {
        modal.style.display = "none";
        // TODO: clear modal interval
        return;
    }

    if (!letters.includes(userGuess)) {
        giveUserFeedbackInTheModal("Not a Valid Letter", "Please enter a letter A-Z");
        handleModalCountdown();
        return;
    }

    if (guessesRemaining === 10) {
        startGame();
    }

    guessesRemaining--;
    const guessesLeftElement = document.getElementById("guesses-left");
    guessesLeftElement.textContent = guessesRemaining;


    if (userGuess === psychicChoice) {
        wins++;
        giveUserFeedbackInTheModal("You win!", "Good Job!");
    }

    if (letters.includes(userGuess)) {
        guessedLetters.push(userGuess);

        const guessedLetterElement = document.getElementById(`li-${10 - guessesRemaining}`);
        guessedLetterElement.textContent = userGuess;
        return;
    }
});