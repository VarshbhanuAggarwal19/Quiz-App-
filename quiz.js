
// here the js code start with the array of questions.
// each question is an object with the question text and an array of possible answers.
// each answer is also an object with the answer text and a boolean indicating if it's correct.
// we will use this data to dynamically generate the quiz interface and handle user interactions.

const questions = [
    {
    questions: "What is the capital of India?",
    answers: [
        {text: "New Delhi", correct: true}, 
        {text: "Mumbai", correct: false},
        {text: "Uttar-Pardesh", correct: false },
        {text: "Haryana", correct: false}
    ]
    },
    {
    questions: "Which is the largest animal in the world?",
    answers: [
        {text: "shark", correct: false}, 
        {text: "Blue Whale", correct: true},
        {text: "Elephant", correct: false },
        {text: "Giraffe", correct: false}
    ]
    },
    {
    questions: "Which is the smallest country in the world?",
    answers: [
        {text: "Bhutan", correct: false}, 
        {text: "Nepal", correct: false},
        {text: "Shri Lanka", correct: false },
        {text: "Vatican City", correct: true}
    ]
    },
    {
    questions: "Which is the largest desert in the world?",
    answers: [
        {text: "Kalahari", correct: false}, 
        {text: "Gobi", correct: false},
        {text: "Sahara", correct: false },
        {text: "Antarctica", correct: true}
    ]
    },
    {
     questions: "Which is the smallest continent in the world?",
    answers: [
        {text: "Asia", correct: false}, 
        {text: "Australia", correct: true},
        {text: "Arctic", correct: false },
        {text: "Africa", correct: false}
    ]
    }

];
// now we will get references to the HTML elements we will be working with.
// by using their IDs, we can easily manipulate these elements in our JavaScript code with help of DOM.

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn"); 

// now we will define some variables to keep track of the current question index and the user's score.
// these will be updated as the user progresses through the quiz. 

let currentQuestionIndex = 0;
let score = 0;
  
// next, we will add an event listener to the next button.
// when the button is clicked, it will check if there are more questions to show.
// if there are, it will move to the next question; if not, it will end the quiz.

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
     
}
// function to handle what happens when an answer is selected.
// it checks if the selected answer is correct, updates the score, and provides feedback.
 // it also disables further answer selection and shows the next button.
 // here the function name as showquestion which help in displaying the question and options.

function showQuestion(){
    // now reset the state for the new question.
    // this will clear out any previous answers and hide the next button.
    resetState();

     // get the current question from the questions array using the currentQuestionIndex.
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.questions;

    // now we will loop through each answer for the current question.
    // for each answer, we will create a button element, set its text, and add it to the answer buttons container.
    // we will also add an event listener to each button to handle when it is clicked.

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        
        // if the answer is correct, we will set a data attribute on the button.
        // this will help us identify correct answers later when the user selects an option.

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);   

    });

}
 
// define the resetstate function... which helps in removing the previous options. 
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"; 
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }   
    else{
        selectedBtn.classList.add("incorrect");
    }  
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    

    
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


// define the handle next button function... which helps in moving to the next question or showing the score if it was the last question.

function handleNextButton(){
    currentQuestionIndex++; 
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

// function for next btn 

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();

    }else{
        startQuiz();
    }

});
    



startQuiz();



