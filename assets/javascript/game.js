// Declare variables
var gameWords = ["hamilton", "annie", "wicked", "cats", "cabaret", "hairspray", "rent", "aladdin", "titanic", "pippin", "newsies", "chicago", "hair"];
var word;
var answerArray;
var wrongArray;
var guessesLeft;
var wins = 0;

// Function to start game
function startGame() {
  var x = document.getElementById("text")
  var y = document.getElementById("image");

  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "block";
  } else {
    x.style.display = "none";
    y.style.display = "none";
  }

  // Set word to random pick from gameWords array
  word = gameWords[Math.floor(Math.random() * gameWords.length)];

  // Set answerArray and wrongArray to empty array
  answerArray = [];
  wrongArray = [];
  document.getElementById("current-guess").innerHTML = wrongArray;

  // Set guessesLeft to length of random word plus 5
  guessesLeft = word.length + 5;

  // Fill answerArray with underscores - equal to length of word variable
  for (var i = 0; i < word.length; i++) {
    answerArray.push("_");
  }

  // Display to HTML page
  document.getElementById("current-word").innerHTML = answerArray.join(" ");
  document.getElementById("guess-counter").innerHTML = guessesLeft;
  document.getElementById("win-counter").innerHTML = wins;
}

// Function to update guesses
function updateGuess(guess) {

  // For loop checking if guess correct
  if (word.indexOf(guess) === -1 && wrongArray.indexOf(guess) === -1) {
    wrongArray.push(guess);
    document.getElementById("current-guess").innerHTML = wrongArray.join(" ");
    guessesLeft--;
    document.getElementById("guess-counter").innerHTML = guessesLeft;
    checkWin();
  }
  else {
    for (var j = 0; j < word.length; j++) {
      if (word[j] === guess) {
        answerArray[j] = guess;
        guessesLeft--;
        document.getElementById("guess-counter").innerHTML = guessesLeft;
        document.getElementById("current-word").innerHTML = answerArray.join(" ").toUpperCase();
        checkWin();
      }
    }
  }
}

//Function to check if won or lost
function checkWin() {
  if (guessesLeft <= 0) {
    document.getElementById("text").style.display = "block";
    document.getElementById("image").style.display = "block";
    document.getElementById("text").innerHTML = "You Lost! The game will reset in a few seconds.";
    document.getElementById("image").innerHTML = ("<img src='https://media.giphy.com/media/1BgNBBHRNpq3bpB9Uz/giphy.gif'>");
    setTimeout(startGame, 5000);
  }
  else if (answerArray.indexOf("_") === -1) {
    wins++;
    document.getElementById("text").style.display = "block";
    document.getElementById("image").style.display = "block";
    document.getElementById("text").innerHTML = "You Won!The game will reset in a few seconds.";
    document.getElementById("image").innerHTML = ("<img src='https://media.giphy.com/media/26tPd54CXOVnXhipy/giphy.gif'>");
    document.getElementById("win-counter").innerHTML = wins;
    setTimeout(startGame, 5000);
  }
}

  // User input function
  document.onkeyup = function (event) {
    var userGuess = event.key.toLowerCase();
    if (document.getElementById("text").style.display === "none" && answerArray.indexOf(userGuess) === -1) {
      updateGuess(userGuess);
    }
    //Reset enter key
    if (event.keyCode === 13) {
      startGame();
    }
  };

  startGame();