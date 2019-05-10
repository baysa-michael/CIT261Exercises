// Add a keydown listener for the down and up arrow
window.addEventListener("keydown", updateBalloon);
console.log("loaded script");

function updateBalloon(event) {
    console.log("running update balloon");
    let balloonSize =
        parseInt(document.getElementById("balloon").style.fontSize);
    console.log(balloonSize);

    if (event.key === "ArrowUp") {
        // Retrieve current size of balloon
        balloonSize = inflate(balloonSize);

        if (balloonSize > 200) {
            explode();
        } else {
            updateBalloonSize(balloonSize);
        }
    } else if (event.key === "ArrowDown") {
        balloonSize = deflate(balloonSize);

        updateBalloonSize(balloonSize);
    }
}

function inflate(balloonSize) {
    return balloonSize * 1.1;
}

function deflate(balloonSize) {
    return Math.max(balloonSize / 1.1, 10);
}

function explode() {
    document.getElementById("balloon").innerHTML = "&#x1F4A5";
    window.removeEventListener("keydown", updateBalloon);
    console.log("exploded");
}

function updateBalloonSize(balloonSize) {
    document.getElementById("balloon").style.fontSize = balloonSize + "px";
}