var questionObject = [
    {
        question: "JavaScript is primarily used for?",
        options: ["Styling web pages", "Adding interactivity to web pages", "Database management", "Server hardware management"]
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "/* */", "#", "<!-- -->"]
    },
    {
        question: "Which of the following is a JavaScript data type?",
        options: ["Number", "String", "Boolean", "All of the above"]
    },
    {
        question: "Which method is used to log output to the console?",
        options: ["print()", "console.log()", "alert()", "document.write()"]
    },
    {
        question: "What keyword is used to declare a variable in ES6?",
        options: ["var", "let", "const", "All of the above"]
    },
    {
        question: "Which operator is used for strict equality comparison?",
        options: ["==", "===", "=", "!=="]
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function myFunc() {}", "func myFunc() {}", "def myFunc() {}", "function:myFunc()"]
    },
    {
        question: "Which event occurs when a user clicks on an HTML element?",
        options: ["onmouseover", "onchange", "onclick", "onkeypress"]
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: ["React", "Laravel", "Django", "Ruby on Rails"]
    },
    {
        question: "How do you declare an array in JavaScript?",
        options: ["let arr = [];", "let arr = ();", "let arr = {};", "let arr = <>;"]
    }
];

var nextButton = document.getElementById("next");
var previousButton = document.getElementById("prev");
var markButton = document.querySelector(".mark-button");
var gridPalette = document.querySelectorAll(".grid-palette .qbtn");

var counter = 0;
function showQuestion() {
    if (counter < questionObject.length) {
        document.getElementById("question-header").innerText = questionObject[counter].question;

        var options = document.querySelectorAll(".option .option-text");
        for (let i = 0; i < options.length; i++) {
            options[i].innerText = questionObject[counter].options[i];
        }
    }
}

showQuestion();

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
    gridPalette[counter].style.backgroundColor = "#ffdf20";
});



