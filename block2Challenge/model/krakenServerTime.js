import GeneralUtilities from '../utilities/generalUtilities.js'

class KrakenServerTime {
    constructor(jsonInfo) {
        this.errorMessage = null;
        this.rfc1123 = null;
        this.unixtime = null;
        this.jstime = null;

        // Set object if no error exists
        if (jsonInfo.error.length > 0) {
            this.errorMessage = jsonInfo.error[0];
        } else if (jsonInfo.hasOwnProperty("result")) {
            if (jsonInfo.result.hasOwnProperty("rfc1123") &&
                jsonInfo.result.hasOwnProperty("unixtime")) {
                // Set the key values of the object
                this.rfc1123 = jsonInfo.result.rfc1123;
                this.unixtime = jsonInfo.result.unixtime;
                this.jstime = GeneralUtilities.convertUnixTimeToJavascript(this.unixtime);
            } else {
                this.errorMessage = "ERROR:  Unexpected Values in JSON Input - " +
                    "Unable to Create KrakenServerTime Object";
            }
        } else {
            this.errorMessage = "ERROR:  Result Missing - " +
                "Unable to Create KrakenServerTime Object";
        }
    }

    toString() {
        console.log("**********Kraken Server Time Display:");
        console.log(`Error Message:  ${this.errorMessage}`)
        console.log(`RFC1123 Time:  ${this.rfc1123}`);
        console.log(`Unix Time:  ${this.unixtime}`);
        console.log(`JavaScript Time:  ${this.jstime}`);
    }
}

export default KrakenServerTime;