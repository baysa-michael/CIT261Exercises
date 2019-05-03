function getReverseArray() {
    // Clear previous output
    document.getElementById("output").innerHTML = "";

    // Retrieve User Input
    let startRange = parseInt(document.getElementById("startRange").value);
    let endRange = parseInt(document.getElementById("endRange").value);
    let increment = parseInt(document.getElementById("increment").value);

    // Error Trapping
    if (increment === 0 || increment === null ||
        (increment > 0 && startRange > endRange) ||
        (increment < 0 && endRange > startRange)) {

        let errorMessage = "ERROR:  Illegal use of numbers";

        console.log(errorMessage);
        document.getElementById("output").innerHTML = errorMessage;
        return;
    }

    // Retrieve a range array based on the user input
    let userArray = range(startRange, endRange, increment);

    // Begin output construction
    let message = "Initial Array:  {" + userArray + "}";

    // Obtain a reversed array
    let reversedArray = reverseArray(userArray);
    message += "\nReversed New Array:  {" + reversedArray + "}";

    // Reverse the original user array
    reverseArrayInPlace(userArray);
    message += "\nReversed Original Array:  {" + userArray + "}";

    // Display the output
    console.log(message);
    document.getElementById("output").innerHTML = message;
}

function range(startRange, endRange, increment = 1) {
    // Declare Return Array
    let returnArray = [];

    if (increment > 0) {
        for (let i = startRange; i < endRange + 1; i += increment) {
            returnArray.push(i);
        }
    } else {
        for (let i = startRange; i > endRange - 1; i += increment) {
            returnArray.push(i);
        }
    }

    return returnArray;
}

function reverseArray(userArray) {
    let returnArray = [];
    for (let i = userArray.length - 1; i >= 0; i--) {
        returnArray.push(userArray[i]);
    }

    return returnArray;
}

function reverseArrayInPlace(userArray) {
    // Reverse Array
    let reverseArray = [];
    for (let i = userArray.length - 1; i >= 0; i--) {
        reverseArray.push(userArray[i]);
    }

    // Replace current user array
    for (let i = 0; i < reverseArray.length; i++) {
        userArray[i] = reverseArray[i];
    }
}