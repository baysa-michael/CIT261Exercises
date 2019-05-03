function implementList() {
    // Initial array
    let initialArray = [1, 2, 3];

    // Create list from array
    let testList = arrayToList(initialArray);

    // Log the list
    console.log("Created List:");
    console.log(testList);

    // Reconvert the new list back into an array
    let reconstructedArray = listToArray(testList);

    // Log the reconstructed array
    console.log("Reconstructed Array:  " + reconstructedArray);
}

function createListItem(value) {
    return {itemValue: value,
            objectLink: null};
}

function arrayToList(initialArray) {
    // Loop through the array and construct an array of list items
    let listItemArray = [];
    for (let i = 0; i < initialArray.length; i++) {
        // Construct a list item
        let newListItem = createListItem(initialArray[i]);

        listItemArray.push(newListItem);
    }

    // Stack the list
    let finalList = listItemArray.pop();
    while (listItemArray.length > 0) {
        finalList = prepend(listItemArray.pop(), finalList);
    }

    // Return the final list
    return finalList;
}

function prepend(inputElement, inputList) {
    // Append the list to the new list item
    inputElement.objectLink = inputList;

    return inputElement;
}

function listToArray(inputList) {
    let returnArray = [];
    let depth = 0;
    let returnValue = null;

    // Iterate over list and extract elements
    while (returnValue !== undefined) {
        // Retrieve the current return value
        returnValue = nth(inputList, depth);

        // If return value is not undefined, append the return value to the return array
        if (returnValue !== undefined) {
            returnArray.push(returnValue);
        }

        // Increment the depth
        depth++;
    }

    return returnArray;
}

function nth(inputList, targetNumber) {
    if (targetNumber === 0) {
        return inputList.itemValue;
    } else if (inputList.objectLink == null) {
        return undefined;
    } else {
        return nth(inputList.objectLink, targetNumber - 1);
    }
}