var highScore = document.querySelector("#highscores-list");
var clear = document.querySelector("#clear");
var allScores = [];

// clear scores button
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// get highscores from localstorage
var highscores = localStorage.getItem("highscores");
highscores = JSON.parse(highscores) ?? [];

highscores.sort((a, b) => b.score - a.score);  //sorts the score from high to low

// figure out how to sort high to low

if (highscores !== null) { //add to list

    for (var i = 0; i < highscores.length; i++) {
        // var createOl = document.createElement("ol");
        var createLi = document.createElement("li")
        createLi.textContent = "Name: " + highscores[i].initials + " | Score: " + highscores[i].score;
        highScore.appendChild(createLi);

    }
}
