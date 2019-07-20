import MenuBuilder from "../view/menuBuilder.js";
import TableBuilder from "../view/tableBuilder.js";
import KrakenPublicAPIUtilities from '../utilities/krakenPublicAPIUtilities.js';
import KrakenTickerInformation from "../model/krakenTickerInformation.js";
import KrakenOHLCData from "../model/krakenOHLCData.js";
import KrakenOrderBook from "../model/KrakenOrderBook.js";
import KrakenRecentTrades from "../model/krakenRecentTrades.js";
import KrakenRecentSpread from "../model/krakenRecentSpread.js";
import KrakenServerTime from "../model/krakenServerTime.js";

class MasterController {
    constructor(serverTime, assetList, assetPairList) {
        this.serverTime = serverTime;
        this.assetList = assetList;
        this.assetPairList = assetPairList;
        this.primaryCurrencyDiv = document.getElementById("primaryCurrencyDiv");
        this.secondaryCurrencyDiv = document.getElementById("secondaryCurrencyDiv");
        this.assetPairDiv = document.getElementById("assetPair");
        this.tickerInfoDiv = document.getElementById("tickerInfo");
        this.ohlcDataDiv = document.getElementById("ohlcData");
        this.orderBookDiv = document.getElementById("orderBook");
        this.recentTradesDiv = document.getElementById("recentTrades");
        this.recentSpreadDiv = document.getElementById("recentSpread");

        this.apiInterface = new KrakenPublicAPIUtilities();
        this.myMenuBuilder = new MenuBuilder();
        this.myTableBuilder = new TableBuilder();

        this.primaryCurrency = null;
        this.secondaryCurrency = null;
        this.currencyPairName = null;

        this.assetPair = null;
        this.baseAsset = null;
        this.quoteAsset = null;
        this.tickerInfo = null;
        this.ohlcData = null;
        this.orderBook = null;
        this.recentTrades = null;
        this.recentSpread = null;

        this.apiInterface.logServerTime(this.serverTime.unixtime);
        this.apiInterface.incrementCallLimitCounter(3);
    }

    addPrimaryCurrencySelector() {
        // Create the Primary Currency Dropdown
        let primaryCurrencyMenu = this.myMenuBuilder.addCurrencyMenu(this.assetList.assetInfoList,
            "primaryCurrency", "Primary Currency");

        primaryCurrencyMenu.addEventListener("change", (event) => {
            // Clear old display
            this.secondaryCurrencyDiv.innerHTML = "";
            this.assetPairDiv.innerHTML = "";
            this.tickerInfoDiv.innerHTML = "";
            this.ohlcDataDiv.innerHTML = "";
            this.orderBookDiv.innerHTML = "";
            this.recentTradesDiv.innerHTML = "";
            this.recentSpreadDiv.innerHTML = "";


            this.primaryCurrency = event.target.value;
            this.addSecondaryCurrencySelector();
        });

        this.primaryCurrencyDiv.appendChild(primaryCurrencyMenu);
    }

    addSecondaryCurrencySelector() {
        // Clear the current secondary currency menu
        this.secondaryCurrencyDiv.innerHTML = "";

        // Create a filtered Asset List for corresponding currencies to the target currency
        let filteredAssetPairList = this.assetPairList.getAssetPairListContaining(this.primaryCurrency);

        if (filteredAssetPairList.length > 0) {

            let filteredAssetList = [];
            filteredAssetPairList.forEach((item) => {
                if (item.baseName === this.primaryCurrency && !item.primaryName.includes(".D")) {
                    filteredAssetList.push(this.assetList.getAssetInfoListContaining(item.quoteName)[0]);
                } else if (item.quoteName === this.primaryCurrency && !item.primaryName.includes(".D")) {
                    filteredAssetList.push(this.assetList.getAssetInfoListContaining(item.baseName)[0]);
                }
            });

            let secondaryCurrencyMenu = this.myMenuBuilder.addCurrencyMenu(filteredAssetList,
                "secondaryCurrency", "Secondary Currency");

            secondaryCurrencyMenu.addEventListener("change", (event) => {
                this.secondaryCurrency = event.target.value;
                this.retrieveAssetPairInformation();
            });

            this.secondaryCurrencyDiv.appendChild(secondaryCurrencyMenu);
        } else {
            let noAssetMessage = document.createElement("p");
            noAssetMessage.innerText = "The selected primary asset is not paired up with any other assets.";

            this.secondaryCurrencyDiv.appendChild(noAssetMessage);
        }
    }

    async retrieveAssetPairInformation() {
        // Return the currency pair
        this.assetPair = this.assetPairList.getAssetPair(this.primaryCurrency, this.secondaryCurrency)[0];
        this.currencyPairName = this.assetPair.primaryName;

        this.baseAsset = this.assetList.getAssetInfoListContaining(this.assetPair.baseName)[0];
        this.quoteAsset = this.assetList.getAssetInfoListContaining(this.assetPair.quoteName)[0];

        // Retrieve the updated server time
        let returnTime = this.apiInterface.getServerTime().then((response) => {
            return new KrakenServerTime(response);
        });

        // Retrieve the currency pair information
        let returnTicker = this.apiInterface.getTickerInformation(this.currencyPairName).then((response) => {
            return new KrakenTickerInformation(response);
        }).catch((error) => {
            console.log(error.toString());
        });

        let returnOHLCData = this.apiInterface.getOHLCData(this.currencyPairName, 1440, this.serverTime.unixtime - (60 * 60 * 24 * 30)).then((response) => {
            return new KrakenOHLCData(response);
        }).catch((error) => {
            console.log(error.toString());
        });

        let returnOrderBook = this.apiInterface.getOrderBook(this.currencyPairName).then((response) => {
            return new KrakenOrderBook(response);
        }).catch((error) => {
            console.log(error.toString());
        });

        let returnRecentTrades = this.apiInterface.getRecentTrades(this.currencyPairName).then((response) => {
            return new KrakenRecentTrades(response);
        }).catch((error) => {
            console.log(error.toString());
        });

        let returnRecentSpread = this.apiInterface.getRecentSpread(this.currencyPairName).then((response) => {
            return new KrakenRecentSpread(response);
        }).catch((error) => {
            console.log(error.toString());
        });

        this.setAssetPairInformation(
            await returnTime,
            await returnTicker,
            await returnOHLCData,
            await returnOrderBook,
            await returnRecentTrades,
            await returnRecentSpread);

        this.displayAssetPairInformation();
    }

    setAssetPairInformation(serverTime, ticker, ohlcData, orderBook, recentTrades, recentSpread) {
        // Decrement the call counter based on time
        this.apiInterface.decrementCallLimitCounter(serverTime.unixtime);

        // Load the Data
        this.serverTime = serverTime;
        this.tickerInfo = ticker;
        this.ohlcData = ohlcData;
        this.orderBook = orderBook;
        this.recentTrades = recentTrades;
        this.recentSpread = recentSpread;

        // Update the Server Time and Increment Counter
        this.apiInterface.logServerTime(this.serverTime.unixtime);
        this.apiInterface.incrementCallLimitCounter(6);

/*
        console.log(this.ohlcData);
        console.log(this.assetPair);
        console.log(this.tickerInfo);
        console.log(this.orderBook);
        console.log(this.recentTrades);
        console.log(this.recentSpread);
*/
    }

    displayAssetPairInformation() {
        this.myTableBuilder.buildAssetPairTable(this.assetPair, this.baseAsset.altName, this.quoteAsset.altName, this.assetPairDiv);
        this.myTableBuilder.buildOHLCTable(this.ohlcData, this.ohlcDataDiv);
    }
}

export default MasterController;