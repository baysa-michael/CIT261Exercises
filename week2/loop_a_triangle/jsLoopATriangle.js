function makeTriangle() {
    for (let i = 0; i < 7; i++) {
        // Create output string for level
        let outputString = "";
        for (let j = i; j >= 0; j--) {
            outputString += "#";
        }

        // Output to console
        console.log(outputString);
    }
}