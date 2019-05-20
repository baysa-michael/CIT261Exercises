function testRetry() {
    let successful = true;
    do {
        try {
            // Test Multiplication
            let number1 = Math.round(Math.random() * 100);
            let number2 = Math.round(Math.random() * 100);
            let answer = primitiveMultiply(number1, number2);
            console.log("Number 1:  " + number1);
            console.log("Number 2:  " + number2);
            console.log("ANSWER:  " + answer);

            successful = true;
        } catch (e) {
            if (e instanceof MultiplicatorUnitFailure) {
                successful = false;
                console.log(e.message);
            }
        }
    } while (!successful)
}

function primitiveMultiply(number1, number2) {
    let randomNumber = Math.random();

    if (randomNumber > .8) {
        return number1 * number2;
    } else {
        throw new MultiplicatorUnitFailure("ERROR:  Attempt at multiplication failed");
    }
}

class MultiplicatorUnitFailure extends Error {}