// Load questions from JSON format
const quizData = [
 {
     "id": 1,
     "question": "What term refers to the practice of buying and selling the same stock multiple times in a single trading day?",
     "options": [
         {
             "key": "a",
             "text": "Swing trading"
         },
         {
             "key": "b",
             "text": "Long-term investing"
         },
         {
             "key": "c",
             "text": "Day trading"
         },
         {
             "key": "d",
             "text": "Value investing"
         }
     ],
     "answerKey": "c"
 },
 {
     "id": 2,
     "question": "Which financial statement provides information about a company’s revenues and expenses over a specific period?",
     "options": [
         {
             "key": "a",
             "text": "Balance sheet"
         },
         {
             "key": "b",
             "text": "Income statement"
         },
         {
             "key": "c",
             "text": "Cash flow statement"
         },
         {
             "key": "d",
             "text": "Statement of retained earnings"
         }
     ],
     "answerKey": "b"
 },
 {
     "id": 3,
     "question": "Which order type allows you to buy or sell a stock immediately at the best available price?",
     "options": [
         {
             "key": "a",
             "text": "Limit order"
         },
         {
             "key": "b",
             "text": "Market order"
         },
         {
             "key": "c",
             "text": "Stop order"
         },
         {
             "key": "d",
             "text": "Day order"
         }
     ],
     "answerKey": "b"
 },
 {
     "id": 4,
     "question": "What does the term “bull market” signify in the stock market?",
     "options": [
         {
             "key": "a",
             "text": "A market with declining prices"
         },
         {
             "key": "b",
             "text": "A market with increasing prices"
         },
         {
             "key": "c",
             "text": "A market with no significant price changes"
         },
         {
             "key": "d",
             "text": "A market with high volatility"
         }
     ],
     "answerKey": "b"
 },
 {
     "id": 5,
     "question": "Which term refers to the practice of borrowing shares from a broker to sell them with the expectation of buying them back at a lower price in the future?",
     "options": [
         {
             "key": "a",
             "text": "Short selling"
         },
         {
             "key": "b",
             "text": "Long position"
         },
         {
             "key": "c",
             "text": "Margin trading"
         },
         {
             "key": "d",
             "text": "Hedging"
         }
     ],
     "answerKey": "a"
 }
];

let currentAnswers = Array(quizData.length).fill(null);
let score = 0;

// Load questions into HTML
function loadQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = quizData.map((q, index) => `
        <div class="question">
            <p><strong>${q.question}</strong></p>
            ${q.options.map((option, optIndex) => `
                <label>
                    <input type="radio" name="question${index}" value="${option.key}" onchange="selectAnswer(${index}, '${option.key}', '${option.text}')">
                    ${option.text}
                </label><br>
            `).join('')}
        </div>
    `).join('');
}

function selectAnswer(questionIndex, key, text) {
    currentAnswers[questionIndex] = {text, key};
    document.getElementById("submit-btn").disabled = currentAnswers.includes(null);
}

function submitQuiz() {
    score = currentAnswers.reduce((total, ans, idx) => total + (ans.key === quizData[idx].answerKey ? 1 : 0), 0);
    displayResults();
}

function displayResults() {
    document.getElementById("quiz-container").innerHTML = `
        <h2>Quiz Results</h2>
        <p>Your score: ${score} out of ${quizData.length}</p>
        <ul>
            ${quizData.map((q, idx) => `
                <li>${q.question}<br>
                    <strong>Correct Answer:</strong> ${q.options.filter(op => op.key == q.answerKey)[0].text}<br>
                    <strong>Your Answer:</strong> ${currentAnswers[idx].text || "No answer"}
                    ${currentAnswers[idx].key === q.answerKey ? "✅" : "❌"}
                </li>
            `).join('')}
        </ul>
    `;
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("restart-btn").style.display = "inline-block";
    document.getElementById("exit-btn").style.display = "inline-block";
}

function restartQuiz() {
    currentAnswers.fill(null);
    score = 0;
    document.getElementById("submit-btn").style.display = "inline-block";
    document.getElementById("restart-btn").style.display = "none";
    document.getElementById("exit-btn").style.display = "none";
    document.getElementById("submit-btn").disabled = true;
    loadQuiz();
}

// Event listeners
document.getElementById("submit-btn").addEventListener("click", submitQuiz);
document.getElementById("restart-btn").addEventListener("click", restartQuiz);
document.getElementById("exit-btn").addEventListener("click", () => alert("Thank you for using the quiz application!"));

// Initial load
loadQuiz();
