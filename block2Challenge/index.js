import KrakenPublicAPIUtilities from './utilities/krakenPublicAPIUtilities.js';
import KrakenServerTime from './model/krakenServerTime.js';
import KrakenAssetInfo from "./model/krakenAssetInfo.js";
import KrakenAssetPairs from "./model/krakenAssetPairs.js";

window.addEventListener("load", () => {
    let myKrakenUtilities = new KrakenPublicAPIUtilities();

    // Test Getting Server Time
/*
    myKrakenUtilities.getServerTime().then((response) => {
        // Create a Time Object
        let currentTime = new KrakenServerTime(response);
        currentTime.toString();
    }).catch((error) => {
        console.log(error.toString());
    });
*/

    // Test Getting Asset Info
/*
    myKrakenUtilities.getAssetInfo().then((response) => {
        let currentAssetList = new KrakenAssetInfo(response);
        currentAssetList.toString();
    }).catch((error) => {
        console.log(error.toString());
    });
*/

/*
    myKrakenUtilities.getAssetPairs().then((response) => {
        let assetPairs = new KrakenAssetPairs(response);
        assetPairs.toString();
    }).catch((error) => {
        console.log(error.toString());
    });
*/

    myKrakenUtilities.getTickerInformation("xzeczusd").then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error.toString());
    });
});