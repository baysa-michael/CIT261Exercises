import GeneralUtilities from "../utilities/generalUtilities.js";

class KrakenOrderBook {
    constructor(jsonInfo) {
        this.errorMessage = null;
        this.pair = null;
        this.askList = [];
        this.bidList = [];

        // Set object if no error exists
        if (jsonInfo.error.length > 0) {
            // If object error, set error message
            this.errorMessage = jsonInfo.error[0];
        } else if (jsonInfo.hasOwnProperty("result") &&
            Object.keys(jsonInfo.result).length === 1) {

            // Set Object Name
            this.pair = Object.keys(jsonInfo.result)[0];

            // Construct the Ask and Bid Arrays
            for (let i in jsonInfo.result[this.pair]["asks"]) {
                let askRecord = {
                    price: jsonInfo.result[this.pair]["asks"][i][0],
                    volume: jsonInfo.result[this.pair]["asks"][i][1],
                    unixTime: jsonInfo.result[this.pair]["asks"][i][2],
                    jsTime: GeneralUtilities.convertUnixTimeToJavascript(jsonInfo.result[this.pair]["asks"][i][2])
                }

                this.askList.push(askRecord);
            }

            for (let i in jsonInfo.result[this.pair]["bids"]) {
                let bidRecord = {
                    price: jsonInfo.result[this.pair]["bids"][i][0],
                    volume: jsonInfo.result[this.pair]["bids"][i][1],
                    unixTime: jsonInfo.result[this.pair]["bids"][i][2],
                    jsTime: GeneralUtilities.convertUnixTimeToJavascript(jsonInfo.result[this.pair]["bids"][i][2])
                }

                this.askList.push(bidRecord);
            }
        } else {
            this.errorMessage = "ERROR:  Result Missing - " +
                "Unable to Create KrakenOHLCData Object";
        }
    }

    toString() {
        console.log("**********Kraken Order Book Display:");
        console.log(`Error Message:  ${this.errorMessage}`);
        console.log(`Asset Pair : ${this.pair}`);
        this.askList.forEach((item) => {
            console.log("*****START ASK RECORDS*****");
            console.log(`Ask Price:  ${item.price}`);
            console.log(`Ask Volume:  ${item.volume}`);
            console.log(`Unix Time:  ${item.unixTime}`);
            console.log(`Javascript Time:  ${item.jsTime}`);
            console.log("*****END ASK RECORDS*****");
        });
        this.bidList.forEach((item) => {
            console.log("*****START BID RECORDS*****");
            console.log(`Bid Price:  ${item.price}`);
            console.log(`Bid Volume:  ${item.volume}`);
            console.log(`Unix Time:  ${item.unixTime}`);
            console.log(`Javascript Time:  ${item.jsTime}`);
            console.log("*****END BID RECORDS*****");
        });
    }
}

export default KrakenOrderBook;