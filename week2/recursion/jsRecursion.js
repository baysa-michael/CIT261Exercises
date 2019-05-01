function determineEvenOdd() {
    // Clear the initial output
    document.getElementById("output").innerHTML = "";

    // Retrieve user input as absolute value
    let userNumber = Math.abs(parseInt(document.getElementById("number").value));



    // Determine if number is even or odd and output result
    let result = "";
    if (isEven(userNumber)) {
        result = "The number " + userNumber + " is an even number.";
    } else {
        result = "The number " + userNumber + " is an odd number.";
    }

    // Output result
    document.getElementById("output").innerHTML = result;
    console.log(result);
}

function isEven(testNumber) {
    switch (testNumber) {
        case 0:
            return true;
        case 1:
            return false;
        default:
            return isEven(testNumber - 2);
    }
}