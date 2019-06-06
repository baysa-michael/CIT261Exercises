function asTabs(tabNode, targetNode) {
    /*
    NOTE:  node.childNodes retrieves more than the element children, so
    will instead want to sue node.children to only retrieve the element
    child nodes
     */

    // Clear the current list of tabs
    for (let targetChild of tabNode.children) {
        tabNode.removeChild(targetChild);
    }

    // Add new tab buttons for each child element of the targetOutput node
    for (let i = 0; i < targetNode.children.length; i++) {
        // Create a new button tab for the child node
        let newButton = document.createElement("button");
        newButton.innerHTML = targetNode.children[i].id;
        newButton.id = "button" + i;

        // Add Listener to the Button
        newButton.addEventListener("click", () => {
            changeTabs(targetNode.children[i], tabNode);
        });

        // Append the button in the tab node
        tabNode.appendChild(newButton);
    }
}

function changeTabs(node) {
    // Get Parent Node
    let parentNode = node.parentNode;

    // Loop through all child nodes of the parent
    for (let i = 0; i < parentNode.children.length; i++) {
        if (parentNode.children[i] === node) {
            parentNode.children[i].style.display = "initial";
            document.getElementById("button" + i).className = "clicked";
        } else {
            parentNode.children[i].style.display = "none";
            document.getElementById("button" + i).className = "notClicked";
        }
    }
}

// Add onload listener to the document
window.addEventListener("onload", asTabs(
    document.getElementById("tabs"),
    document.getElementById("container")
));