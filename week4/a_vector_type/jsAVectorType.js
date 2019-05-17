class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(inputVector) {
        return new Vec(this.x + inputVector.x, this.y + inputVector.y);
    }

    minus(inputVector) {
        return new Vec(this.x - inputVector.x, this.y - inputVector.y);
    }

    get length() {
        console.log("Calculating Length");
        return (Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)));
    }

    toLog() {
        console.log("X:  " + this.x);
        console.log("Y:  " + this.y);
        console.log("Length:  " + this.length);
    }
}

function testVecClass() {
    // Get user input
    let x = parseFloat(document.getElementById("x").value);
    let y = parseFloat(document.getElementById("y").value);

    // Construct a new object
    let newVector1 = new Vec(x, y);
    let newVector2 = new Vec(4, 8);

    // Display the points and the length of the new vector
    console.log("New Vector 1");
    console.log(newVector1.toLog());
    console.log("New Vector 2");
    console.log(newVector2.toLog());

    // Test the Plus Method
    let newVector3 = newVector1.plus(newVector2);
    console.log("Plus");
    console.log("New Vector 3");
    console.log(newVector3.toLog());

    // Test the Minus Method
    let newVector4 = newVector1.minus(newVector2);
    console.log("Minus");
    console.log("New Vector 4");
    console.log(newVector4.toLog());
}