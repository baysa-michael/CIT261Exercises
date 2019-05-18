function testBorrowingAMethod() {
    // Create an object
    let myObject = {
        position: 1,
        result: true,
        message: "This is my message",
    };

    // Test the hasOwnProperty to make sure that it can be accessed regularly
    console.log("Object Has Own Property (position):  " + myObject.hasOwnProperty("position"));

    // Add a hasOwnProperty function to the object
    myObject.hasOwnProperty = function(input) {
        console.log("Has Own Property has been taken by a local function - Input:  " + input);
    };

    // Test that the hasOwnProperty cannot be directly accessed now
    console.log("Object Has Own Property (position):  " + myObject.hasOwnProperty("position"));

    // Access the object hasOwnProperty to use the function properly again
    console.log("Object Has Own Property (position):  " +
        Object.prototype.hasOwnProperty.call(myObject, "position"));
}