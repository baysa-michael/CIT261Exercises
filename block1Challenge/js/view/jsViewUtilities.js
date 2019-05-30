class ViewUtilities {
    static createLabel(labelContents, labelFor, labelName = "", labelID = "", labelClassList = []) {
        let newLabel = document.createElement("label");
        newLabel.innerHTML = labelContents;
        newLabel.for(labelFor);

        if (labelName !== "") {
            newLabel.name = labelName;
        }

        if (labelID !== "") {
            newLabel.id = labelID;
        }

        if (Array.isArray(labelClassList) && labelClassList.length > 0) {
            labelClassList.forEach((classElement) => { newLabel.classList.add(classElement) });
        }

        return newLabel;
    }

    static createInput(inputType, inputID, inputClassList = []) {
        let newInput = document.createElement("input");
        newInput.type = inputType;
        newInput.id = inputID;

        if (Array.isArray(inputClassList) && inputClassList.length > 0) {
            inputClassList.forEach((classElement) => { newInput.classList.add(classElement) });
        }

        return newInput;
    }

}

export default ViewUtilities;