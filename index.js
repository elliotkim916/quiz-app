'use strict';

const QUESTIONS = [
  {
    text: "What is the name of Tom Haverford's alcoholic beverage?", 
    answers: ['Lemon Sexy', 'Tommy Fresh', 'Snake Juice', 'Cobra Venom'],
    correctIndex: 2
  },
  {
    text: 'What kind of car does Donna drive?',
    answers: ['Jaguar', 'Rolls Royce', 'Mercedes Benz', 'Ferrari'],
    correctIndex: 2
  },
  {
    text: "What is Andy Dwyer's alter ego?", 
    answers: ['Burt Macklin, FBI', 'Randy Handler, CIA', 'Jack Thrifty, DEA', 'Paula Hart, PTA'],
    correctIndex: 0
  },
  {
    text: 'Where was Leslie Knope born?',
    answers: ['Eagleton', 'Pawnee', 'Indianapolis', 'Washington D.C.'],
    correctIndex: 0
  },
  {
    text: "What is Ben's terrible food choice?",
    answers: ['Mini muffins', 'Calzones', 'Pop-Tarts', 'Hot-Pockets'],
    correctIndex: 1
  },
  {
    text: "Who is Leslie Knope's teenage nemesis?",
    answers: ['Gary Finklestein', 'Greg Pikitus', 'George Patticus', 'Ginny Weasley'],
    correctIndex: 1
  },
  {
    text: 'What is the name of the lizard god that the Pawnee doomsday cult, the Reasonabilists, worship?',
    answers: ['Zorg', 'Zorb', 'Zorp', 'Zord'],
    correctIndex: 2
  },
  {
    text: 'Which Tom Haverford profile did Leslie match with while she was online dating?',
    answers: ['Tom N. Haverford', 'Tom B. Haverford', 'Tom J. Haverford', 'Tom A. Haverford'],
    correctIndex: 0
  },
  {
    text: "Who is Donna's cousin?",
    answers: ['Levondrious', 'Drake', 'Ginuwine', 'Usher'],
    correctIndex: 2
  },
  {
    text: "What doesn't Ben Wyatt ever understand the appeal of?",
    answers: ['JJ`s Diner', 'Pawnee`s unhealthy lifestyle', 'Math', 'Li`l Sebastian'],
    correctIndex: 3
  }
];

const APP = {
  questions: QUESTIONS,
  numCorrect: 0,
  numWrong: 0,
};

let questions = APP.questions;
let currentQIndex = 0;
let currentQ = questions[currentQIndex];

// user selects Go button to begin quiz
function handleGoButton() {
  $('.js-go-button').on('click', function() {
    $('.start-page').empty();
    renderQuestion();
  });
}

function generateQuestionElement(question) {
  return `
  <div class="container">
      <form id="js-quiz-question">
        <fieldset>
        <legend class="question">Question ${currentQIndex+1} of 10: ${question.text}</legend><br>
          <div class="answers" id="quiz-answers">
            <input type="radio" class="js-answer" name="answer" id="0" aria-labelledby="quiz-answers">
            <label for="0" class="button-label">${question.answers[0]}</label><br>
            <input type="radio" class="js-answer" name="answer" id="1" aria-labelledby="quiz-answers">
            <label for="1" class="button-label">${question.answers[1]}</label><br>
            <input type="radio" class="js-answer" name="answer" id="2" aria-labelledby="quiz-answers">
            <label for="2" class="button-label">${question.answers[2]}</label><br>
            <input type="radio" class="js-answer" name="answer" id="3" aria-labelledby="quiz-answers">
            <label for="3" class="button-label">${question.answers[3]}</label><br>
          </div>
          <button class="submit-answer" role="button" type="submit">Submit</button>
        </fieldset>
      </form>
  </div>`;   
}

function renderQuestion() {
  let currentQuestion = questions[currentQIndex];
  let thisQuestion = generateQuestionElement(currentQuestion, currentQIndex);
  $('.js-quiz-place').html(thisQuestion);
}

// currentQIndex increments when user selects the next button
function handleNextQuestionButton() {
  $('.js-quiz-feedback').on('click', '.to-next', function() {
    currentQIndex++; 
    if (currentQIndex === questions.length) {
      $('.js-quiz-place').empty();
      $('.js-quiz-feedback').empty();
      renderResults();
    } else {
      $('.js-quiz-feedback').empty();
      renderQuestion();
    }
  }); 
}

function handleAnswerButton() {
  $('.js-quiz-place').on('click', '.submit-answer', function(event) {
    event.preventDefault();
    let userChosenAnswer = $('input[name="answer"]:checked').attr('id');
    let usersAnswer = parseInt(userChosenAnswer);
    $('.js-quiz-place').empty();  
    generateFeedback(currentQIndex, usersAnswer);
  });
}

// generates feedback based on what answer user selects
function generateFeedback(currentIndex, selectedAnswer) {
  let currentQuestion = questions[currentIndex];
  let correctAnswer = currentQuestion.correctIndex;
  let correction = currentQuestion.answers[correctAnswer];
  if (isNaN(selectedAnswer)) {
    $('.js-quiz-feedback').html(`
    <div class="container">
      <fieldset class="answer-fieldset">
      <div class="if-nothing-chosen">
        <legend><h2 class="answer-text">You need to choose an answer...</h2></legend>
        <iframe src="https://giphy.com/embed/aAv3oNw804Rwc" width="480" height="233" frameBorder="0" class="giphy-embed" title="You need to choose gif"></iframe><br>
        <button class="to-current" id="toCurrentQuestion">Back</button>
      </div>
      </fieldset>
    </div>
      `);
  } else if (selectedAnswer === correctAnswer) {
    APP.numCorrect++;
    APP.currentQIndex++;
    $('.js-quiz-feedback').html(`
    <div class="container">
      <fieldset class="answer-fieldset">
      <div class="if-correct">
        <legend><h2 class="answer-text">Yes, that's correct!</h2></legend>
          <div class="number-correct js-number-correct"><h3>${APP.numCorrect} correct | ${APP.numWrong} incorrect</h3></div>
          <iframe src="https://giphy.com/embed/lfmLzyIbqgCI0" width="480" height="270" frameBorder="0" class="giphy-embed" title="You got it correct gif"></iframe><br>
        <button class="to-next" id="toFinalPage">Next</button>
      </div>
      </fieldset>
    </div>
      `);
  } else {
    APP.numWrong++;
    $('.js-quiz-feedback').html(`
    <div class="container">
      <fieldset class="answer-fieldset">
      <div class="if-wrong">
        <legend><h2 class="answer-text">No, that's wrong! The correct answer is ${correction}.</h2></legend>
          <div class="number-correct js-number-correct"><h3>${APP.numCorrect} correct | ${APP.numWrong} incorrect</h3></div>
          <iframe src="https://giphy.com/embed/75kmPCiwooxdm" width="480" height="252" frameBorder="0" class="giphy-embed" title="You got it wrong gif"></iframe><br>
          <button class="to-next" id="toFinalPage">Next</button>
      </div>
      </fieldset>
    </div>
      `);
  } 
}

// when user clicks the back button, will render the current question
function handleUnansweredQuestion() {
  $('.js-quiz-feedback').on('click', '.to-current', function() {
    $('.js-quiz-feedback').empty();
    renderQuestion();
  });
}

function generateFinalPage() {
  return `
  <div class="final-page">
    <h1 class="congrats">Congratulations, you LITERALLY completed the hardest quiz ever.</h1><br>
    <h1 class="final-score">You got a score of ${APP.numCorrect} out of 10!</h1><br>
      <iframe src="https://giphy.com/embed/90F8aUepslB84" width="480" height="305" frameBorder="0" class="giphy-embed" title="Done with quiz gif"></iframe><br>
      <button class="start-over">Take again?</button>
  </div>`;
}

function renderResults() {
  const finalResult = generateFinalPage();
  $('.js-quiz-place').html(finalResult);
}

function resetQuiz() {
  $('.js-quiz-place').on('click', '.start-over', function() {
    APP.numCorrect = 0;
    APP.numWrong = 0;
    currentQIndex = 0;
    currentQ = questions[currentQIndex];
    renderQuestion();
  });
}

function handleEntireQuiz() {
  handleUnansweredQuestion();
  handleGoButton();
  handleAnswerButton();
  handleNextQuestionButton();
  resetQuiz();
}

$(handleEntireQuiz);
