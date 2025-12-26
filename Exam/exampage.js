window.addEventListener("DOMContentLoaded", () => {

    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    
    const rangeEl = document.querySelector("input[type='range']");

    const TOTAL_TIME = 30 * 60; // 30 minutes in seconds
    let remainingTime = TOTAL_TIME;

    function startCountdown() {
        const timer = setInterval(() => {

            let minutes = Math.floor(remainingTime / 60);
            let seconds = remainingTime % 60;

            minutesEl.style.setProperty("--value", minutes);
            secondsEl.style.setProperty("--value", seconds);

            let usedTime = TOTAL_TIME - remainingTime;
            let progressPercent = Math.floor((usedTime / TOTAL_TIME) * 100);

            rangeEl.value = progressPercent;


            if (progressPercent >= 90) {
                rangeEl.style.setProperty("--range-bg", "red");
                rangeEl.style.setProperty("--range-thumb", "red");
            }


            if (remainingTime <= 0) {
                clearInterval(timer);
                alert("Time is up! Exam submitted.");
                return;
            }

            remainingTime--;

        }, 1000);
    }
<<<<<<< HEAD
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


=======
>>>>>>> 9ddff9a65e4f4491b9fcc583ce268c972ccfec53

    startCountdown();
});
