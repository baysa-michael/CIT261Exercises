import GeneralUtilities from "../utilities/generalUtilities.js";

class KrakenRecentSpread {
    constructor(jsonInfo) {
        this.errorMessage = null;
        this.pair = null;
        this.lastUnix = null;
        this.lastJS = null;
        this.spreadList = [];

        // Set object if no error exists
        if (jsonInfo.error.length > 0) {
            // If object error, set error message
            this.errorMessage = jsonInfo.error[0];
        } else if (jsonInfo.hasOwnProperty("result") &&
            Object.keys(jsonInfo.result).length === 2 &&
            jsonInfo.result.hasOwnProperty("last")) {
            // Construct a list from the keys
            this.lastUnix = jsonInfo.result["last"];
            this.lastJS = GeneralUtilities.convertUnixTimeToJavascript(this.lastUnix);

            Object.keys(jsonInfo.result).forEach((key) => {
                if (key !== "last") {
                    this.pair = key;

                    for (let i in jsonInfo.result[key]) {
                        let spreadRecord = {
                            unixTime: jsonInfo.result[key][i][0],
                            jsTime: GeneralUtilities.convertUnixTimeToJavascript(jsonInfo.result[key][i][0]),
                            bid: jsonInfo.result[key][i][1],
                            ask: jsonInfo.result[key][i][2],
                            spread: jsonInfo.result[key][i][1] - jsonInfo.result[key][i][2]
                        };

                        this.spreadList.push(spreadRecord);
                    }
                }
            });
        } else {
            this.errorMessage = "ERROR:  Result Missing - " +
                "Unable to Create KrakenRecentSpread Object";
        }
    }

    toString() {
        console.log("**********Kraken Recent Spread Data Display:");
        console.log(`Error Message:  ${this.errorMessage}`);
        console.log(`Asset Pair : ${this.pair}`);
                console.log(`Last Time (Unix) : ${this.lastUnix}`);
                console.log(`Last Time (Javascript) : ${this.lastJS}`);
        this.spreadList.forEach((item) => {
            console.log("*****START SPREAD SET*****");
            console.log(`Unix Time:  ${item.unixTime}`);
            console.log(`JavaScript Time:  ${item.jsTime}`);
            console.log(`Bid:   ${item.bid}`);
            console.log(`Ask:  ${item.ask}`);
            console.log(`Spread: ${item.spread}`);
            console.log("*****END SPREAD SET*****");
        });
    }
}

export default KrakenRecentSpread;