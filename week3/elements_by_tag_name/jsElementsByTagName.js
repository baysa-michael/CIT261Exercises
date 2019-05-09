function testGetElementsByTagName() {
    // Clear output
    document.getElementById("output").innerHTML = "";

    let outputMessage = "";

    // Tests on different element names in the current document
    let elementsP = getTaggedElements(document, "p");
    outputMessage += "'p' Elements Total:  " + elementsP.length + ";";

    let elementsBody = getTaggedElements(document, "body");
    outputMessage += "\n'body' Elements Total:  " + elementsBody.length + ";";

    let elementsDiv = getTaggedElements(document, "div");
    outputMessage += "\n'div' Elements Total:  " + elementsDiv.length + ";";

    let elementsScript = getTaggedElements(document, "script");
    outputMessage += "\n'script' Elements Total:  " + elementsScript.length + ";";

    let elementsA = getTaggedElements(document, "a");
    outputMessage += "\n'a' Elements Total:  " + elementsA.length + ";";

    // Output Results
    console.log(outputMessage);
    document.getElementById("output").innerHTML = outputMessage;
}

function getTaggedElements(inputNode, tagName) {
    let returnArray = [];

    // Add the current node if it matches
    if (inputNode.nodeName.toUpperCase() === tagName.toUpperCase()) {
        returnArray.push(inputNode);
    }

    // Search any child nodes
    if (inputNode.hasChildNodes()) {
        // Retrieve the matching tags under the current node
        let childArray = [];
        for (let childNode of inputNode.childNodes) {
            childArray.push(getTaggedElements(childNode, tagName));
        }

        // Add any retrieved nodes to the node array
        for (let i = 0; i < childArray.length; i++) {
            for (let addedElement of childArray[i]) {
                returnArray.push(addedElement);
            }
        }
    }

    // Return the array
    return returnArray;
}