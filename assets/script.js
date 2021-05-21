var score = 0;
var questionBorder = document.querySelector('#main-quiz')
var startQuiz = document.querySelector("#startbutton");
var quizQuestion = document.querySelector('#current-question')
var answers = document.querySelector('#choice')
var answerBox = document.querySelector('#answers');
var wrongTime = 10;
var timer = document.querySelector(".timer");
var secondsLeft = 76;
var questionNumber = 0;
var createUL = document.createElement("ul");
var backButton = document.getElementById("goback");
// var totalScore = score + secondsLeft;
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
var questions = [
    {
        q: "which of the following is NOT a data type?",
        possAnswers: ["DOM", "letter", "boolean", "number"],
        a: "DOM",
    },
    {
        q: "which of the following is NOT a part of the box model?",
        possAnswers:["padding", "margin","width", "border"],
        a:"width",
    },
    {
        q: "which of the following is NOT a semantic HTML tag?",
        possAnswers:["header","bottom","nav","aside"],
        a:"bottom",
    },
    {
        q: "what does the acronym DOM stand for in programming?",
        possAnswers:["Domination", "Days on Market", "Day of Month", "Document Object Model"],
        a:"Document Object Model",
    },
    {
        q: "what does the first C in CSS stand for?",
        possAnswers:["Crashing","Crushing","Crunching","Cascading"],
        a:"Cascading",
    }
];

function startTime(event) {
    event.preventDefault();
    startQuiz.style.display = "none"
    questionBorder.style.border = "2px solid blue"
   
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timer.textContent = "Time Left: " + secondsLeft;
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        endGame();
      }
  
    }, 1000);
    writeQuestion();
}

function writeQuestion(){
    quizQuestion.innerHTML = "";
    createUL.textContent = "";

    for (var i = 0; i < questions.length; i++){
        var currentQuestion = questions[questionNumber].q;
        var currentChoices = questions[questionNumber].possAnswers;
        quizQuestion.textContent = currentQuestion;
    }
    currentChoices.forEach(function (newItem) {
        
        var list = document.createElement("li");
        list.textContent = newItem;
        answers.appendChild(createUL);
        createUL.appendChild(list);
        
        list.addEventListener("click", (compare));
    })
    
}
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var wrongRight = document.createElement("div");
        wrongRight.setAttribute("id", "wrongRight");
        if (element.textContent == questions[questionNumber].a) {
            score++;
            wrongRight.textContent = "YEP! The answer was:  " + questions[questionNumber].a;
            
        } else {
            //deduct -10 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - wrongTime;
            wrongRight.textContent = "NOPE! The right answer was:  " + questions[questionNumber].a;
        }
        
    }
    // advance question
    questionNumber++;

    if (questionNumber >= questions.length) {
       
        timer.setAttribute("class","hide")
        wrongRight.textContent = "FINISH!" + " " + "You got  " + score + "/" + questions.length + " correct.";
        submitButton.setAttribute("value", score)
        setTimeout(endGame, 2000);        
    } else {
        answers.innerHTML = "";
        writeQuestion(questionNumber);
    }
    answers.appendChild(wrongRight);
}
function endGame(){
    var quizPage = document.getElementById("quiz-page");
    quizPage.setAttribute("class", "hide");
    var endScreen = document.getElementById("endgame");
    endScreen.removeAttribute("class", "hide");
    var final = document.getElementById("finalscore")
    totalScore = score + secondsLeft;
    final.textContent = "You got  " + score + "/" + questions.length + " correct, with " + secondsLeft + " seconds remaning, for a total score of " + totalScore + "!";
}
var submitButton = document.getElementById("submit"); 
function saveScore(){
    var initialEl = document.getElementById("initials");
    var initials = initialEl.value.trim();
    var scoreObj = {
        score: totalScore,
        initials: initials
    }
    console.log(highscores);
    highscores.push(scoreObj);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    // location.reload()
}


function goBack(){
    window.location.reload();
}
submitButton.addEventListener("click", saveScore);
backButton.addEventListener("click", goBack);
startQuiz.addEventListener("click", startTime);