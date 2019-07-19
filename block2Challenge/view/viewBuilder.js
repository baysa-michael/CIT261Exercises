class ViewBuilder {
    addCurrencyMenu(assetList, name, title) {
        let newForm = document.createElement("form");
        newForm.id = `${name}Form`;

        let newFormTitle = document.createElement("h2");
        newFormTitle.innerText = title;
        newForm.appendChild(newFormTitle);

        let newSelect = document.createElement("select");
        newSelect.name = name;
        newSelect.id = name;

        let unselectedOption = document.createElement("option");
        unselectedOption.innerText = "--SELECT--";
        newSelect.appendChild(unselectedOption);

        assetList.forEach((listItem) => {
            // Create a New Option
            let newOption = document.createElement("option");

            // Set the Value and Inner Text
            newOption.value = listItem.primaryName;
            newOption.innerText = listItem.altName;

            // Append the element
            newSelect.appendChild(newOption);
        });

        newForm.appendChild(newSelect);

        return newForm;
    }
}

export default ViewBuilder;