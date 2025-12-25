var studentName = localStorage.getItem('currentUser') || 'Student';
document.getElementsByClassName('student-name')[0].textContent = studentName;
var totalScore = localStorage.getItem('totalScore') || '0/0';
document.getElementById('totalScore').textContent = totalScore;
document.getElementById('correctAnswers').textContent = localStorage.getItem('correctAnswers') || '0/0';

document.getElementById("homeBtn").addEventListener("click", function () {
    window.location.href = "../Login/login.html";
});

window.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "../Login/login.html";
});

if (localStorage.getItem("examFinished") === "true") {
    window.location.href = "../Result/result.html";
}