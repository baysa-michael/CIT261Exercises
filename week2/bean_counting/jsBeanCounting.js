function getBAndLetterCount() {
    // Reset the output field
    document.getElementById("output").innerHTML = "";

    // Retrieve the user search string
    let userString = document.getElementById("userString").value;

    // Retrieve the user target letter
    let userLetter = (document.getElementById("userLetter").value)[0];

    // Get the total character counts in the string
    let totalBs = countBs(userString);
    let totalChars = countChar(userString, userLetter);

    // Construct the response
    let response = "In the string '" + userString + "', there are a total of " +
        totalBs + " 'B' character" + (totalBs > 1 ? "s" : "") + " and " + totalChars +
        " '" + userLetter + "' character" + (totalChars > 1 ? "s" : "") + ".";

    // Output the resopnse
    document.getElementById("output").innerHTML = response;
    console.log(response);
}

function countBs(userInput) {
    return countChar(userInput, "B");
}

function countChar(userInput, userLetter) {
    let letterTally = 0;

    // Loop through user input
    for (let testLetter of userInput) {
        letterTally += (testLetter === userLetter ? 1 : 0);
    }

    // Return Count
    return letterTally;
}