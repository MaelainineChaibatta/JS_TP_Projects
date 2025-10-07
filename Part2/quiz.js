'use strict';

// ✅ Sélection des éléments HTML
const quizContainer = document.getElementById("quiz-container");
const submitBtn = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

// ✅ Récupération de l’URL depuis localStorage
const apiURL = localStorage.getItem("quizURL");
let questions = [];
let score = 0;

// ✅ Vérification : si on ouvre directement quiz.html sans config
if (!apiURL) {
  quizContainer.innerHTML = "<p>⚠️ Aucune configuration trouvée. Retournez à la page de configuration.</p>";
} else {
  // ✅ Récupération des questions via l’API
  fetch(apiURL)
    .then(response => response.json()) // ✅ () manquaient
    .then(data => {
      questions = data.results;
      displayQuestions(questions);
    })
    .catch(() => {
      quizContainer.innerHTML = "<p>❌ Erreur lors du chargement des questions.</p>";
    });
}

// ✅ Fonction d’affichage des questions
function displayQuestions(questions) {
  quizContainer.innerHTML = ""; // efface "Chargement..."

  questions.forEach((q, index) => {
    const section = document.createElement("section");
    section.classList.add("question");

    const questionHTML = document.createElement("h2");
    questionHTML.innerHTML = `${index + 1}. ${q.question}`;
    section.appendChild(questionHTML);

    // ✅ Mélange des réponses
    const answers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);

    answers.forEach(answer => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="q${index}" value="${answer}"> ${answer}`;
      section.appendChild(label);
      section.appendChild(document.createElement("br"));
    });

    quizContainer.appendChild(section);
  });

  // ✅ Affiche le bouton Soumettre
  submitBtn.style.display = "block";
}

// ✅ Quand on clique sur “Soumettre”
submitBtn.addEventListener("click", () => {
  score = 0;

  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === q.correct_answer) {
      score++;
    }
  });

  // ✅ Affichage du score final
  scoreDisplay.textContent = `Score : ${score} / ${questions.length}`;
  window.scrollTo({ top: 0, behavior: "smooth" });
});

