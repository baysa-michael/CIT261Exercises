import KrakenPublicAPIUtilities from './utilities/krakenPublicAPIUtilities.js';
import KrakenServerTime from './model/krakenServerTime.js';
import KrakenAssetInfo from "./model/krakenAssetInfo.js";
import KrakenAssetPairs from "./model/krakenAssetPairs.js";
import KrakenTickerInformation from "./model/krakenTickerInformation.js";
import KrakenOHLCData from "./model/krakenOHLCData.js";
import KrakenOrderBook from "./model/KrakenOrderBook.js";
import KrakenRecentTrades from "./model/krakenRecentTrades.js";

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

/*
    myKrakenUtilities.getTickerInformation("xzeczusd,xzeczjpy").then((response) => {
        let testTicker = new KrakenTickerInformation(response);
        testTicker.toString();
    }).catch((error) => {
        console.log(error.toString());
    });
*/

/*
    myKrakenUtilities.getOHLCData("xzeczusd", 21600).then((response) => {
        // console.log(response);
        let testOHLCSet = new KrakenOHLCData(response);
        testOHLCSet.toString();
    }).catch((error) => {
        console.log(error.toString());
    });
*/

/*
    myKrakenUtilities.getOrderBook("xzeczusd").then((response) => {
        // console.log(response);
        let testOrderBook = new KrakenOrderBook(response);
        testOrderBook.toString();
    }).catch((error) => {
        console.log(error.toString());
    });
*/

/*
    myKrakenUtilities.getRecentTrades("xzeczusd").then((response) => {
        console.log(response);
        let testRecentTrades = new KrakenRecentTrades(response);
        testRecentTrades.toString();
    }).catch((error) => {
        console.log(error.toString());
    });
*/

    myKrakenUtilities.getRecentSpread("xzeczusd").then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error.toString());
    });

});