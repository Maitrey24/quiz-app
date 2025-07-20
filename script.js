const quizData = [
  {
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    answer: "Canberra",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "Who wrote the Indian National Anthem?",
    options: [
      "Mahatma Gandhi",
      "Rabindranath Tagore",
      "Sarojini Naidu",
      "Jawaharlal Nehru",
    ],
    answer: "Rabindranath Tagore",
  },
  {
    question: "Which is the smallest bone in the human body?",
    options: ["Stapes", "Femur", "Ulna", "Radius"],
    answer: "Stapes",
  },
  {
    question: "Who was the first President of India?",
    options: [
      "Dr. Rajendra Prasad",
      "Dr. Abdul Kalam",
      "Indira Gandhi",
      "Subhash Chandra Bose",
    ],
    answer: "Dr. Rajendra Prasad",
  },
];

let currentQuestion = 0;
let userAnswers = new Array(quizData.length).fill(null);

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");

function loadQuestion(index) {
  const q = quizData[index];
  questionEl.innerText = `${index + 1}. ${q.question}`;
  optionsEl.innerHTML = "";

  q.options.forEach((option) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="option" value="${option}" ${
      userAnswers[index] === option ? "checked" : ""
    }/>
      ${option}
    `;
    optionsEl.appendChild(label);
  });

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === quizData.length - 1;
}

optionsEl.addEventListener("change", (e) => {
  if (e.target.name === "option") {
    userAnswers[currentQuestion] = e.target.value;
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion(currentQuestion);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  }
});

submitBtn.addEventListener("click", () => {
  let score = 0;
  quizData.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      score++;
    }
  });
  questionEl.innerHTML = "";
  optionsEl.innerHTML = "";
  document.querySelector(".navigation").style.display = "none";
  resultEl.innerHTML = `
    🎉 <strong>Congratulations!</strong><br>
    Your Score: <strong>${score} / ${quizData.length}</strong>
  `;
});

loadQuestion(currentQuestion);
