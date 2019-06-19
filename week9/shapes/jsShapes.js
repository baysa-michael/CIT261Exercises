function drawTrapezoid(parent, height, bottomWidth, topWidth) {
    // Clear the parent
    parent.innerHTML = "";

    // Create new canvas element
    let newCanvas = document.createElement("canvas");
    newCanvas.width = bottomWidth + 20;
    newCanvas.height = height + 20;

    // Create new context
    let newContext = newCanvas.getContext("2d");

    // Draw the shape
    newContext.beginPath();
    newContext.moveTo(10, height + 10);
    newContext.lineTo(bottomWidth + 10, height + 10);
    newContext.lineTo(newCanvas.width / 2 + topWidth / 2, 10);
    newContext.lineTo(newCanvas.width / 2 - topWidth / 2, 10);
    newContext.closePath();

    // Stroke and Fill the Shape
    newContext.strokeStyle = "rgba(25, 112, 218, 1)";
    newContext.fillStyle = "rgba(116, 108, 125, 1)";
    newContext.stroke();
    newContext.fill();

    // Attach the element to the parent
    parent.appendChild(newCanvas);
}

function drawRedDiamond(parent, length) {
    // Clear the parent
    parent.innerHTML = "";

    // Create new canvas element
    let newCanvas = document.createElement("canvas");
    newCanvas.width = Math.sqrt(Math.pow(length, 2) + Math.pow(length, 2)) + 20;
    newCanvas.height = Math.sqrt(Math.pow(length, 2) + Math.pow(length, 2)) + 20;

    // Create new context
    let newContext = newCanvas.getContext("2d");

    // Translate the square 90 degrees
    newContext.translate(Math.sqrt(Math.pow(length, 2) + Math.pow(length, 2)) / 2, 0);
    newContext.rotate(45 * Math.PI / 180);

    // Draw the square
    newContext.fillStyle = "rgba(255, 0, 0, 1)";
    newContext.fillRect(10, 10, length, length);

    // Attach the element to the parent
    parent.appendChild(newCanvas);
}

function drawZigzag(parent, segmentLength, segmentCount, segmentDegree, startLeft) {
    // Clear the parent
    parent.innerHTML = "";

    // Create new canvas element
    let newCanvas = document.createElement("canvas");
    // **** a / sin(A) = c / sin(C) -> a = (c * sin(A)) / sin(C)
    let triangleHeight = (segmentLength * Math.sin(segmentDegree * Math.PI / 180)) / Math.sin(90 * Math.PI / 180);
    let triangleWidth = Math.sqrt(Math.pow(segmentLength, 2) + Math.pow(triangleHeight, 2));

    newCanvas.width = triangleWidth + 20;
    newCanvas.height = (triangleHeight * segmentCount) + 20;

    // Create new context
    let newContext = newCanvas.getContext("2d");

    // Draw the shape
    let currentLeft = startLeft;
    let currentPointX;
    if (startLeft) {
        currentPointX = 10;
    } else {
        currentPointX = newCanvas.width - 10;
    }
    let currentPointY = 10;
    newContext.beginPath();
    newContext.moveTo(currentPointX, currentPointY);
    for (let i = 0; i < segmentCount; i++) {
        // Set the Destination X and Y
        currentPointY += triangleHeight;
        if (currentLeft) {
            currentPointX += triangleWidth;
        } else {
            currentPointX -= triangleWidth;
        }

        // Draw a new line
        newContext.lineTo(currentPointX, currentPointY);

        // Flip the side indicator
        currentLeft = !currentLeft;
    }

    // Stroke and Fill the Shape
    newContext.strokeStyle = "rgba(25, 112, 218, 1)";
    newContext.stroke();

    // Attach the element to the parent
    parent.appendChild(newCanvas);
}

function drawSpiral(parent, segmentCount, radiusGrowthRate) {
    // Clear the parent
    parent.innerHTML = "";

    // Create new canvas element
    let newCanvas = document.createElement("canvas");
    newCanvas.width = 2 * segmentCount + 20;
    newCanvas.height = 2 * segmentCount + 20;

    // Create new context
    let newContext = newCanvas.getContext("2d");

    // Draw the shape
    let currentRadius = 1;
    let currentPointX = newCanvas.width / 2;
    let currentPointY = newCanvas.height / 2;
    newContext.beginPath();
    newContext.moveTo(currentPointX, currentPointY);
    for (let i = 0; i < segmentCount; i++) {
        // Set the Angle from the X Axis in Radians
        let currentAngle = (i % 8) * 45 * Math.PI / 180;

        // Update the Radius
        currentRadius += radiusGrowthRate;

        // Set the Destination X and Y (Spiral Position + Center Offset)
        currentPointX = currentRadius * Math.cos(currentAngle) + newCanvas.width / 2;
        currentPointY = currentRadius * Math.sin(currentAngle) + newCanvas.height / 2;

        // Draw a new line
        newContext.lineTo(currentPointX, currentPointY);
    }

    // Stroke and Fill the Shape
    newContext.strokeStyle = "rgba(25, 112, 218, 1)";
    newContext.stroke();

    // Attach the element to the parent
    parent.appendChild(newCanvas);
}

function drawYellowStar(parent, starRadius, starPoints) {
    // Clear the parent
    parent.innerHTML = "";

    // Create new canvas element
    let newCanvas = document.createElement("canvas");
    newCanvas.width = 2 * starRadius + 20;
    newCanvas.height = 2 * starRadius + 20;

    // Create new context
    let newContext = newCanvas.getContext("2d");

    // Draw the shape
    let currentAngle = 0;
    let currentPointX = Math.round(starRadius * Math.cos(currentAngle) + newCanvas.width / 2);
    let currentPointY = Math.round(starRadius * Math.sin(currentAngle) + newCanvas.height / 2);
    console.log("Center X:  " + newCanvas.width / 2);
    console.log("Center Y:  " + newCanvas.height / 2);
    console.log("X:  " + currentPointX);
    console.log("Y:  " + currentPointY);
    newContext.beginPath();
    newContext.moveTo(currentPointX, currentPointY);
    for (let i = 0; i < starPoints; i++) {
        // Calculate the next angle
        currentAngle += (360 / starPoints) * Math.PI / 180;

        // Calculate the next destination
        currentPointX = Math.round(starRadius * Math.cos(currentAngle) + newCanvas.width / 2);
        currentPointY = Math.round(starRadius * Math.sin(currentAngle) + newCanvas.height / 2);

        console.log("X:  " + currentPointX);
        console.log("Y:  " + currentPointY);

        // Draw a new quadratic curve based on the center
        newContext.quadraticCurveTo(newCanvas.width / 2, newCanvas.height / 2, currentPointX, currentPointY);
    }

    // Close the Path
    newContext.closePath();

    // Stroke and Fill the Shape
    newContext.strokeStyle = "rgba(255, 180, 60, 1)";
    newContext.stroke();
    newContext.fillStyle = "rgba(255, 180, 60, 1)";
    newContext.fill();

    // Attach the element to the parent
    parent.appendChild(newCanvas);
}

window.addEventListener("load", () => {
    // Get Targets
    let trapezoidTarget = document.getElementById("trapezoidDiv");
    let redDiamondTarget = document.getElementById("redDiamondDiv");
    let zigzagLineTarget = document.getElementById("zigzagLineDiv");
    let spiralTarget = document.getElementById("spiralDiv");
    let yellowStarTarget = document.getElementById("yellowStarDiv");

    // Draw Elements
    drawTrapezoid(trapezoidTarget, 85, 180, 110);
    drawRedDiamond(redDiamondTarget, 120);
    drawZigzag(zigzagLineTarget, 50, 6, 20, true);
    drawSpiral(spiralTarget, 100, 1);
    drawYellowStar(yellowStarTarget, 100, 8);
});