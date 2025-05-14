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
    },
    {
        question: "Quand est né Luidji ?",
        choices: ["21 janvier 1992", "22 janvier 1991", "22 juillet 1991"],
        correct: 1
    },
    {
        question: "Complète : 'J’la trouve moins belle que la veille, moins belle que la veille, elle est toujours belle...'",
        choices: ["mais pas pareille", "juste moins belle que la veille", "quand elle me surveille"],
        correct: 1
    },
    {
        question: "Complète : 'Les semaines passent et je suis, rongé par mes torts, rongé par...'",
        choices: ["le remord", "le décor", "son regard"],
        correct: 0
    },
    {
        question: "Complète : 'J'nage dans les foufounes, marée haute, marée basse / Quatre culs dans la chambre...'",
        choices: [
            "j'cherche encore mon as", 
            "j’ai mon carré d'as", 
            "j’ai cassé les glaces"
        ],
        correct: 1
    },
    {
        question: "Complète : 'Avec elles j'fais le mec busy, elles ont le cœur sur la main / Mais la main...'",
        choices: [
            "sur ma main", 
            "sur trop de zizis", 
            "sur mon destin"
        ],
        correct: 1
    },        
];

let score = 0;
let currentQuestionIndex = 0;
let usedQuestions = [];
let isQuizOver = false; // Ajout d'un flag pour savoir si le quiz est terminé

function showIntro() {
    const questionContainer = document.getElementById("question-container");
    const nextButton = document.getElementById("next-button");
    const feedback = document.getElementById("feedback");
    document.getElementById("score-container").style.display = "none";

    questionContainer.innerHTML = `
        <h2>LuidjiGames - Quiz</h2>
        <p class="intro-desc">
            Teste tes connaissances sur Luidji avec ce quiz exclusif.
        </p>
        <h3>Règles du jeu :</h3>
        <ul class="rules">
            <li>Le quiz contient 5 questions sélectionnées aléatoirement.</li>
            <li>Une seule réponse possible par question.</li>
            <li>Tu vois immédiatement si ta réponse est bonne ou mauvaise.</li>
            <li>À la fin, tu découvriras ton score sur 5.</li>
        </ul>
        <button id="start-button" class="start-btn">Commencer le quiz</button>
    `;

    feedback.innerText = "";
    nextButton.style.display = "none";

    // Ajouter un bouton pour démarrer le quiz
    const startBtn = document.getElementById("start-button");
    startBtn.onclick = () => {
        nextButton.style.display = "inline-block";
        startQuiz();
    };
}

function startQuiz() {
    score = 0;  // Réinitialiser le score
    currentQuestionIndex = 0; // Réinitialiser l'index des questions
    usedQuestions = []; // Réinitialiser les questions utilisées
    isQuizOver = false;  // Réinitialiser le flag de fin de quiz
    document.getElementById("score").innerText = score;
    document.getElementById("next-button").innerText = "Suivant";
    loadQuestion();
    document.getElementById("score-container").style.display = "block";
}

function loadQuestion() {
    if (usedQuestions.length >= 5) {
        displayFinalScore();
        return;
    }

    document.getElementById("feedback").innerText = "";
    document.getElementById("feedback").className = "";
    document.getElementById("feedback").innerText = "";

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

    const feedback = document.getElementById("feedback");

    if (selectedIndex === correctIndex) {
        choiceElement.classList.add("correct");
        score++;
        feedback.innerText = "Bonne réponse";
        feedback.className = "feedback good";
    } else {
        choiceElement.classList.add("incorrect");
        feedback.innerText = "Mauvaise réponse";
        feedback.className = "feedback bad";
    }

    document.getElementById("score").innerText = score;
    document.getElementById("next-button").disabled = false;
}

function nextQuestion() {
    if (isQuizOver) {
        restartQuiz(); // Si le quiz est terminé, on redémarre
    } else {
        loadQuestion(); // Sinon, on charge une nouvelle question
    }
}

function displayFinalScore() {
    isQuizOver = true;
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `
        <h2>Vous avez répondu à 5 questions !</h2>
        <p>Score final : ${score}/5</p>
    `;

    const nextButton = document.getElementById("next-button");
    nextButton.innerText = "Rejouer";
    nextButton.disabled = false;

    // Très important : au lieu de changer juste le texte, on remet un nouveau comportement au bouton
    nextButton.onclick = () => {
        restartQuiz();
        nextButton.innerText = "Suivant";
        nextButton.onclick = nextQuestion; // remettre le comportement normal
    };

    // Ajouter le bouton retour au menu
    const menuButton = document.createElement("button");
    menuButton.innerText = "Retour au menu";
    menuButton.onclick = () => {
        window.location.href = "https://robin0u.github.io/LuidjiActus/";
    };
    menuButton.style.marginTop = "10px";
    menuButton.style.backgroundColor = "#333";
    menuButton.style.color = "white";
    menuButton.style.border = "none";
    menuButton.style.padding = "10px 20px";
    menuButton.style.borderRadius = "5px";
    menuButton.style.cursor = "pointer";

    questionContainer.appendChild(menuButton);

    document.getElementById("feedback").innerText = "";
}


function restartQuiz() {
    // Réinitialisation complète du jeu
    score = 0;
    currentQuestionIndex = 0;
    usedQuestions = [];
    isQuizOver = false; // Réinitialiser le flag de fin de quiz
    document.getElementById("score").innerText = score;
    document.getElementById("next-button").innerText = "Suivant";
    loadQuestion();
}

window.onload = () => {
    showIntro();

    const nextButton = document.getElementById("next-button");
    nextButton.onclick = nextQuestion;
};

