function computeDominantWritingDirection() {
    // Clear Current Output
    document.getElementById("output").innerHTML = "";

    // Get the user input
    let userInput = document.getElementById("inputText").value;

    // Output the results of the dominant writing direction
    let result = "Result:  " + dominantWritingDirection(userInput);
    console.log(result);
    document.getElementById("output").innerHTML = result;
}

function dominantWritingDirection(inputText) {
    // Loop through each character of the input text
    let scriptList = [];
    for (let character of inputText) {
        // Get the script of the character
        scriptList.push(characterScript(character.codePointAt(0)));
    }

    // Get the array of counts for each writing direction
    let directionList = countBy(scriptList, (script) => {
       return script.direction;
    });

    // Get the direction with the most characters
    let mostCharacters = "";
    let characterCount = 0;
    for (let i = 0; i < directionList.length; i++) {
        if (directionList[i].count > characterCount) {
            characterCount = directionList[i].count;
            mostCharacters = directionList[i].name;
        }
    }

    return mostCharacters;
}
