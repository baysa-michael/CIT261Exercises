function setMinimum() {
    // Clear current answer
    document.getElementById("output").innerHTML = "";

    // Retrieve user inputs
    let number1 = parseFloat(document.getElementById("number1").value);
    let number2 = parseFloat(document.getElementById("number2").value);

    // Determine the minimum
    let minNumber = Math.min(number1, number2);

    // Output the minimum
    document.getElementById("output").innerHTML = "Minimum:  " + minNumber;
    console.log("Minimum:  " + minNumber);
}