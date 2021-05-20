
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
   
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timer.textContent = "Time Left: " + secondsLeft;
      //if question is wrong deduct 10 sec
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        //endGame();
        //function to input initials and store them + score to local storage
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
        // Correct condition 
        if (element.textContent == questions[questionNumber].a) {
            score++;
            wrongRight.textContent = "YEP! The answer was:  " + questions[questionNumber].a;
            // Correct condition 
        } else {
            // Will deduct -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - wrongTime;
            wrongRight.textContent = "NOPE! The right answer was:  " + questions[questionNumber].a;
        }
        
    }
    // Question Index determines number question user is on
    questionNumber++;

    if (questionNumber >= questions.length) {
        // All done will append last page with user stats
        // allDone();
        wrongRight.textContent = "FINISH!" + " " + "You got  " + score + "/" + questions.length + " correct.";
    } else {
        answers.innerHTML = "";
        writeQuestion(questionNumber);
    }
    answers.appendChild(wrongRight);
//  if (questionNumber < questions.length){
//     quizQuestion.innerHTML = questions.q;

}
//  for (i = 0; i < questions.length; i++) {

    // function for initials + storage
//}
//function endGame
startQuiz.addEventListener("click", startTime);