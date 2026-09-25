let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const gameOver = document.querySelector("#game-over");
const winnerMessage = document.querySelector("#winner-message");
const newGameBtn = document.querySelector("#new-game-btn");

const genComputerChoice = () => {
    const option = ["rock","paper","scissors"];
    const randomIdx = Math.floor(Math.random() * 3);
    return option[randomIdx];
};

const showComputerChoice = (compChoice) => {
    const computerChoice = document.querySelector(`#${compChoice}`);
    computerChoice.classList.add("computer-choice");
    setTimeout(() => {
       computerChoice.classList.remove("computer-choice");
    }, 800);
};

const showUserChoice = (userChoice) => {
    const userChoiceElement = document.querySelector(`#${userChoice}`);
    userChoiceElement.classList.add("user-choice");
    setTimeout(() => {
        userChoiceElement.classList.remove("user-choice");
    }, 800);
};

const drawGame = () => {
    console.log("Game was draw.");
    msg.innerText = "DRAW";
    msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;

        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;

        msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }

    // Check 10 point limit
    if (userScore === 10) {
      winnerMessage.innerText = "🎉 YOU WIN! 🎉";
      gameOver.style.display = "block";
      disableGame();
    } else if (compScore === 10) {
      winnerMessage.innerText = "💻 COMPUTER WINS! 💻";
      gameOver.style.display = "block";
      disableGame();
    }
};

const disableGame = () => {
    choices.forEach((choice) => {
        choice.style.pointerEvents = "none";
        choice.style.opacity = "0.5";
    });
};



const playGame = (userChoice) => {
    console.log("user choice = ", userChoice);
    showUserChoice(userChoice);
    const compChoice = genComputerChoice();
    console.log("Computer choice =", compChoice);
    showComputerChoice(compChoice);

    if (userChoice === compChoice) {
        drawGame();
    } else {
    let userWin = true;
    if (userChoice === "rock") {
      //scissors, paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      //rock, scissors
      userWin = compChoice === "scissors" ? false : true;
    } else {
      //rock, paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
    console.log(choice);
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    })
})

newGameBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;

    userScorePara.innerText = 0;
    compScorePara.innerText = 0;

    gameOver.style.display = "none";
    msg.innerText = "Play your move";
    msg.style.backgroundColor = "#081b31";

    choices.forEach((choice) => {
        choice.style.pointerEvents = "auto";
        choice.style.opacity = "1";
    });
});

