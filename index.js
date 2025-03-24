const questions = [
    {
        'que': "Which of the following is a markup language?",
        'a': 'HTML',
        'b': 'CSS',
        'c': 'JS',
        'd': 'PHP',
        'correct': 'a'
    },
    {
        'que': "When was JS launched?",
        'a': '1996',
        'b': '1995',
        'c': '1994',
        'd': 'None of the above',
        'correct': 'b'
    },
    {
        'que': "What does CSS stand for?",
        'a': 'Hyper Text Markup Language',
        'b': 'Cascading Style Sheets',
        'c': 'JavaScript',
        'd': 'JSON Object Notation',
        'correct': 'b'
    }
];

const queBox = document.getElementById('queBox');
const optionInputs = document.querySelectorAll('.options');
const submitBtn = document.querySelector('.btn');

const timerContainer = document.createElement('div');
timerContainer.style.display = 'flex';
timerContainer.style.justifyContent = 'space-between';
timerContainer.style.marginBottom = '10px';

timerContainer.innerHTML = `<p id="questionTimeDisplay">Time Left: 15s</p><p id="totalTimeDisplay">Total Time: 0s</p>`;
document.getElementById('box').prepend(timerContainer);

let index = 0;
let total = questions.length;
let right = 0, wrong = 0;
let questionTimer = 15;
let totalTime = 0;
let questionTimerInterval, totalTimerInterval;

const startQuizTimer = () => {
    totalTimerInterval = setInterval(() => {
        totalTime++;
        document.getElementById('totalTimeDisplay').innerText = `Total Time: ${totalTime}s`;
    }, 1000);
};

const startQuestionTimer = () => {
    clearInterval(questionTimerInterval);
    questionTimer = 15;
    document.getElementById('questionTimeDisplay').innerText = `Time Left: ${questionTimer}s`;
    
    questionTimerInterval = setInterval(() => {
        questionTimer--;
        document.getElementById('questionTimeDisplay').innerText = `Time Left: ${questionTimer}s`;
        
        if (questionTimer === 0) {
            submitQuiz();
        }
    }, 1000);
};

const loadQuestion = () => {
    if (index === total) {
        return endQuiz();
    } else {
        reset();
    }
    
    const data = questions[index];
    queBox.innerText = `${index + 1}) ${data.que}`;
    optionInputs[0].nextElementSibling.innerText = data.a;
    optionInputs[1].nextElementSibling.innerText = data.b;
    optionInputs[2].nextElementSibling.innerText = data.c;
    optionInputs[3].nextElementSibling.innerText = data.d;
    
    startQuestionTimer();
};

const submitQuiz = () => {
    const data = questions[index];
    const ans = getAnswer();
    if (ans === data.correct) {
        right++;
    } else {
        wrong++;
    }
    index++;
    loadQuestion();
};

const getAnswer = () => {
    let answer;
    optionInputs.forEach((input) => {
        if (input.checked) {
            answer = input.value;
        }
    });
    return answer;
};

const reset = () => {
    optionInputs.forEach((input) => {
        input.checked = false;
    });
};

const endQuiz = () => {
    clearInterval(totalTimerInterval);
    clearInterval(questionTimerInterval);
    document.getElementById('box').innerHTML = `
        <h3>Thank you for playing the quiz</h3>
        <h2>${right}/${total} correct</h2>
        <p>Total Time: ${totalTime} seconds</p>
    `;
};

submitBtn.addEventListener('click', submitQuiz);

startQuizTimer();
loadQuestion();
