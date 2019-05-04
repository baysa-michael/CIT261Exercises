function startChessboard() {
    // Get the chessboard size input by the user
    let size = parseInt(document.getElementById("size").value);

    // Confirm that a number was input by the user
    if (isNaN(size)) {
        buildChessboard();
    } else {
        buildChessboard(size);
    }
}

function buildChessboard(size = 1) {
    // Output the chessboard to the Console
    for (let i = 0; i < size; i++) {
        // Build the string for the current line of the chessboard
        let outputLine = "";
        let isEven = (i % 2 === 0);

        for (let j = 0; j < size; j++) {
            if (isEven) {
                outputLine += " "
            } else {
                outputLine += "#"
            }

            // Reverse the isEven Status
            isEven = !isEven;
        }

        // Output the line to the console
        console.log(outputLine);
    }
}