function testClick(target) {
    console.log("Successfully clicked on '" + target.id + "'");
}

window.addEventListener("load", () => {
    pulsingButton = document.getElementById("pulsingButton");
    pulsingButton.addEventListener("click", () => {
        testClick(pulsingButton);
    });
});

window.addEventListener("load", () => {
    expandingButton = document.getElementById("expandingButton");
    expandingButton.addEventListener("click", () => {
        testClick(expandingButton);
    });
});