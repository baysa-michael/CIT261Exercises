function deepEqualTest() {
    // Create a series of test object pairs to use deep equals to test
    let number1 = 9;
    let number2 = 10;
    let number3 = 10;

    let boolean1 = true;
    let boolean2 = false;
    let boolean3 = true;

    let string1 = "Hello";
    let string2 = "Goodbye";
    let string3 = "Goodbye";

    let object1 = new TestObject("John", 2, "Country Fried Steak");
    let object2 = new TestObject("Michael", 8, "Yang Rou Pao Mo");
    let object3 = new TestObject("Michael", 8, "Yang Rou Pao Mo");


    // Test true false on all of the pairs of objects
    deepEqualMessage(deepEqual(number1, number2), number1, number2);
    deepEqualMessage(deepEqual(number1, number3), number1, number3);
    deepEqualMessage(deepEqual(number2, number3), number2, number3);

    deepEqualMessage(deepEqual(boolean1, boolean2), boolean1, boolean2);
    deepEqualMessage(deepEqual(boolean1, boolean3), boolean1, boolean3);
    deepEqualMessage(deepEqual(boolean2, boolean3), boolean2, boolean3);

    deepEqualMessage(deepEqual(string1, string2), string1, string2);
    deepEqualMessage(deepEqual(string1, string3), string1, string3);
    deepEqualMessage(deepEqual(string2, string3), string2, string3);

    deepEqualMessage(deepEqual(object1, object2), object1, object2);
    deepEqualMessage(deepEqual(object1, object3), object1, object3);
    deepEqualMessage(deepEqual(object2, object3), object2, object3);
}

function TestObject(name, birthMonth, favoriteFood) {
    // Attributes
    this.name = name;
    this.birthMonth = birthMonth;
    this.favoriteFood = favoriteFood;
}

function deepEqual(input1, input2) {
    // Test any null objects
    if (input1 === null || input2 === null) {
        return input1 === input2;
    }

    // Path depending on if the inputs are objects or not
    if (typeof input1 === "object" || typeof input2 === "object") {
        // Return false if both 1 and 2 are not objects
        if (typeof input1 !== typeof input2) {
            return false;
        }

        // Retrieve the key sets of the two objects
        let object1Keys = Object.keys(input1);
        let object2Keys = Object.keys(input2);

        // Test to make sure the keys and attributes of both objects are the same
        if (object1Keys.length !== object2Keys.length) {
            return false;
        } else {
            for (let i = 0; i < object1Keys.length; i++) {
                // Test the Keys
                if (object1Keys[i] !== object2Keys[i]) {
                    return false;
                }

                // Test the Values for That Key
                if (input1[object1Keys[i]] !== input2[object1Keys[i]]) {
                    return false;
                }
            }
        }

        // If this point for an object is reached, the objects are equal
        return true;
    }

    // If both objects are primitives, test them via ===
    return input1 === input2;
}

function deepEqualMessage(isEqual, input1, input2) {
    console.log("-------- TEST --------------------");
    if (isEqual) {
        console.log("TRUE:  Inputs 1 and 2 are equal");
    } else {
        console.log("FALSE:  Inputs 1 and 2 are not equal");
    }
    console.log("Input 1:");
    console.log(input1);
    console.log("Input 2:");
    console.log(input2);
    console.log("-------- END TEST ----------------");
}