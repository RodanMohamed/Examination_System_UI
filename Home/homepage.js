const logoutBtns = document.querySelectorAll(".logoutbtn");
logoutBtns.forEach(btn => {
    btn.style.display = localStorage.getItem("loginUser")
        ? "inline-block"
        : "none";

    btn.addEventListener("click", () => {
        localStorage.removeItem("loginUser");
        window.location.href = "/Examination_System_UI/Login/login.html";
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