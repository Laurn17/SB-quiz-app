let questionNum = 0;
let score = 0;
let correctAnswers = 0;

// !starting the quiz!
function startQuiz() {
$('.js-start-button').on('click', function(event) {
   console.log('`startQuiz` ran');
  $('#container').remove();
  renderQuestion();
  });
}

// !displays the runQuestion in the DOM!
function renderQuestion () {
   console.log('`renderQuestion` ran');
  $('.questionForm').html(runQuestion);
  submitAnswer();
}

// !the question/answer/submit form that displays!
function runQuestion() {
  console.log('`runQuestion` ran');
if (questionNum < STORE.length) {
  return `
  <div class="questionFormTemplate">
  <header role="banner">
  <h1>Question: <span class="currentQuesCount">${questionNum+1}</span>/10</h1>
    <img class="nervous-sb" src="https://media.giphy.com/media/xUPJPzcdlbvaFUrF7y/giphy.gif" alt="spongebob nervously sweats and blinks" />
  </header>
  <main role="main">
  <form action="/some-server-endpoint" method ='post'>
    <fieldset name="quiz-form">
    <legend>${STORE[questionNum].question}</legend>
    <hr>
    <div class="allAnswers" role="radiogroup">
     <label for="ansOne" class="possibleAns"><input type="radio" name="answer" id="ansOne" value="${STORE[questionNum].answers[0]}" /><span>${STORE[questionNum].answers[0]}</span></label>

     <label for="ansTwo" class="possibleAns"><input type="radio" name="answer" id="ansTwo" value="${STORE[questionNum].answers[1]}" /><span>${STORE[questionNum].answers[1]}</span></label>

     <label for="ansThree" class="possibleAns"><input type="radio" name="answer" id="ansThree" value="${STORE[questionNum].answers[2]}" /><span>${STORE[questionNum].answers[2]}</span></label>

     <label for="ansFour" class="possibleAns"><input type="radio" name="answer" id="ansFour" value="${STORE[questionNum].answers[3]}" /><span>${STORE[questionNum].answers[3]}</span></label>
      </div>
    </fieldset> 
    <button role="button" class="submitButton" type="submit">I got this!</button>
  </form>
  </main>
</div>`;
}
  else {
  finalResults();
  }
}

// !Submitting the users answer!
function submitAnswer() {
  console.log('`submitAnswer` ran');
  $('form').on("submit", function(event) {
    event.preventDefault();
    const userAns = $('input:checked').val();
    const correctAns = eachCorrectAnswer[questionNum];
    correctOrWrong(userAns, correctAns);
  });

}
function correctOrWrong(userAns, correctAns) {
  $('.questionFormTemplate').remove();
  if (userAns === correctAns) { 
    $('.questionForm').html(correctAnswerSelected);
    rightScore();
  }
  else {
    $('.questionForm').html(wrongAnswerSelected);
    wrongScore();
  }
}

// !Returning text for when the correct answer is chosen!
function correctAnswerSelected() {
  var c = ['Holy Krabby Patties!', 'Great Barrier Reef!', 'Jumpin\' Jellyfish!', 'Mother of Pearl!', 'Flippin\' Fish Fossils!'];
  var randomValue = c[Math.floor(c.length * Math.random())];
  return `<div class="right return-response">
  <main role="main">
  <h1>${randomValue}</h1>
  <img class="right-answer-img" src="https://lh3.googleusercontent.com/-VCbkXqX1W2I/Wvi703Z1U8I/AAAAAAAAJY4/3LRUkBtH_ZkdTQ2WPw4wOOUZaz6qi6PHQCL0BGAYYCw/h415/2018-05-13.png" alt="Spongebob with heart eyes"/>
  <p class="answer-text">The Magic Conch approves</p>
  <p class="score">Score: <span class="currentScore"></span>/${questionNum+1}</p>
  <button role="button" type="button" class="nextButton">Next</button>
  </main>
  </div>`;
}

// !Updating the users score when right!
function rightScore() {
  score ++;
  $('.currentScore').text(score);
}

// !Returning text for when the wrong answer is chosen!
function wrongAnswerSelected() {
  var w = ['Oh, Barnacles!', 'Tartar Sauce!', 'Kelp for Brains!', 'Bottom Feeder!', 'Fishpaste!'];
  var randomWrongValue = w[Math.floor(w.length * Math.random())];
  return `<div class="wrong return-response">
  <main role="main">
  <h1>${randomWrongValue}</h1>
  <img class="answer-img" src="https://lh3.googleusercontent.com/-1fwltJVYNk0/WvoNwmowGYI/AAAAAAAAJb8/MjjcITjXZioZPbkyhK447-kZlz1gH077wCL0BGAYYCw/h360/2018-05-14.png" alt="Spongebob with a dissapointed face"/>
  <p class="answer-text">The correct answer is: ${eachCorrectAnswer[questionNum]}</p>
  <p class="score">Score: <span class="currentScore"></span>/${questionNum+1}</p>
  <button role="button" type="button" class="nextButton">Next</button>
  </main>
  </div>`;
}

// !Updating the users score when wrong!
function wrongScore() {
  $('.currentScore').text(score);
}

// !Sending the user to the next question from the correct or wrong page!
function runNextQuestion() {
  $('.questionForm').on('click', '.nextButton', function(event) {
    if (questionNum === 10) {
    finalResults();
    }

    else {
    console.log('`nextQuestion` ran');
    $('.return-response').remove();
    questionNum++;
    renderQuestion();
    }
  });
}

// !Returning the Pass or Fail pages with certain criteria!
function finalResults() {
  if (score > 5) {
  $('.questionForm').html(userPassed);
  $('.currentScore').text(score);
  restartQuiz();
  }
  else {
  $('.questionForm').html(userFailed);
  $('.currentScore').text(score);
  restartQuiz();
  }
}

// !Page to return when a user passes the quiz!
function userPassed() {
 return `<div class="results-page">
 <main role="main">
 <h1>CONGRATULATIONS</h1>
 <img src="https://lh3.googleusercontent.com/-mMnlgz1Z0Uw/Wvi4suf99eI/AAAAAAAAJYk/luC_AFcBFRwk0UfTkApyu_6-i5hU7LepQCL0BGAYYCw/h829/2018-05-13.png" alt="Spongebob with hands high holding a rainbow" id="congratsImg" />
 <h2>Final Score: <span class="currentScore"></span>/10</h2>
 <p class="right-results-text">Your knowledge of Spongebob Squarepants is incomparable! </p>
 <button class="restart-button">Restart Quiz</button>
 </main>
 </div>`
}

// !Page to return when a user fails the quiz!
function userFailed() {
  return `<div class="results-page">
  <main role="main">
  <h1>FAILURE...</h1>
  <h2>Final Score: <span class="currentScore"></span>/10</h2>
  <p class="results-text">"Just get outa here you stupid, dumb animal!"</p>
  <p id="justkidding">[Jussst kiddinggg, don't give up, try again!]</p>
  <button class="restart-button">Restart Quiz</button>
  </main>
  </div>`
}

// !Sending the user back to the first question!
function restartQuiz() {
  $('.questionForm').on('click', '.restart-button', function(event) {
    $('.results-page').remove();
    console.log('`restartQuiz` ran');
    questionNum = 0;
    score = 0;
    renderQuestion();
  });
}

// !My function to run all important functions above!
function handleQuiz() {
  startQuiz();
  runNextQuestion();
}

// !Implementing my quiz!
  $(handleQuiz);