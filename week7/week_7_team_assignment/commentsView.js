import ViewUtilities from "./jsViewUtilities.js";

class CommentsView {
    constructor() {

    }

    static buildCommentInsert(hikeName, functionRef) {
        // Create the form to add
        const newForm = document.createElement("form");

        // Add a reference to the function to be executed when submitting the form
        newForm.onsubmit = functionRef;

        // Add a header and instructions to the form
        let formHeader = document.createElement("h2");
        formHeader.innerHTML = "ADD COMMENTS";

        let formInstructions = document.createElement("p");
        formInstructions.innerHTML = "Please enter in all information and then click on Submit";

        let hikeNameSpan = document.createElement("span");
        hikeNameSpan.id = "hikeName";
        hikeNameSpan.innerHTML = hikeName;

        newForm.appendChild(formHeader);
        newForm.appendChild(formInstructions);
        newForm.appendChild(hikeNameSpan);

        // Create the labels and inputs
        newForm.appendChild(ViewUtilities.createLabelInputSet("Comment Date", "commentDate",
            "commentDate", "date"));

        newForm.appendChild(ViewUtilities.createLabelInputSet("Comment",
            "comment", "comment", "text"));

        // Add a Submit and Reset Button
        newForm.appendChild(ViewUtilities.createSubmitResetSet("addComment"));

        return newForm;
    }

    renderCommentDisplay() {

    }

}

export default CommentsView;