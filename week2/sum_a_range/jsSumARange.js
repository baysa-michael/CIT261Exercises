function getRangeSum() {
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

    // Sum the range array
    let total = sum(userArray);

    // Construct the output
    let response = "The sum of the user array " + userArray + " is " + total + ".";

    // Display the output
    console.log(response);
    document.getElementById("output").innerHTML = response;
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

function sum(userArray) {
    let total = 0;
    for (let arrayItem of userArray) {
        total += arrayItem;
    }

    return total;
}