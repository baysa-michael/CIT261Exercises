function testLoop() {
    // Set initial value
    let initialValue = 0;

    // Create functions for loop
    const myTestFunction = function(input) {
        return input < 10;
    };

    const myUpdateFunction = function(input) {
        return input + 1;
    };

    const myBodyFunction = function(input) {
        console.log("Loop #" + input);
    };

    // Run the test loop
    myLoop(initialValue, myTestFunction, myUpdateFunction, myBodyFunction);
}

function myLoop(inputValue, testFunction, updateFunction, bodyFunction) {
    let testValue = inputValue;

    // Test the current value
    while (testFunction(testValue)) {
        // Run the body function
        bodyFunction(testValue);

        // Execute the update function
        testValue = updateFunction(testValue);
    }
}