
document.getElementById("btn").addEventListener("click", function() {
    var currentUser = localStorage.getItem("currentUser");
    var errorPara = document.getElementById("startExamError");

    if (currentUser) {
        errorPara.textContent = "";
        window.location.href = "homepage1.html";
    } else {
        errorPara.textContent = "Error: You must log in before starting the exam!";
    }
});


var logoutBtn = document.getElementById("logoutBtn");


if (localStorage.getItem("currentUser")) {
    logoutBtn.style.display = "inline-block";
}

logoutBtn.addEventListener("click", function() {

    localStorage.removeItem("currentUser");

    window.location.href = "homepage.html";
});

