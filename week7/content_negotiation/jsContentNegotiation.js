let testURL = "https://eloquentjavascript.net/author";
let targetOutput = document.getElementById("output");

let headerPlain = {headers: {Accept:  "text/plain"}};
let headerHTML = {headers: {Accept:  "text/html"}};
let headerJSON = {headers: {Accept:  "application/json"}};
let headerRainbowUnicorn = {headers: {Accept:  "application/rainbows+unicorns"}};

let buttonArray = [];
buttonArray.push(document.getElementById("plaintext"));
buttonArray.push(document.getElementById("html"));
buttonArray.push(document.getElementById("json"));
buttonArray.push(document.getElementById("rainbowsunicorns"));

function generalFetch(url, acceptHeader) {
    fetch(url, acceptHeader)
        .then(response => response.text())
        .then(outputResponse);
}

function outputResponse(returnDocument) {
    targetOutput.innerHTML = returnDocument;
    console.log(returnDocument);
}

window.addEventListener("load", () => {
    // Add Click Listeners
    buttonArray.forEach((element) => {
        let targetHeader = null;
        switch (element.getAttribute("id")) {
            case "plaintext":
                targetHeader = headerPlain;
                break;
            case "html":
                targetHeader = headerHTML;
                break;
            case "json":
                targetHeader = headerJSON;
                break;
            case "rainbowsunicorns":
                targetHeader = headerRainbowUnicorn;
        }

        element.addEventListener("click", () => {
            generalFetch(testURL, targetHeader);
        })
    });
});