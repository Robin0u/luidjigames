const questions = [
    {
        question: "Dans quelle musique Luidji dit : « Ça s’est fini le 14 et j’avais pas menti baby, toujours pas de Valentine »",
        choices: ["Boscolo Exedra", "Sirène", "Mauvaise nouvelle"],
        correct: 0
    },
    {
        question: "Dans Agoué, Luidji demande au patient depuis combien de temps il a des douleurs. Il répond :",
        choices: ["Depuis septembre 2011", "Depuis novembre 2011", "Depuis décembre 2011"],
        correct: 2
    },
    {
        question: "Dans quel pays l’album Saison 00 a-t-il, en grande partie, été écrit ?",
        choices: ["Portugal", "Brésil", "Mexique"],
        correct: 1
    },
    {
        question: "Qui est Alexis ?",
        choices: ["Un meilleur ami de Luidji", "Un ancien ami à lui", "Il parle de lui-même"],
        correct: 0
    },
    {
        question: "De quelle ville parle Luidji dans Téléfoot ?",
        choices: ["Saint-Denis", "La Courneuve", "Issy-les-Moulineaux"],
        correct: 1
    },
    {
        question: "Dans Saison 1 : qui est Erzulie ?",
        choices: ["Une amie d’enfance de Luidji", "Une divinité vaudou symbolisant l’amour et la tentation", "La productrice de l’album"],
        correct: 1
    },
    {
        question: "En concert, qui fait les backs sur Foufoune Palace et Pour deux âmes solitaires (pt.1 et 1.7) ?",
        choices: ["Billy", "Kerby", "Plae Casi"],
        correct: 1
    },
    {
        question: "En 2024, le Bercy de Luidji a eu lieu le :",
        choices: ["20 novembre", "24 novembre", "26 novembre"],
        correct: 0
    },
    {
        question: "Avant d’être rappeur, Luidji était :",
        choices: ["Routier", "Infirmier", "Au chômage"],
        correct: 1
    },
    {
        question: "Dans la chanson Palace Mafia, que célèbre Luidji ?",
        choices: ["Son premier contrat avec une major", "La fidélité de son entourage et ses succès partagés", "Une histoire d’amour qui a changé sa vie"],
        correct: 1
    },
    {
        question: "Dans Tu le mérites, qu’apprend-on sur la fille au téléphone rose ?",
        choices: ["C’est la sœur de Luidji", "C’est elle qui a fait le voice tag « Foufoune Palace, bonjour »", "On n’apprend rien sur elle"],
        correct: 1
    },
    {
        question: "Quelle est la date de sortie de Tristesse Business : Saison 1 ?",
        choices: ["26 avril 2019", "24 avril 2019", "21 avril 2019"],
        correct: 0
    }
];

let score = 0;
let currentQuestionIndex = 0;
let usedQuestions = [];

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    usedQuestions = [];
    document.getElementById("score").innerText = score;
    document.getElementById("next-button").innerText = "Suivant";
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= 5) {
        displayFinalScore();
        return;
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * questions.length);
    } while (usedQuestions.includes(randomIndex));

    usedQuestions.push(randomIndex);
    const question = questions[randomIndex];

    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `<h2>${question.question}</h2>`;

    question.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("div");
        choiceButton.classList.add("choice");
        choiceButton.innerText = choice;
        choiceButton.onclick = () => selectAnswer(index, question.correct, choiceButton, question.choices);
        questionContainer.appendChild(choiceButton);
    });

    document.getElementById("next-button").disabled = true;
}

function selectAnswer(selectedIndex, correctIndex, choiceElement, choices) {
    const choiceButtons = document.querySelectorAll('.choice');
    choiceButtons.forEach(button => button.onclick = null);

    if (selectedIndex === correctIndex) {
        choiceElement.classList.add("correct");
        score++;
    } else {
        choiceElement.classList.add("incorrect");
    }

    document.getElementById("score").innerText = score;
    document.getElementById("next-button").disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById("next-button").disabled = true;
    loadQuestion();
}

function displayFinalScore() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `<h2>Vous avez répondu à 5 questions !</h2><p>Score final : ${score}/5</p>`;

    const nextButton = document.getElementById("next-button");
    nextButton.innerText = "Rejouer";
    nextButton.disabled = false;
    nextButton.onclick = restartQuiz;
}

function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    usedQuestions = [];
    document.getElementById("score").innerText = score;
    document.getElementById("next-button").innerText = "Suivant";
    loadQuestion();
}

window.onload = startQuiz;
