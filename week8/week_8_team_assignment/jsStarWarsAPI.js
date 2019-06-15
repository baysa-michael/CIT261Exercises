function getPeople(targetURL) {
    let headerJSON = {headers: {Accept:  "application/json"}};

    fetch(targetURL, headerJSON)
        .then(response => {
            return response.json();
        })
        .then(result => {
            // REMOVE THE CONSOLE LOG WHEN DONE
            console.log(result);

            displayPeople(result);
        })
        .catch(() => {
       console.log("ERROR:  Unable to retrieve information");
    });
}

function displayPeople(jsonPeople) {
    // Set the appropriate div elements
    let navigationButtons = document.getElementById("pageNavigation");
    let peopleList = document.getElementById("starWarsPeopleDiv");

    // Clear the current contents for the navigation and people list
    navigationButtons.innerHTML = "";
    peopleList.innerHTML = "";

    // Create the buttons for the navigation with appropriate listeners/status
    let previousButton = document.createElement("button");
    previousButton.innerHTML = "PREVIOUS";
    previousButton.classList.add("navigationButton");
    if (jsonPeople.previous === null) {
        previousButton.disabled = true;
    } else {
        previousButton.addEventListener("click", () => {
            getPeople(jsonPeople.previous);
        });
    }

    let nextButton = document.createElement("button");
    nextButton.innerHTML = "NEXT";
    nextButton.classList.add("navigationButton");
    if (jsonPeople.next === null) {
        nextButton.disabled = true;
    } else {
        nextButton.addEventListener("click", () => {
            getPeople(jsonPeople.next);
        });
    }

    // Add the navigation buttons
    navigationButtons.appendChild(previousButton);
    navigationButtons.appendChild(nextButton);

    // Extract the people array from the JSON object
    let people = jsonPeople.results;

    // Construct a list to contain the people
    let insertList = document.createElement("ul");
    insertList.classList.add("peopleList");

    people.forEach(item => {
        // Create the List Item
        let insertListItem = document.createElement("li");
        insertListItem.innerHTML = item.name;
        insertListItem.classList.add("peopleListItem");

        // Append the List Item to the list
        insertList.appendChild(insertListItem);
    });

    // Add the completed list to the target
    peopleList.appendChild(insertList);
}

window.addEventListener("load", () => {
    // Fetch the data from the API
    // https://swapi.co/api/people/
    let targetURL = "https://swapi.co/api/people/?format=json&page=1";

    getPeople(targetURL);
});