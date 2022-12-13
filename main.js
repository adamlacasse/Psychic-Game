const letters = "abcdefghijklmnopqrstuvwxyz";
let wins = 0;
let losses = 0;
let guessesRemaining;
let guessedLetters;
let psychicChoice;

const startBtnWrapper = document.getElementById("btn-wrapper");

const setupGame = () => {
    guessesRemaining = 10;
    guessedLetters = [];

    psychicChoice = letters[Math.floor(Math.random() * 26)];

    const guessesLeftElement = document.getElementById("guesses-left");
    guessesLeftElement.textContent = guessesRemaining;

    const guessesList = document.getElementById("guesses-list");
    [...guessesList.children].forEach(element => {
        element.firstChild.textContent = "";
    });

    startBtnWrapper.style.display = "none";

    document.addEventListener("keyup", handleGameplayKeyup);
    document.getElementById("past-guesses").style.display = "flex";
};

const handleModalOpen = (title, message) => {
    const modal = document.getElementById("modal");
    modal.style.display = "block";

    document.removeEventListener("keyup", handleGameplayKeyup);
    const handleModalKeyup = (e) => {
        if (e.key === "Esc" || e.key === "Escape") {
            modal.style.display = "none";
        }
    };
    document.addEventListener("keyup", handleModalKeyup);
    
    const modalTitle = document.getElementById("modal-title");
    modalTitle.textContent = title;
    
    const modalContent = document.getElementById("modal-content");
    modalContent.textContent = message;

    const modalCloseButton = document.getElementById("modal-close-button");
    modalCloseButton.addEventListener("click", () => {
        modal.style.display = "none";
        document.removeEventListener("keyup", handleModalKeyup);
    });

    document.getElementById("games-played").textContent = wins + losses;
    document.getElementById("wins").textContent = wins;
    document.getElementById("losses").textContent = losses;
    
    document.getElementById("start-btn").textContent = "Play Again?";
    startBtnWrapper.style.display = "block";
};

const handleGameplayKeyup = event => {
    const userGuess = event.key.toLowerCase();

    if (!letters.includes(userGuess) || guessedLetters.includes(userGuess)) {
        console.warn("Already guessed or invalid letter");
        return;
    }

    guessesRemaining--;
    const guessesLeftElement = document.getElementById("guesses-left");
    guessesLeftElement.textContent = guessesRemaining;

    const guessedLetterElement = document.getElementById(`li-${10 - guessesRemaining}`);
    guessedLetterElement.textContent = userGuess;

    guessedLetters.push(userGuess);

    if (userGuess === psychicChoice) {
        wins++;
        handleModalOpen("You win!", "Good Job!");
        return;
    }

    if (guessesRemaining === 0) {
        losses++;
        handleModalOpen("You lose!", "Better luck next time!");
    }
}
