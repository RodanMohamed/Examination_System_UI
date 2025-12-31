var firstName = document.getElementById("first-name");
var lastName = document.getElementById("last-name");
var email = document.getElementById("email");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirm-password");
var registerButton = document.getElementById("register-button");

registerButton.addEventListener("click", function (event) {
    event.preventDefault();
    clearErrors();

    var isValid = true;
    if (firstName.value.trim() === "") {
        showError("first-name-error", "First name is required.");
        isValid = false;
    }
    if (lastName.value.trim() === "") {
        showError("last-name-error", "Last name is required.");
        isValid = false;
    }
    if (email.value.trim() === "") {
        showError("email-error", "Email is required.");
        isValid = false;
    } else if (!validateEmail(email.value.trim())) {
        showError("email-error", "Invalid email format.");
        isValid = false;
    }
    if (password.value.trim() === "") {
        showError("password-error", "Password is required.");
        isValid = false;
    } else if (password.value.trim().length < 8) {
        showError("password-error", "Password must be at least 8 characters.");
        isValid = false;
    }
    if (confirmPassword.value.trim() === "") {
        showError("confirm-password-error", "Confirm password is required.");
        isValid = false;
    } else if (password.value.trim() !== confirmPassword.value.trim()) {
        showError("confirm-password-error", "Passwords do not match.");
        isValid = false;
    }
    if (isValid) {
        var userData = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim(),
            password: password.value.trim()
        };
        var users = JSON.parse(localStorage.getItem("users")) || [];
        var userExists = users.some(function (user) {
            return user.email === email.value.trim();
        });
        if (userExists) {
            showError("email-error", "Email is already registered.");
            return;
        }
        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful!");
        localStorage.setItem("loginUser", JSON.stringify(userData));
        window.location.replace("../Home/homepage.html");
         localStorage.removeItem("examStarted");
         localStorage.removeItem("examSubmitted");
         localStorage.removeItem("examTimeOut");
         localStorage.removeItem("remainingTime");

        //  localStorage.removeItem("savedAnswers");
        //  localStorage.removeItem("currentQuestion");
        // localStorage.removeItem("remainingTime");
        // localStorage.removeItem("markedQuestions");
        // localStorage.removeItem("examScore");
        // localStorage.removeItem("userAnswers");
        // localStorage.removeItem("questionsShuffled");
    }
});

function showError(elementId, message) {
    var errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
}

function clearErrors() {
    var errorElements = document.getElementsByClassName("error");
    for (var i = 0; i < errorElements.length; i++) {
        errorElements[i].textContent = "";
    }
}

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

window.addEventListener("click", function (event) {
    if (
        event.target !== registerButton &&
        ![firstName, lastName, email, password, confirmPassword].includes(event.target)
    ) {
        clearErrors();
    }
});

