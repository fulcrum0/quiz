const questions = [
    {
        question: "The Dark Web can only be accessed with special software like Tor.",
        type: "truefalse",
        options: ["True", "False"],
        answer: "True"
    },
    {
        question: "What is the primary purpose of the Dark Web?",
        type: "mcq",
        options: [
            "a) Hosting online shopping sites",
            "b) Facilitating illegal and anonymous activities",
            "c) Promoting digital art communities",
            "d) Sharing educational resources"
        ],
        answer: "b) Facilitating illegal and anonymous activities"
    },
    {
        question: "Can cybercrime affect small businesses as severely as large corporations?",
        type: "yesno",
        options: ["Yes", "No"],
        answer: "Yes"
    },
    {
        question: "Which of these is NOT a risk associated with the Internet of Things (IoT)?",
        type: "mcq",
        options: [
            "a) Privacy invasion",
            "b) Reduced electricity bills",
            "c) Data theft",
            "d) Remote access vulnerabilities"
        ],
        answer: "b) Reduced electricity bills"
    },
    {
        question: "Phishing attacks are the most common form of cybercrime.",
        type: "truefalse",
        options: ["True", "False"],
        answer: "True"
    },
    {
        question: "What role do ethical hackers play in combatting cybercrime?",
        type: "mcq",
        options: [
            "a) Developing viruses",
            "b) Identifying vulnerabilities",
            "c) Promoting illegal activities",
            "d) Hiding their tracks online"
        ],
        answer: "b) Identifying vulnerabilities"
    },
    {
        question: "Is ransomware a type of malware?",
        type: "yesno",
        options: ["Yes", "No"],
        answer: "Yes"
    },
    {
        question: "Which of the following is a sign of a phishing email?",
        type: "mcq",
        options: [
            "a) Generic greetings like \"Dear Customer\"",
            "b) A sender address that matches the company",
            "c) Perfect grammar and spelling",
            "d) No links included in the email"
        ],
        answer: "a) Generic greetings like \"Dear Customer\""
    },
    {
        question: "The Deep Web and the Dark Web are the same.",
        type: "truefalse",
        options: ["True", "False"],
        answer: "False"
    },
    {
        question: "Are IoT devices vulnerable to cyberattacks due to poor security measures?",
        type: "yesno",
        options: ["Yes", "No"],
        answer: "Yes"
    },
    {
        question: "Which of these is NOT a precaution to avoid cybercrime?",
        type: "mcq",
        options: [
            "a) Using strong passwords",
            "b) Avoiding public Wi-Fi",
            "c) Sharing passwords with friends",
            "d) Keeping software updated"
        ],
        answer: "c) Sharing passwords with friends"
    },
    {
        question: "Cybercriminals use cryptocurrency for anonymity.",
        type: "truefalse",
        options: ["True", "False"],
        answer: "True"
    },
    {
        question: "Can government agencies track some activities on the Dark Web?",
        type: "yesno",
        options: ["Yes", "No"],
        answer: "Yes"
    },
    {
        question: "Which industry is most targeted by cybercriminals?",
        type: "mcq",
        options: [
            "a) Retail",
            "b) Healthcare",
            "c) Education",
            "d) Financial services"
        ],
        answer: "d) Financial services"
    },
    {
        question: "The fight against cybercrime requires collaboration between private companies and law enforcement.",
        type: "truefalse",
        options: ["True", "False"],
        answer: "True"
    }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
    document.getElementById('quiz-container').innerHTML = `
                <div id="question-area"></div>
                <div id="options-area"></div>
                <div id="feedback-area"></div>
                <button id="next-btn" class="hidden" onclick="nextQuestion()">Next</button>
                <div class="score" id="score-area"></div>
            `;
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question-area').innerHTML = `<h2>Question ${currentQuestion + 1} of ${questions.length}</h2><p>${q.question}</p>`;
    const optionsArea = document.getElementById('options-area');
    optionsArea.innerHTML = '';
    q.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => selectOption(option);
        optionsArea.appendChild(btn);
    });
    document.getElementById('feedback-area').innerHTML = '';
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('score-area').textContent = `Score: ${score}`;
}

function selectOption(selected) {
    const q = questions[currentQuestion];
    const isCorrect = selected === q.answer;
    if (isCorrect) score++;
    document.getElementById('feedback-area').innerHTML = isCorrect
        ? '<span style="color:#00b894;">Correct!</span>'
        : `<span style="color:#e17055;">Incorrect!</span> <br>Correct answer: <b>${q.answer}</b>`;
    // Disable all option buttons
    Array.from(document.getElementsByClassName('option-btn')).forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === q.answer) {
            btn.style.background = '#00b894';
        } else if (btn.textContent === selected && !isCorrect) {
            btn.style.background = '#e17055';
        }
    });
    document.getElementById('next-btn').classList.remove('hidden');
    document.getElementById('score-area').textContent = `Score: ${score}`;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-container').innerHTML = `
                <h2>Quiz Complete!</h2>
                <div class="score">Your Score: ${score} / ${questions.length}</div>
                <button onclick="startQuiz()">Try Again</button>
            `;
}