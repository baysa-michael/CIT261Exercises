function testFlattening() {
    // Create an array
    let testArray = [
        ["John", "Jim", "Jane"],
        [1, 32, 94, 212, 338],
        ["Me", "Myself", "I"]
    ];

    // Reduce the array
    let reducedArray = testArray.reduce((current, element) => current.concat(element), [] );

    // Display the before and after
    console.table(testArray);
    console.log(reducedArray);
}