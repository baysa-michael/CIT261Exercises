import GeneralUtilities from '../utilities/generalUtilities.js'

class KrakenOHLCData {
    constructor(jsonInfo) {
        this.errorMessage = null;
        this.pair = null;
        this.lastUnix = null;
        this.lastJS = null;
        this.ohlcList = [];

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
                if (key !== "lastUnix") {
                    this.pair = key;

                    for (let i in jsonInfo.result[key]) {
                        let ohlcRecord = {
                            rUnixTime: jsonInfo.result[key][i][0],
                            jsTime: GeneralUtilities.convertUnixTimeToJavascript(jsonInfo.result[key][i][0]),
                            rOpen: jsonInfo.result[key][i][1],
                            rHigh: jsonInfo.result[key][i][2],
                            rLow: jsonInfo.result[key][i][3],
                            rClose: jsonInfo.result[key][i][4],
                            rVwap: jsonInfo.result[key][i][5],
                            rVolume: jsonInfo.result[key][i][6],
                            rCount: jsonInfo.result[key][i][7]
                        };

                        this.ohlcList.push(ohlcRecord);
                    }
                }
            });
        } else {
            this.errorMessage = "ERROR:  Result Missing - " +
                "Unable to Create KrakenOHLCData Object";
        }
    }

    toString() {
        console.log("**********Kraken OHLC Data Display:");
        console.log(`Error Message:  ${this.errorMessage}`);
        console.log(`Asset Pair : ${this.pair}`);
        console.log(`Last Time (Unix) : ${this.lastUnix}`);
        console.log(`Last Time (Javascript) : ${this.lastJS}`);
        this.ohlcList.forEach((item) => {
            console.log("*****START OHLC SET*****");
            console.log(`Unix Time:  ${item.rUnixTime}`);
            console.log(`JavaScript Time:  ${item.jsTime}`);
            console.log(`Open:   ${item.rOpen}`);
            console.log(`High:   ${item.rHigh}`);
            console.log(`Low:    ${item.rLow}`);
            console.log(`Close:  ${item.rClose}`);
            console.log(`Volume Weighted Average Price:  ${item.rVwap}`);
            console.log(`Volume:  ${item.rVolume}`);
            console.log(`Count:  ${item.rCount}`);
            console.log("*****END OHLC SET*****");
        });
    }
}

export default KrakenOHLCData;