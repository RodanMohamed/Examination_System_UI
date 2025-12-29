var emailinput = document.getElementById("emailinput");
var passinput = document.getElementById("passinput");

var emailError = document.getElementById("emailError");
var passError = document.getElementById("passError");
var loginError = document.getElementById("loginError");
var isValid = true;


// localStorage.setItem("email", "test@gmail.com");
// localStorage.setItem("pass", "123456");
// localStorage.clear();



document.addEventListener("click", function () {
    emailError.textContent = "";
    passError.textContent = "";
    loginError.textContent = "";
});

function validationlogin(e) {
    isValid = true;

    var email = emailinput.value;
    var password = passinput.value;

    emailError.textContent = "";
    passError.textContent = "";
    // loginError.textContent = "";


    if (email.trim() === "") {
        e.preventDefault();
        emailError.textContent = "Email is required";
        isValid = false;
    }

    if (password.trim() === "") {
        e.preventDefault();
        passError.textContent = "Password is required";
        isValid = false;
    }


    if (isValid) {
        if (!login()) {
            e.preventDefault();
        }
    }

}
function plur() {
    emailError.textContent = "";
    passError.textContent = "";
    loginError.textContent = "";


}


function login() {
    var email = emailinput.value.trim();
    var password = passinput.value.trim();
    var loginError = document.getElementById("loginError");

    // loginError.textContent = "";
    // get users array from localStorage
    var users = JSON.parse(localStorage.getItem("users")) || [];

    var userFound = false;

    var loginUserData
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            userFound = true;
            loginUserData = {
                firstName: users[i].firstName,
                lastName: users[i].lastName,
                email: users[i].email,
                score: 0
            };
            break;
        }
    }

    if (userFound) {
        localStorage.setItem("loginUser", JSON.stringify(loginUserData));
        localStorage.removeItem("examStarted");
        localStorage.removeItem("examSubmitted");
        localStorage.removeItem("examTimeOut");

        return true;
    } else {
        loginError.textContent = "Invalid data – Please register first";
        return false;
    }
}

