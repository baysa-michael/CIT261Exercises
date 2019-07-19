import KrakenPublicAPIUtilities from './utilities/krakenPublicAPIUtilities.js';
import KrakenServerTime from './model/krakenServerTime.js';
import KrakenAssetInfo from "./model/krakenAssetInfo.js";
import KrakenAssetPairs from "./model/krakenAssetPairs.js";
import MasterController from "./controller/masterController.js";

window.addEventListener("load", async () => {
    let myKrakenUtilities = new KrakenPublicAPIUtilities();

    let serverTime = myKrakenUtilities.getServerTime().then((response) => {
        return new KrakenServerTime(response);
    }).catch((error) => {
        console.log(error.toString());
        return null;
    });

    let assetList = myKrakenUtilities.getAssetInfo().then((response) => {
        return new KrakenAssetInfo(response);
    }).catch((error) => {
        console.log(error.toString());
        return null;
    });

    let assetPairList = myKrakenUtilities.getAssetPairs().then((response) => {
        return new KrakenAssetPairs(response);
    }).catch((error) => {
        console.log(error.toString());
        return null;
    });

    // Set Controller and Target Elements
    let thisMasterController = new MasterController(await serverTime, await assetList, await assetPairList);

    // Build an Asset List
    thisMasterController.addPrimaryCurrencySelector();
});