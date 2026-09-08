const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startButton = document.getElementById("startBtn");
const restartButton = document.getElementById("restartBtn");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answercontainer");

const currentQuestionSpan = document.getElementById("currentQuestion");
const totalQuestionsSpan = document.getElementById("total-questions");

const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");

const resultMessage = document.getElementById("resultmsg");
const progressBar = document.getElementById("progress");

const quizQuestions = [
{
question: "What is the capital of France?",
answers: [
{ text: "London", correct: false },
{ text: "Berlin", correct: false },
{ text: "Paris", correct: true },
{ text: "Madrid", correct: false }
]
},


{
    question: "Which planet is known as the Red Planet?",
    answers: [
        { text: "Venus", correct: false },
        { text: "Mars", correct: true },
        { text: "Jupiter", correct: false },
        { text: "Saturn", correct: false }
    ]
},

{
    question: "What is the largest ocean on Earth?",
    answers: [
        { text: "Atlantic Ocean", correct: false },
        { text: "Indian Ocean", correct: false },
        { text: "Arctic Ocean", correct: false },
        { text: "Pacific Ocean", correct: true }
    ]
},

{
    question: "Which of these is NOT a programming language?",
    answers: [
        { text: "Java", correct: false },
        { text: "Python", correct: false },
        { text: "Banana", correct: true },
        { text: "JavaScript", correct: false }
    ]
},

{
    question: "What is the chemical symbol for gold?",
    answers: [
        { text: "Go", correct: false },
        { text: "Gd", correct: false },
        { text: "Au", correct: true },
        { text: "Ag", correct: false }
    ]
}


];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

// Initial setup

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

// Start Quiz

function startQuiz() {


// Reset variables
currentQuestionIndex = 0;
score = 0;

scoreSpan.textContent = 0;

// Switch screens
startScreen.classList.remove("active");
quizScreen.classList.add("active");

showQuestion();

}

// Show Question

function showQuestion() {


// Reset answer state
answersDisabled = false;

const currentQuestion = quizQuestions[currentQuestionIndex];

// Update question number
currentQuestionSpan.textContent = currentQuestionIndex + 1;

// Update progress bar
const progressPercent =
    ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

progressBar.style.width = progressPercent + "%";

// Update question text
questionText.textContent = currentQuestion.question;

// Clear previous answers
answersContainer.innerHTML = "";

// Create answer buttons
currentQuestion.answers.forEach((answer) => {

    const button = document.createElement("button");

    button.textContent = answer.text;

    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
});


}

// Select Answer

function selectAnswer(event) {

if (answersDisabled) return;

answersDisabled = true;

const selectedButton = event.target;

const isCorrect = selectedButton.dataset.correct === "true";

// Show correct and incorrect answers
Array.from(answersContainer.children).forEach((button) => {

    if (button.dataset.correct === "true") {

        button.classList.add("correct");

    } else if (button === selectedButton) {

        button.classList.add("incorrect");
    }
});

// Update score
if (isCorrect) {

    score++;

    scoreSpan.textContent = score;
}

// Move to next question after 1 second
setTimeout(() => {

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {

        showQuestion();

    } else {

        showResults();
    }

}, 1000);


}

// Show Results

function showResults() {


quizScreen.classList.remove("active");
resultScreen.classList.add("active");

finalScoreSpan.textContent = score;

const percentage = (score / quizQuestions.length) * 100;

if (percentage === 100) {

    resultMessage.textContent = "Perfect! You are a genius!";

} else if (percentage >= 80) {

    resultMessage.textContent = "Good Effort! Keep learning";

} else if (percentage >= 60) {

    resultMessage.textContent = "Not bad! Try again to improve!";

} else {

    resultMessage.textContent = "Keep studying! You will get better!";
}


}

// Restart Quiz

function restartQuiz() {


resultScreen.classList.remove("active");

startQuiz();
}
