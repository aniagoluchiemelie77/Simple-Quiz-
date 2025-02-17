const questions = [
    {
        question: "Q. What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 2
    },
    {
        question: "Q. Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "Q. Which continent is Nigeria located in",
        options: ["Asia", "Africa", "Europe", "North Africa"],
        correct: 1
    },
    // Add more questions here
];
const scoreDiv = document.getElementById('score-container');
let currentQuestion = 0;
let score = 0;
let timer;
const optionLetters = ['A', 'B', 'C', 'D'];

function showQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const timeElement = document.getElementById('time');
    const nextButton = document.getElementById('next-button');
    scoreDiv.style.display = "none";
    if (currentQuestion < questions.length) {
        questionElement.textContent = questions[currentQuestion].question;
        optionsElement.innerHTML = '';
        questions[currentQuestion].options.forEach((option, index) => {
            const button = document.createElement('button');
            button.innerHTML = `<p>${optionLetters[index]}</p> ${option}`;
            button.onclick = () => selectAnswer(index, button);
            optionsElement.appendChild(button);
        });

        timeElement.textContent = 50;
        timeElement.style.color = 'black';
        nextButton.style.display = 'none';
        clearInterval(timer);
        timer = setInterval(updateTimer, 1000);
    } else {
        showScore();
    }
}

function updateTimer() {
    const timeElement = document.getElementById('time');
    let timeLeft = parseInt(timeElement.textContent);
    if (timeLeft > 10) {
        timeElement.style.color = '#ffffff';
    } else {
        timeElement.style.color = 'red';
    }
    if (timeLeft > 0) {
        timeElement.textContent = timeLeft - 1;
    } else {
        currentQuestion++;
        showQuestion();
    }
}

function selectAnswer(index, button) {
    if (index === questions[currentQuestion].correct) {
        score++;
    }
    const optionsButtons = document.querySelectorAll('#options button');
    optionsButtons.forEach(btn => {
        btn.classList.add('disabled');
        btn.onclick = null; // Make other options unclickable
    });
    button.classList.remove('disabled');
    button.classList.add('selected'); // Highlight the selected option
    const nextButton = document.getElementById('next-button');
    nextButton.style.display = 'block'; // Show the "Next" button when an option is clicked
}

function showScore() {
    const quizContainer = document.getElementById('quiz-container');
    const scoreContainer = document.getElementById('score-container');

    quizContainer.style.display = 'none';
    scoreDiv.style.display = "block";
    
    const averageScore = questions.length / 2;
    let message = '';
    if (score > averageScore) {
        message = '<p>Congratulations! 🎉 You did a fantastic job!</p>';
    } else {
        message = '<p>Good effort! 💪 Keep practicing and you\'ll get there!</p>';
    }

    scoreContainer.innerHTML = `
        <h2>Your Score: ${score}/${questions.length}</h2>
        ${message}
    `;
}

document.getElementById('next-button').addEventListener('click', () => {
    currentQuestion++;
    showQuestion();
});

showQuestion();