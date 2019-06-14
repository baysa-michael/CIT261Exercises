function drawISFLogo() {
    // Logo for Ideas for a Successful Future

    // Set the Canvas Element and Context
    let myCanvas = document.getElementById("testCanvas");
    let myContext = myCanvas.getContext("2d");

    // Set initial Image Rectangle
    myContext.strokeStyle = "rgba(0, 82, 204, 1)";
    myContext.fillStyle = "rgba(192, 192, 192, 1)";
    myContext.strokeRect(10, 10, 180, 180);
    myContext.fillRect(10, 10, 180, 180);

    // Draw the I
    myContext.fillStyle = "rgba(0, 82, 204, 1)";
    myContext.font = "200px DFKai-SB";
    myContext.fillText("I", 50, 165);

    // Draw the S
    myContext.font = "150px DFKai-SB";
    myContext.fillText("S", 13, 150);

    // Draw the F
    myContext.font = "150px DFKai-SB";
    myContext.fillText("F", 113, 150);
}

function dropOnTarget(myCanvas, targetElement, clearElement) {
    // Append the canvas to the target elment
    targetElement.appendChild(myCanvas);

    // Clear the children of the clear element
    clearElement.innerHTML = "";
}


window.addEventListener("load", () => {
    // Draw the Logo on the Canvas
    drawISFLogo();

    // Set the targets on the canvas
    let myCanvas = document.getElementById("testCanvas");
    let drop1 = document.getElementById("canvasDiv");
    let drop2 = document.getElementById("dragAndDropDiv");

    // Set the Dragover Listeners
    drop1.addEventListener("dragover", (event) => {
        event.preventDefault();
    });
    drop2.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    // Set the Drop Listeners
    drop1.addEventListener("drop", () => {

        dropOnTarget(myCanvas, drop1, drop2);
    });
    drop2.addEventListener("drop", () => {
        dropOnTarget(myCanvas, drop2, drop1);
    });
});