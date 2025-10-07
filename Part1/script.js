'use strict';

window.addEventListener("DOMContentLoaded", () => {

  let timeLeft = 15;
  const timeDisplay = document.getElementById("time");
  const totalQuestions = 5;
  let countdown; 

  function startTimer() {
    timeLeft = 15;
    timeDisplay.textContent = timeLeft;

    countdown = setInterval(() => {
      timeLeft--;
      timeDisplay.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(countdown);
        alert("Temps écoulé !");
        submitQuiz(); 
      }
    }, 1000);
  }

  function submitQuiz() {
    clearInterval(countdown); 

    let score = 0;
    for (let i = 1; i <= totalQuestions; i++) {
      let answer = document.querySelector(`input[name="q${i}"]:checked`);
      if (answer && answer.value === "1") {
        score++;
      }
    }

   
    document.getElementById("score").textContent = `Score : ${score} / ${totalQuestions}`;
    window.scrollTo({ top: 0, behavior: "smooth" });

    
    setTimeout(resetQuiz, 3000);
  }

  
  function resetQuiz() {
  
    document.getElementById("score").textContent = `Score : 0 / ${totalQuestions}`;

    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => radio.checked = false);

    startTimer();
  }

  document.getElementById("submit").addEventListener("click", submitQuiz);

  startTimer();
});






