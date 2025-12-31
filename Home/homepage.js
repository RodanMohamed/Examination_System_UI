const logoutBtns = document.querySelectorAll(".logoutbtn");
logoutBtns.forEach(btn => {
    // btn.style.display = localStorage.getItem("loginUser")
    //     ? "inline-block"
    //     : "none";

    btn.addEventListener("click", () => {
        localStorage.removeItem("loginUser");
        localStorage.removeItem("answeredCount");
        localStorage.removeItem("correctAnswers");
        localStorage.removeItem("examScore");
        localStorage.removeItem("questionsShuffled");
        localStorage.removeItem("remainingTime");
        localStorage.removeItem("totalQuestions");
        localStorage.removeItem("userAnswers");


        window.location.href = "/Examination_System_UI/Login/login.html";
        localStorage.removeItem("savedAnswers");
         localStorage.removeItem("currentQuestion");
        localStorage.removeItem("remainingTime");
        localStorage.removeItem("markedQuestions");
        localStorage.removeItem("examScore");
        localStorage.removeItem("userAnswers");
        localStorage.removeItem("questionsShuffled");
    });
});


const startExamBtn = document.querySelector("#startExamBtn");
const startExamError = document.querySelector("#startExamError");

if (startExamBtn) {
    startExamBtn.addEventListener("click", () => {
        const currentUser = JSON.parse(localStorage.getItem("loginUser"));

        if (currentUser) {
            startExamError.textContent = "";
            window.location.href = "/Examination_System_UI/Exam/exampage.html";
        } else {
            startExamError.textContent =
                "Error: You must log in before starting the exam!";
        }
    });
}


/*-------------------------Counters-----------------------------*/

const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {
    const target = +counter.dataset.target;
    let current = 0;
    const speed = 120;

    const text = counter.innerText;

    const isK = text.includes("K");
    const isPlus = text.includes("+");
    const isPercent = text.includes("%");
    const isSlash = text.includes("/");

    function formatNumber(value) {
        if (isK) return Math.ceil(value / 1000) + "K+";
        if (isPercent) return Math.ceil(value) + "%";
        if (isSlash) return Math.ceil(value) + "/7";
        if (isPlus) return Math.ceil(value) + "+";
        return Math.ceil(value);
    }

    function update() {
        const increment = target / speed;

        if (current < target) {
            current += increment;
            counter.innerText = formatNumber(current);
            requestAnimationFrame(update);
        } else {
            counter.innerText = formatNumber(target);
        }
    }

    update();
}


const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.6
});

counters.forEach(counter => observer.observe(counter));
