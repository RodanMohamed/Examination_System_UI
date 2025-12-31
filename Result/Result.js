var studentData = JSON.parse(localStorage.getItem('loginUser')) || 'Student';
var studentName = studentData.firstName;
studentName += " ";
studentName += studentData.lastName;

document.getElementsByClassName('student-name')[0].textContent = studentName;
var totalScore = studentData.score || '0/0';
// document.getElementById('totalScore').textContent = totalScore;
var score = Number(localStorage.getItem("examScore")) || 0;
var totalQuestions = Number(localStorage.getItem("totalQuestions")) || 0;
var answeredCount = Number(localStorage.getItem("answeredCount")) || 0;

var percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
// display percentage
document.getElementById("totalScore").textContent = percentage + "%";
document.getElementById("answeredCount").textContent = answeredCount;

// display correct / total
document.getElementById("correctAnswers").textContent =
    score + "/" + totalQuestions;

var resultMessage = document.getElementById("resultMessage");
var icon = resultMessage.querySelector("img");
var title = resultMessage.querySelector("h1");
var text = resultMessage.querySelector("p");

console.log(resultMessage);

document.getElementById("homeBtn").addEventListener("click", function () {
    localStorage.removeItem("examScore");
    localStorage.removeItem("totalQuestions");
    localStorage.removeItem("answeredCount");
    localStorage.removeItem("userAnswers");
    localStorage.removeItem("questions");
    localStorage.removeItem("questionsShuffled");
    localStorage.removeItem("loginUser");
    localStorage.removeItem("remainingTime");
    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("savedAnswers");
    localStorage.removeItem("examSubmitted");



    window.location.href = "../Login/login.html";
});


if (percentage < 50) {
    resultMessage.style.backgroundColor = "#960000";
    icon.src = "https://img.icons8.com/cute-clipart/64/delete-sign.png";
    title.innerText = "Unfortunately!";
    text.innerText = "You did not pass the exam. Please try again."
}

