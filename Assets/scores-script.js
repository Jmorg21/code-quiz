var highScoresButton = document.querySelector("#highscores-button");
var doneButton = document.querySelector("#done-button");
var initialsInput = document.querySelector("#initials-input");


doneButton.addEventListener('click', function(event) {
  event.preventDefault();
});

//setItem(key, value). save initials to localStorage
function saveInitials() {
  localStorage.setItem("initials", 1)
};