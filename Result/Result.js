var studentData = JSON.parse(localStorage.getItem('loginUser')) || 'Student';
var studentName = studentData.firstName;
studentName += " ";
studentName += studentData.lastName;

document.getElementsByClassName('student-name')[0].textContent = studentName;
var totalScore = studentData.score || '0/0';
document.getElementById('totalScore').textContent = totalScore;

var resultMessage = document.getElementById("resultMessage");
var icon = resultMessage.querySelector("img");
var title = resultMessage.querySelector("h1");
var text = resultMessage.querySelector("p");

console.log(resultMessage);

document.getElementById("homeBtn").addEventListener("click", function () {
    window.location.href = "../Login/login.html";
});


if (totalScore < 5) {
    resultMessage.style.backgroundColor = "#960000";
    icon.src = "https://img.icons8.com/cute-clipart/64/delete-sign.png";
    title.innerText = "Unfortunately!";
    text.innerText = "You did not pass the exam. Please try again."
}

