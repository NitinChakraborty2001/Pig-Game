/*
	🖥️Full-Stack Developer 🎨Graphic Designer 💸Freelancer

	👨‍💻Author : Nitin Chakraborty.

	🔗Facebook : https://www.facebook.com/NitinChakraborty2001/
	🔗Instagram : https://www.instagram.com/NitinChakraborty2001/
	🔗YouTube : http://www.youtube.com/c/NitinChakraborty2001/
	🔗LinkedIn : https://www.linkedin.com/in/NitinChakraborty2001/
    🔗Twitter : https://www.twitter.com/NitinCB2001/

	📧eMail : nitin.chakraborty13@gmail.com
*/

"use strict";

// Selecting Elements
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");

const score0Element = document.querySelector("#score--0");
const score1Element = document.getElementById("score--1");

const current0Element = document.getElementById("current--0");
const current1Element = document.getElementById("current--1");

const diceElement = document.querySelector(".dice");

const newGameButton = document.querySelector(".button--newGame");
const rollDiceButton = document.querySelector(".button--rollDice");
const holdButton = document.querySelector(".button--hold");

// State Variables
let scores, currentScore, activePlayer, isPlaying;

// Starting Conditions
const initializeGame = function () {
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	isPlaying = true;

	score0Element.textContent = 0;
	score1Element.textContent = 0;
	current0Element.textContent = 0;
	current1Element.textContent = 0;

	diceElement.classList.add("hidden");
	player0Element.classList.remove("player--winner");
	player1Element.classList.remove("player--winner");
	player0Element.classList.add("player--active");
	player1Element.classList.remove("player--active");
};

initializeGame();

// Switch Player
const switchPlayer = function () {
	document.getElementById(`current--${activePlayer}`).textContent = 0;

	currentScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;

	player0Element.classList.toggle("player--active");
	player1Element.classList.toggle("player--active");
};

// Roll Dice Button Functionality
rollDiceButton.addEventListener("click", function () {
	if (isPlaying) {
		// 1. Generating A Random Dice Roll!
		const dice = Math.trunc(Math.random() * 6) + 1;

		// 2. Display Dice!
		diceElement.classList.remove("hidden");
		diceElement.src = `./Assets/Images/Dice--${dice}.png`;

		// 3. Check For Dice Rolled 1 Point!
		if (dice !== 1) {
			// Add Dice To Current Score!
			currentScore += dice;
			document.getElementById(`current--${activePlayer}`).textContent = currentScore;
		} else {
			// Switch To Next Player!
			switchPlayer();
		}
	}
});

// Hold Button Functionality
holdButton.addEventListener("click", function () {
	if (isPlaying) {
		// 1. Add Current Score To Active Player's Score!
		scores[activePlayer] += currentScore;
		// scores[1] = scores[1] + currentScore

		document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

		// 2. Check If Player's Score Is >= 100 Points!
		if (scores[activePlayer] >= 100) {
			// Finish The Game!
			isPlaying = false;

			// Add "hidden" Class To Dice Element!
			diceElement.classList.add("hidden");

			// Add "player--winner" Class To Active Player's Section!
			document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");

			// Remove "player--active" Class From Active Player's Section!
			document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
		} else {
			// Switch To The Next Player!
			switchPlayer();
		}
	}
});

newGameButton.addEventListener("click", initializeGame);
