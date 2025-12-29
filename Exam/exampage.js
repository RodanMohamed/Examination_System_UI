// ---------------- exam Access Control ----------------
(function () {

    if (
        localStorage.getItem("examSubmitted") === "true" ||
        localStorage.getItem("examTimeOut") === "true"
    ) {
        alert("You have already finished this exam.");
        window.location.replace("/Examination_System_UI/Login/login.html");
        return;
    }

    var examStarted = localStorage.getItem("examStarted");
    var hasSavedState =
        localStorage.getItem("remainingTime") !== null ||
        localStorage.getItem("savedAnswers") !== null;

    if (examStarted === "true" && !hasSavedState) {
        alert("You cannot re-enter the exam.");
        window.location.replace("/Examination_System_UI/Login/login.html");
        return;
    }

    localStorage.setItem("examStarted", "true");

})();


// ---------------- Restore Exam State ----------------

function saveExamState() {
        var marked = [];

    for (var i = 0; i < gridPalette.length; i++) {
        marked.push(gridPalette[i].dataset.marked === "true");
    }
    localStorage.setItem("savedAnswers", JSON.stringify(answers));
    localStorage.setItem("currentQuestion", counter);
    localStorage.setItem("remainingTime", remainingTime);
    localStorage.setItem("markedQuestions", JSON.stringify(marked));
}

// ---------------- Questions -----------------
var questionObject = [
    { question: "JavaScript is primarily used for?", options: ["Styling web pages", "Adding interactivity to web pages", "Database management", "Server hardware management"] },
    { question: "Which symbol is used for comments in JavaScript?", options: ["//", "/* */", "#", "<!-- -->"] },
    { question: "Which of the following is a JavaScript data type?", options: ["Number", "String", "Boolean", "All of the above"] },
    { question: "Which method is used to log output to the console?", options: ["print()", "console.log()", "alert()", "document.write()"] },
    { question: "What keyword is used to declare a variable in ES6?", options: ["var", "let", "const", "All of the above"] },
    { question: "Which operator is used for strict equality comparison?", options: ["==", "===", "=", "!=="] },
    { question: "How do you create a function in JavaScript?", options: ["function myFunc() {}", "func myFunc() {}", "def myFunc() {}", "function:myFunc()"] },
    { question: "Which event occurs when a user clicks on an HTML element?", options: ["onmouseover", "onchange", "onclick", "onkeypress"] },
    { question: "Which of the following is a JavaScript framework?", options: ["React", "Laravel", "Django", "Ruby on Rails"] },
    { question: "How do you declare an array in JavaScript?", options: ["let arr = [];", "let arr = ();", "let arr = {};", "let arr = <>;"] }
];

var correctAnswers = [1, 0, 3, 1, 3, 1, 0, 2, 0, 0];

var submitBtn = document.querySelector(".sbtn");
var counter = 0;
var nextButton = document.getElementById("next");
var previousButton = document.getElementById("prev");
var markButton = document.querySelector(".mark-button");
var gridPalette = document.querySelectorAll(".grid-palette .qbtn");
var optionInputs = document.querySelectorAll(".option input");

// answers array (instead of fill)
var answers = [];
for (var i = 0; i < questionObject.length; i++) {
    answers.push(null);
}

// ---------------- Restore Exam State (CORRECT PLACE) ----------------
var savedAnswers = localStorage.getItem("savedAnswers");
var savedCounter = localStorage.getItem("currentQuestion");

if (savedAnswers) {
    var parsedAnswers = JSON.parse(savedAnswers);

    for (var i = 0; i < parsedAnswers.length; i++) {
        answers[i] = parsedAnswers[i];
    }
}

if (savedCounter !== null) {
    counter = parseInt(savedCounter, 10);
}
var savedMarked = localStorage.getItem("markedQuestions");

if (savedMarked) {
    var markedArr = JSON.parse(savedMarked);

    for (var i = 0; i < markedArr.length; i++) {
        gridPalette[i].dataset.marked = markedArr[i] ? "true" : "false";
    }
}
// ---------------- Shuffle Questions -----------------
function shuffleQuestions(questions, answersArr) {
    var i, j, tempQ, tempA;

    for (i = questions.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));

        tempQ = questions[i];
        questions[i] = questions[j];
        questions[j] = tempQ;

        tempA = answersArr[i];
        answersArr[i] = answersArr[j];
        answersArr[j] = tempA;
    }
}

if (!localStorage.getItem("questionsShuffled")) {
    shuffleQuestions(questionObject, correctAnswers);
    localStorage.setItem("questionsShuffled", "true");
}

showQuestion();
updatePaletteStatus();

// ---------------- Show Question -----------------
function showQuestion() {
    if (counter < questionObject.length) {
        document.getElementById("question-header").innerText =
            questionObject[counter].question;

        var options = document.querySelectorAll(".option .option-text");

        for (var i = 0; i < optionInputs.length; i++) {
            optionInputs[i].checked = false;
        }

        for (var j = 0; j < options.length; j++) {
            options[j].innerText = questionObject[counter].options[j];
        }

        if (answers[counter] !== null) {
            optionInputs[answers[counter]].checked = true;
        }

        var markText = markButton.lastChild;
        if (gridPalette[counter].dataset.marked === "true") {
            markText.textContent = "Unmark Question";
            markButton.style.background = "#ffdf20";
        } else {
            markText.textContent = "Mark Question";
            markButton.style.background = "";
        }

        updatePaletteStatus();
    }

    previousButton.style.visibility = counter === 0 ? "hidden" : "visible";
    nextButton.style.visibility = counter === 9 ? "hidden" : "visible";
}

// ---------------- Palette -----------------
function updatePaletteStatus() {
    for (var i = 0; i < gridPalette.length; i++) {
        var btn = gridPalette[i];

        btn.classList.remove(
            "bg-blue-600",
            "bg-green-400",
            "bg-yellow-300",
            "text-white"
        );

        if (btn.dataset.marked === "true") {
            btn.classList.add("bg-yellow-300");
        }

        if (answers[i] !== null) {
            btn.classList.add("bg-green-400");
        }

        if (i === counter) {
            btn.classList.remove("bg-green-400");
            btn.classList.add("bg-blue-600", "text-white");
        }
    }
}

// ---------------- Navigation -----------------
nextButton.addEventListener("click", function () {
    if (counter < questionObject.length - 1) {
        counter++;
        saveExamState();

        showQuestion();
        
    }
});

previousButton.addEventListener("click", function () {
    if (counter > 0) {
        counter--;
        saveExamState();
        showQuestion();
    }
});

markButton.addEventListener("click", function () {
    if (gridPalette[counter].dataset.marked === "true") {
        gridPalette[counter].dataset.marked = "false";
        this.lastChild.textContent = "Mark Question";
        this.style.background = "";
    } else {
        gridPalette[counter].dataset.marked = "true";
        this.lastChild.textContent = "Unmark Question";
        this.style.background = "#ffdf20";
    }
    saveExamState();  
    updatePaletteStatus();
});


for (var i = 0; i < gridPalette.length; i++) {
    (function (index) {
        gridPalette[index].addEventListener("click", function () {
            counter = index;
            showQuestion();
        });
    })(i);
}

for (var i = 0; i < optionInputs.length; i++) {
    (function (index) {
        optionInputs[index].addEventListener("change", function () {
            answers[counter] = index;
            saveExamState();
            updatePaletteStatus();
        });
    })(i);
}

// ---------------- Submit Exam -----------------
function submitExam(autoSubmit) {
    if (autoSubmit === undefined) {
        autoSubmit = false;
    }

    var score = 0;
    var answeredCount = 0;

    for (var i = 0; i < questionObject.length; i++) {
        if (answers[i] !== null) answeredCount++;
        if (answers[i] === correctAnswers[i]) score++;
    }

    localStorage.setItem("examScore", score);
    localStorage.setItem("totalQuestions", questionObject.length);
    localStorage.setItem("userAnswers", JSON.stringify(answers));
    localStorage.setItem("correctAnswers", JSON.stringify(correctAnswers));
    localStorage.setItem("answeredCount", answeredCount);
    localStorage.setItem("examSubmitted", "true");
    //localStorage.removeItem("examStarted"); // release lock
    localStorage.removeItem("savedAnswers");
    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("remainingTime");
    localStorage.setItem("examSubmitted", "true");
    localStorage.removeItem("examStarted");
    localStorage.removeItem("markedQuestions");
    


    if (!autoSubmit) {
        alert("Exam submitted successfully!");
    }

    window.location.href = "/Examination_System_UI/Result/result.html";
}

submitBtn.addEventListener("click", function () {
    if (answers.indexOf(null) !== -1) {
        if (!confirm("You still have unanswered questions. Submit anyway?")) {
            return;
        }
    }
    submitExam();
    TOTAL_TIME=30*60;
});

// ---------------- Countdown -----------------
window.addEventListener("DOMContentLoaded", function () {
    var minutesEl = document.getElementById("minutes");
    var secondsEl = document.getElementById("seconds");
    var rangeEl = document.querySelector("input[type='range']");

    var TOTAL_TIME = 30 * 60;
    remainingTime = localStorage.getItem("remainingTime");

    if (remainingTime === null) {
        remainingTime = TOTAL_TIME;
    } else {
        remainingTime = parseInt(remainingTime, 10);
    }


    var timer = setInterval(function () {

    var minutes = Math.floor(remainingTime / 60);
    var seconds = remainingTime % 60;

    minutesEl.style.setProperty("--value", minutes);
    secondsEl.style.setProperty("--value", seconds);

    var usedTime = TOTAL_TIME - remainingTime;
    var progressPercent = Math.floor((usedTime / TOTAL_TIME) * 100);
    rangeEl.value = progressPercent;

    if (remainingTime <= 0) {
        clearInterval(timer);

        localStorage.setItem("examTimeOut", "true");
        localStorage.removeItem("examStarted");

        submitExam(true);
        window.location.replace("../TimeOut/timeout.html");
        return;
    }

    remainingTime--;

    // 🔐 SAVE TIME EVERY SECOND
    localStorage.setItem("remainingTime", remainingTime);

}, 1000);

});
