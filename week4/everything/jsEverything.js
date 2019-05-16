function testEverything() {
    // Create a test array
    let testArray1 = [
        true,
        true,
        true,
        false
    ];

    let testArray2 = [
        true,
        true,
        true,
        true
    ];

    // Create a Test Function
    const testFunction1 = function(arrayItem) {
        return arrayItem === true;
    };

    const testFunction2 = function(arrayItem) {
        return arrayItem === false;
    };

    // Display Results of Test
    console.log("Test 1:");
    console.log(everything1(testArray1, testFunction1));
    console.log("Test 2:");
    console.log(everything1(testArray2, testFunction1));

    console.log("Test 3:");
    console.log(everything2(testArray1, testFunction2));
    console.log("Test 4:");
    console.log(everything2(testArray2, testFunction2));

}

function everything1(inputArray, inputFunction) {
    let returnValue = true;
    inputArray.forEach(
        (element) => {
            if (!inputFunction(element)) {
                returnValue = false;
            }
        }
    );

    return returnValue;
}

function everything2(inputArray, inputFunction) {
    return !inputArray.some(inputFunction);
}