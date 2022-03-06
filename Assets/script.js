var startButton = document.querySelector("#start-btn");
var questionContainerElement = document.querySelector("#question-container");
var questionElement = document.querySelector("#question");
var answerButtonsElement = document.querySelector("#answer-buttons");
var scoresContainerElement = document.querySelector("#scores-container");
var timerElement = document.getElementById("timer");
var timeLeft = 75;
var timer;
var currentQuestionIndex = 0;
var highScoresButton = document.querySelector("#highscores-button");
var doneButton = document.querySelector("#done-button");


var questions = [
    {
      question: "Commonly used data types DO not include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "booleans",
    },

    {
        question: "The condition in an if / else statement is enclosed with _____.",
        choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        answer: "parenthesis",
      },
    
      {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: [
          "numbers and strings",
          "other arrays",
          "booleans",
          "all of the above",
        ],
        answer: "all of the above",
      },
    
      {
        question:
          "String values must be enclosed within _____. when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes",
      },
    
      {
        question:
          "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log",
      },
    ];

function startGame() {
    scoresContainerElement.classList.add("hide");
    startButton.classList.add("hide");
    timer();
    questionContainerElement.classList.remove("hide");
    showQuestion();
    }

function timer() {
    timer = setInterval(function () {
        timeLeft = timeLeft - 1;
        if (timeLeft > 0) {
            timerElement.textContent = "Time: " + timeLeft;
            timeLeft--;
          } else {
            timerElement.textContent = "Time's up!";
      
            endGame();
          }
        }, 1000);
      };

function showQuestion() {
    questionElement.textContent = questions[currentQuestionIndex].question; //pointing to question array, then nested question array
    answerButtonsElement.innerHTML = "";
    questions[currentQuestionIndex].choices.forEach((answer) => {
          
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("btn");
        button.setAttribute("value", answer);
      
        button.addEventListener("click", selectAnswer);
      
        answerButtonsElement.appendChild(button);
    });
};
      
function selectAnswer() {
    const selectedButton = this.value;
      
    if (selectedButton !== questions[currentQuestionIndex].answer) {
         timeLeft -= 5;
      
        timerElement.textContent = timeLeft;
    } else {}
      
    currentQuestionIndex++;
      
    if (currentQuestionIndex === questions.length) {
        endGame();
    } else {
        showQuestion();
    }
};
      
function endGame() {
    questionContainerElement.classList.add("hide");
    scoresContainerElement.classList.remove("hide");
    timerElement.classList.add("hide");
    clearInterval(timer); // stops timer
        
 };
      
function saveInitials() {
    scoresContainerElement.setAttribute('class', "hide");
    document.getElementById('scoresList').classList.remove("hide");
    var initialsInput = document.querySelector("#initials").value;
      
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
      
    var newScore = {
        initials: initialsInput,
        score: timeLeft,
    };
    console.log(timeLeft);
      
    highscores.push(newScore);
      
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    loadScores()
};
      
function loadScores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
      
    highscores.sort(function (a, b) {
        return b.score - a.score;
    });
      
    var scoresTable = document.getElementById("scoresTable");
      
    highscores.forEach(function (score) {
        var playerRow = document.createElement("li");
      
        playerRow.textContent = score.initials + ' : ' + score.score;
          
        scoresTable.append(playerRow);
    });
};
      
startButton.addEventListener("click", startGame);
doneButton.addEventListener("click", saveInitials);
document.getElementById('playAgain').addEventListener('click', function(){
    window.location.reload(); //reloading page to restart quiz
});