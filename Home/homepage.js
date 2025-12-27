
document.getElementById("logoutbtn").addEventListener("click", function () {
    var currentUser = JSON.parse(localStorage.getItem("loginUser"));
    var errorPara = document.getElementById("startExamError");

    if (currentUser) {
        errorPara.textContent = "";
        window.location.href = "/Examination_System_UI/Exam/exampage.html";
    } else {
        errorPara.textContent = "Error: You must log in before starting the exam!";
    }
});


var logoutBtn = document.getElementById("logoutbtn");

if (localStorage.getItem("loginUser")) {
    logoutBtn.style.display = "inline-block";
} else {
    logoutBtn.style.display = "none";
}

// logoutBtn.addEventListener("click", function () {

//     localStorage.removeItem("currentUser");

//     window.location.href = "homepage2.html";
// });

logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("loginUser"); 
    window.location.href = "/Examination_System_UI/Login/login.html"; 
});

