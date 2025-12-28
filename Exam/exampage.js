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

var answers = new Array(questionObject.length).fill(null);
var optionInputs = document.querySelectorAll(".option input");

// ---------------- Show Question -----------------
function showQuestion() {
    if (counter < questionObject.length) {
        document.getElementById("question-header").innerText =
            questionObject[counter].question;

        var options = document.querySelectorAll(".option .option-text");
        optionInputs.forEach(input => input.checked = false);

        for (let i = 0; i < options.length; i++) {
            options[i].innerText = questionObject[counter].options[i];
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
}

showQuestion();

// ---------------- Palette & Navigation -----------------
function updateCurrentPalette() {
    gridPalette.forEach((btn, index) => {
        btn.classList.remove("bg-blue-600", "text-white");
        if (index === counter) {
            btn.classList.add("bg-blue-600", "text-white");
        }
    });
}

function updatePaletteStatus() {
    gridPalette.forEach((btn, index) => {
        btn.classList.remove(
            "bg-blue-600",
            "bg-green-400",
            "bg-yellow-300",
            "text-white"
        );


        if (btn.dataset.marked === "true") {
            btn.classList.add("bg-yellow-300");
        }


        if (answers[index] !== null) {
            btn.classList.add("bg-green-400");
        }


        if (index === counter) {
            btn.classList.remove("bg-green-400");
            btn.classList.add("bg-blue-600", "text-white");
        }
    });
}

nextButton.addEventListener("click", function () {
    if (counter < questionObject.length - 1) {
        counter++;
        showQuestion();
    }
});
previousButton.addEventListener("click", function () {
    if (counter > 0) {
        counter--;
        showQuestion();
    }
});
markButton.addEventListener("click", function () {

    if (gridPalette[counter].dataset.marked === "true") {
        gridPalette[counter].dataset.marked = "false";
        this.lastChild.textContent = "Mark Question";
        markButton.style.background = "";
    } else {
        gridPalette[counter].dataset.marked = "true";
        this.lastChild.textContent = "Unmark Question";
        markButton.style.background = "#ffdf20";
    }
    updatePaletteStatus();
});


gridPalette.forEach((btn, index) => {
    btn.addEventListener("click", function () {
        counter = index;
        showQuestion();
    });
});

optionInputs.forEach((input, index) => {
    input.addEventListener("change", function () {
        answers[counter] = index;
        updatePaletteStatus(); // green appears immediately
    });
});
///////////////////////////////////submit exam///////////////////////////////////////////////
function submitExam(autoSubmit = false) {
    let score = 0;

    for (let i = 0; i < questionObject.length; i++) {
        if (answers[i] === correctAnswers[i]) {
            score++;
        }
    }

    //////////////// /////////////store result for result page////////////////////////////////
    localStorage.setItem("examScore", score);
    localStorage.setItem("totalQuestions", questionObject.length);
    localStorage.setItem("userAnswers", JSON.stringify(answers));
    localStorage.setItem("correctAnswers", JSON.stringify(correctAnswers));
    localStorage.setItem("answeredCount", answers.filter(a => a !== null).length);


    if (!autoSubmit) {
        alert("Exam submitted successfully!");
    }

    window.location.href = "/Examination_System_UI/Result/result.html";
}
submitBtn.addEventListener("click", function () {
    if (answers.includes(null)) {
        if (!confirm("You still have unanswered questions. Submit anyway?")) {
            return;
        }
    }
    submitExam();
});

// ---------------- Countdown -----------------
window.addEventListener("DOMContentLoaded", function () {
    var minutesEl = document.getElementById("minutes");
    var secondsEl = document.getElementById("seconds");
    var rangeEl = document.querySelector("input[type='range']");

    var TOTAL_TIME = 30 * 60;
    var remainingTime = TOTAL_TIME;

    function startCountdown() {
        var timer = setInterval(function () {
            var minutes = Math.floor(remainingTime / 60);
            var seconds = remainingTime % 60;

            minutesEl.style.setProperty("--value", minutes);
            secondsEl.style.setProperty("--value", seconds);

            var usedTime = TOTAL_TIME - remainingTime;
            var progressPercent = Math.floor((usedTime / TOTAL_TIME) * 100);
            rangeEl.value = progressPercent;

            if (progressPercent >= 90) {
                rangeEl.style.setProperty("--range-bg", "red");
                rangeEl.style.setProperty("--range-thumb", "red");
            }

            if (remainingTime <= 0) {
                clearInterval(timer);
                alert("Time is up! Exam submitted.");
                submitExam(true);
                window.location.replace("../TimeOut/timeout.html");
                return;
            }

            remainingTime--;
        }, 1000);
    }

    startCountdown();
});