// Start Exam button logic
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

// Logout button logic
var logoutBtn = document.getElementById("logoutBtn");

// Show logout if user is logged in
if (localStorage.getItem("currentUser")) {
    logoutBtn.style.display = "inline-block";
}

logoutBtn.addEventListener("click", function() {
    // Remove logged-in user
    localStorage.removeItem("currentUser");
    // Optionally redirect to login page
    window.location.href = "homepage.html";
});

