'use strict';

document.getElementById("config-form").addEventListener("submit", (e) => {
  e.preventDefault(); // ✅ empêche le rechargement de la page

  // ✅ Récupération correcte des valeurs
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const difficulty = document.getElementById("difficulty").value;
  const type = document.getElementById("type").value;

  // ✅ Construction dynamique de l’URL de l’API Open Trivia
  const url = `https://opentdb.com/api.php?amount=${amount}${
    category ? `&category=${category}` : ""
  }${difficulty ? `&difficulty=${difficulty}` : ""}${
    type ? `&type=${type}` : ""
  }`;

  // ✅ Sauvegarde de l’URL pour la page du quiz
  localStorage.setItem("quizURL", url);

  // ✅ Redirection vers quiz.html
  window.location.href = "quiz.html";
});
