function testTableFromObject() {
    // Clear Output Groups
    document.getElementById("mountain").innerHTML = "";
    document.getElementById("river").innerHTML = "";
    document.getElementById("country").innerHTML = "";

    // Construct Objects to Test
    let mountainObject = [
        {
            name: "Kilimanjaro",
            height: 5895,
            place: "Tanzania"
        },
        {
            name: "Mauna Kea",
            height: 13803,
            place: "Big Island, Hawaii"
        },
        {
            name: "Haleakala",
            height: 10023,
            place: "Maui, Hawaii"
        }
    ];

    let riverObject = [
        {
            name: "Yangtze",
            length: 3915,
            place: "US"
        },
        {
            name: "Amazon",
            length: 3977,
            place: "Brazil"
        },
        {
            name: "Nile",
            length: 4132,
            place: "Egypt"
        }
    ];

    let countryObject = [
        {
            name: "China",
            population: 1404000000
        },
        {
            name: "New Zealand",
            population: 4794000
        },
        {
            name: "France",
            population: 66990000
        }
    ];

    // Post output
    document.getElementById("mountain").innerHTML = tableFromObject(mountainObject);
    document.getElementById("river").innerHTML = tableFromObject(riverObject);
    document.getElementById("country").innerHTML = tableFromObject(countryObject);
}



function tableFromObject(arrayOfObjects) {
    // Begin constructing a table definition
    let returnTable = "<table>";

    // Container for Object Keys
    let objectKeys;

    // Loop through each object
    for (let i = 0; i < arrayOfObjects.length; i++) {
        // Construct the table header if the first row
        if (i === 0) {
            // Extract the Object Keys
            objectKeys = Object.keys(arrayOfObjects[0]);

            // Build the Header Row
            returnTable += "<tr>";
            for (let objectKey of objectKeys) {
                returnTable += "<th>" + objectKey + "</th>";
            }
            returnTable += "</tr>";
        }

        // Construct a table row
        returnTable += "<tr>";
        for (let objectKey of objectKeys) {
            returnTable += "<td" +
                (typeof arrayOfObjects[i][objectKey] === "number" ? " style='text-align: right'" : "") +
                ">" + arrayOfObjects[i][objectKey] + "</td>";
        }
        returnTable += "</tr>";
    }

    //Complete and return the table
    returnTable += "</table>";

    return returnTable;
}