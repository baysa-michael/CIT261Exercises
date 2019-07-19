import GeneralUtilities from '../utilities/generalUtilities.js'

class KrakenRecentTrades {
    constructor(jsonInfo) {
        this.errorMessage = null;
        this.pair = null;
/*
        this.lastUnix = null;
        this.lastJS = null;
*/
        this.spreadList = [];

        // Set object if no error exists
        if (jsonInfo.error.length > 0) {
            // If object error, set error message
            this.errorMessage = jsonInfo.error[0];
        } else if (jsonInfo.hasOwnProperty("result") &&
            Object.keys(jsonInfo.result).length === 2 &&
            jsonInfo.result.hasOwnProperty("last")) {
            // Construct a list from the keys
/*
            this.lastUnix = jsonInfo.result["last"];
            this.lastJS = GeneralUtilities.convertUnixTimeToJavascript(this.lastUnix);
*/
            Object.keys(jsonInfo.result).forEach((key) => {
                if (key !== "last") {
                    this.pair = key;

                    for (let i in jsonInfo.result[key]) {
                        let tradeRecord = {
                            price: jsonInfo.result[key][i][0],
                            volume: jsonInfo.result[key][i][1],
                            unixTime: jsonInfo.result[key][i][2],
                            jsTime: GeneralUtilities.convertUnixTimeToJavascript(jsonInfo.result[key][i][2]),
                            buySell: jsonInfo.result[key][i][3],
                            marketLimit: jsonInfo.result[key][i][4],
                            miscellaneous: jsonInfo.result[key][i][5]
                        };

                        this.tradeList.push(tradeRecord);
                    }
                }
            });
        } else {
            this.errorMessage = "ERROR:  Result Missing - " +
                "Unable to Create KrakenRecentTrades Object";
        }
    }

    toString() {
        console.log("**********Kraken Recent Trade Data Display:");
        console.log(`Error Message:  ${this.errorMessage}`);
        console.log(`Asset Pair : ${this.pair}`);
/*
        console.log(`Last Time (Unix) : ${this.lastUnix}`);
        console.log(`Last Time (Javascript) : ${this.lastJS}`);
*/
        this.spreadList.forEach((item) => {
            console.log("*****START TRADE SET*****");
            console.log(`Price:   ${item.price}`);
            console.log(`Volume:  ${item.volume}`);
            console.log(`Unix Time:  ${item.unixTime}`);
            console.log(`JavaScript Time:  ${item.jsTime}`);
            console.log(`Buy/Sell:   ` + (item.buySell === "s" ? "Sell" : "Buy"));
            console.log(`Market/Limit:   ` + (item.buySell === "l" ? "Limit" : "Market"));
            console.log(`Miscellaneous:    ${item.miscellaneous}`);
            console.log("*****END TRADE SET*****");
        });
    }
}

export default KrakenRecentTrades;