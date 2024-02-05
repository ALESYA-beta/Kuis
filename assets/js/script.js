let currentQuestion = 0;
let score = 0;
let wrongAnswers = 0;
let quizData;

// Retrieve the last displayed question index, score, and wrong answers from localStorage
const eror = document.getElementById('eror');
const lastQuestionIndex = localStorage.getItem('lastQuestionIndex');
const savedScore = localStorage.getItem('quizScore');
const savedWrongAnswers = localStorage.getItem('wrongAnswers');

if (lastQuestionIndex) {
  currentQuestion = parseInt(lastQuestionIndex);
}

if (savedScore) {
  score = parseInt(savedScore);
}

if (savedWrongAnswers) {
  wrongAnswers = parseInt(savedWrongAnswers);
}

// Fetch quiz data from JSON file
fetch('./assets/js/app/quizData.json')
  .then(response => response.json())
  .then(data => {
    quizData = data;
    loadQuestion();
  })
  
  .catch(error => eror.innerHTML = `Error fetching quiz data:, ${error}` );
function loadQuestion() {
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const scoreElement = document.getElementById('score'); // Tambahkan elemen skor
  const wrongAnswersElement = document.getElementById('wrongAnswers'); // Tambahkan elemen jawaban salah

  if (scoreElement && wrongAnswersElement) {
    scoreElement.innerText = score.toString(); // Tampilkan skor secara real-time
    wrongAnswersElement.innerText = wrongAnswers.toString(); // Tampilkan jumlah jawaban salah secara real-time
  }
  const currentQuizData = quizData[currentQuestion];

  if (currentQuizData) {
    questionElement.innerHTML = currentQuizData.question;
    optionsElement.innerHTML = ``;

    currentQuizData.options.forEach((option) => {
      const optionElement = document.createElement('button');
      optionElement.innerText = option;
      optionElement.classList.add('option');
      optionElement.addEventListener('click', () => selectOption(option));
      optionsElement.appendChild(optionElement);
    });
  } else {
    // Handle the case when there are no more questions
    showResult();
  }
}

function selectOption(selectedOption) {
  const currentQuizData = quizData[currentQuestion];

  if (selectedOption === currentQuizData.correctAnswer) {
    score++;
  } else {
    wrongAnswers++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
    alr();
  }

  // Save the current question index, score, and wrong answers to localStorage
  localStorage.setItem('lastQuestionIndex', currentQuestion.toString());
  localStorage.setItem('quizScore', score.toString());
  localStorage.setItem('wrongAnswers', wrongAnswers.toString());
  updateScore(); // Panggil fungsi untuk memperbarui skor secara real-time
}

function showResult() {
  const quizContainer = document.getElementById('quiz-container');
  const finalScore = `Skor Anda: ${score}/${quizData.length}`;
  const totalWrongAnswers = `Jawaban Salah: ${wrongAnswers}`;
  quizContainer.innerHTML = `<h1>${finalScore}</h1><p>${totalWrongAnswers}</p><div class="py-4"></div>
  <button onclick="exit();" class="btn">Mulai ulang</button>`;
  
  // Clear the last displayed question index from localStorage
  //localStorage.removeItem('lastQuestionIndex');
}

function exit() {

  // Hapus semua cookie
document.cookie.split(";").forEach(function(cookie) {
  var eqPos = cookie.indexOf("=");
  var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
});
// Hapus semua data dari localStorage
localStorage.clear();

// Hapus semua data dari cache
caches.keys().then(keys => {
  keys.forEach(key => {
    caches.delete(key);
  });
});

window.location.reload();

}

function updateScore() {
  const tampilkanPoinElement = document.getElementById('tampilkanpoin');
  const tampilkanPoinsalah = document.getElementById('tampilkanPoinsalah');
  if (tampilkanPoinElement && tampilkanPoinsalah) {
    tampilkanPoinElement.innerHTML = `BENAR : ${score}`;
    tampilkanPoinsalah.innerHTML = `SALAH : ${wrongAnswers}`
  }
}

// Pembaruan skor secara real-time setiap detik (opsional)
setInterval(updateScore, 10);

document.getElementById('versi').addEventListener('click', function(){
  window.location.href = 'versi.html';
});

function alr() {
  window.location.href = "assets/credits/credits.html";
}