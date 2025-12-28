var loginStudent = JSON.parse(localStorage.getItem('loginUser')) || 'Student';

var studentName = loginStudent.firstName;
studentName += " "
studentName += loginStudent.lastName;
document.getElementById("studentName").textContent = studentName;

setTimeout(function () {
    window.location.replace("../Result/Result.html");
}, 5000);