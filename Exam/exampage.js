window.addEventListener("DOMContentLoaded", () => {

    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    // Range input (progress bar)
    const rangeEl = document.querySelector("input[type='range']");

    const TOTAL_TIME = 1 * 60; // 30 minutes in seconds
    let remainingTime = TOTAL_TIME;

    function startCountdown() {
        const timer = setInterval(() => {

            let minutes = Math.floor(remainingTime / 60);
            let seconds = remainingTime % 60;


            minutesEl.style.setProperty("--value", minutes);
            secondsEl.style.setProperty("--value", seconds);

         
            let usedTime = TOTAL_TIME - remainingTime;
            let progressPercent = Math.floor((usedTime / TOTAL_TIME) * 100);

            // Update range value
            rangeEl.value = progressPercent;

            
            if (progressPercent >= 90) {
                rangeEl.style.setProperty("--range-bg", "red");
                rangeEl.style.setProperty("--range-thumb", "black");
            }

            if (remainingTime <= 0) {
                clearInterval(timer);
                alert("Time is up! Exam submitted.");
                return;
            }

            remainingTime--;

        }, 1000);
    }

    startCountdown();
});
