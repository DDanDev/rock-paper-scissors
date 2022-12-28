var gamerScore = 0;
const gamerScoreDisplay = document.getElementById("gamerScore");
var aiScore = 0;
const aiScoreDisplay = document.getElementById("aiScore");

const domChoices = document.getElementById("gamerChoices").getElementsByClassName("choices");
var jsChoices = [];
for (let i = 0; i < domChoices.length; i++) {
	jsChoices.push(domChoices[i].alt);
}

const gameArea = document.getElementById("gameArea");
var isGameChoosing = () => {
	return gameArea.className === "choosing";
};

var gamerChoice;
var aiChoice;

// test js random generating a choice reliability
// function testRand(tries) {
// 	var randNumber = Math.random();
// 	var randLength = randNumber.toString().length;
// 	var randMinLen = randLength;
// 	var randMaxLen = randLength;

//     var chosens = [];
//     for (let i = 0; i <= choices.length; i++) {
//         chosens[i] = 0
//     }

// 	for (let i = 0; i < tries; i++) {
//         var randNumber = Math.random();
//         var randLength = randNumber.toString().length;

//         randLength > randMaxLen ? randMaxLen = randLength : null;
//         randLength < randMinLen ? randMinLen = randLength : null;

// 		var randChoice = Math.floor(Math.random() * aiChoices.length);
//         chosens[randChoice]++
// 	}

// 	console.log("Min random number length " + randMinLen);
// 	console.log("Max random number length " + randMaxLen);
// 	console.log("How many times did it choose each " + chosens);
// }

// actions
// change play state choosing to resultState
function playChoice(gamerChoiceN) {
	if (!isGameChoosing()) {
		return;
	}
	gameArea.className = "resultState";

	// set gamer's choice
	gamerChoice = jsChoices[gamerChoiceN];
	document.getElementById("choose" + gamerChoice).classList.add("chosen");

	// console.log("gamer chose " + gamerChoice);

	// set ai's choice
	aiChoiceN = Math.floor(Math.random() * jsChoices.length);
	aiChoice = jsChoices[aiChoiceN];
	document.getElementById("aiChoose" + aiChoice).classList.add("chosen");
	// console.log("ai chose " + aiChoice);

	// set who wins
	aiChoiceN === 2 && gamerChoiceN === 0 ? (aiChoiceN = -1) : null;
	var winner;
	gamerChoiceN - 1 === aiChoiceN ? (winner = "gamer") : gamerChoiceN === aiChoiceN ? (winner = "draw") : (winner = "ai");
	// console.log(winner + " wins");

	//display winner
	document.getElementById("result").innerText = winner === "gamer" ? "You Win!" : winner === "draw" ? "Draw!!" : "Computer Wins!";

	// add to score
	winner === "gamer" ? gamerScore++ : winner === "ai" ? aiScore++ : null;

	// display scores
	updateScoreBoard();
}
// update scores
function updateScoreBoard() {
	gamerScoreDisplay.innerText = gamerScore;
	aiScoreDisplay.innerText = aiScore;
}

// back to first view
function waitForNewChoice() {
	gameArea.className = "choosing";
	document.getElementById("aiChoose" + aiChoice).classList.remove("chosen");
	document.getElementById("choose" + gamerChoice).classList.remove("chosen");
}

// triggers
// user made a choice
for (let i = 0; i < domChoices.length; i++) {
	domChoices[i].addEventListener("click", (e) => {
		playChoice(i);
	});
}
// play again
document.getElementById("playAgain").addEventListener("click", () => {
	waitForNewChoice();
});

// reset
document.getElementById("resetScore").addEventListener("click", () => {
	gamerScore = 0;
	aiScore = 0;
	updateScoreBoard();
	waitForNewChoice();
});
