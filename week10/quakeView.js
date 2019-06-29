export default class QuakesView {
    renderQuakeList(quakeList, listElement) {
        // Clear the parent element
        listElement.innerHTML = "";

        quakeList.forEach((item) => {
            // Create the List Item Element
            let newListItem = document.createElement("li");

            // Add the List Item Attributes and Classes
            newListItem.setAttribute("data-id", item.id);

            // Add the Inner HTML for the list item
            newListItem.innerHTML = `<div class="title">${item.properties.title} - Time Index:  ${item.properties.time}</div>
            <div class="properties"></div>`;

            // Append the bullet point to the parent list
            listElement.appendChild(newListItem);
        });
    }

    renderQuake(quake, element) {
        const quakeProperties = Object.entries(quake.properties);
        const quakeKeys = Object.keys(quakeProperties);

        element.innerHTML = "";

        let propertyList = document.createElement("ul");

        for (let i = 0; i < quakeProperties.length; i++) {
            let newProperty = document.createElement("li");

            newProperty.innerHTML = `${quakeKeys[i]}:  ${quakeProperties[i]}`;

            propertyList.appendChild(newProperty);
        }

        element.appendChild(propertyList);
    }
}