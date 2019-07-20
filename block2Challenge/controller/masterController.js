import MenuBuilder from "../view/menuBuilder.js";
import TableBuilder from "../view/tableBuilder.js";
import KrakenPublicAPIUtilities from '../utilities/krakenPublicAPIUtilities.js';
import Chart from "../utilities/node_modules/chart.js/dist/Chart.js";

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
    }

    addPrimaryCurrencySelector() {
        // Create the Primary Currency Dropdown
        let primaryCurrencyMenu = this.myMenuBuilder.addCurrencyMenu(this.assetList.assetInfoList,
            "primaryCurrency", "Primary Currency");

        primaryCurrencyMenu.addEventListener("change", (event) => {
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
        }
    }

    async retrieveAssetPairInformation() {
        // Return the currency pair
        this.assetPair = this.assetPairList.getAssetPair(this.primaryCurrency, this.secondaryCurrency)[0];
        this.currencyPairName = this.assetPair.primaryName;

        this.baseAsset = this.assetList.getAssetInfoListContaining(this.assetPair.baseName)[0];
        this.quoteAsset = this.assetList.getAssetInfoListContaining(this.assetPair.quoteName)[0];

        // Retrieve the currency pair information
        let returnTicker = this.apiInterface.getTickerInformation(this.currencyPairName).then((response) => {
            return response;
        }).catch((error) => {
            console.log(error.toString());
        });

        let returnOHLCData = this.apiInterface.getOHLCData(this.currencyPairName, 1440).then((response) => {
            return response;
        }).catch((error) => {
            console.log(error.toString());
        });

        let returnOrderBook = this.apiInterface.getOrderBook(this.currencyPairName).then((response) => {
            return response;
        }).catch((error) => {
            console.log(error.toString());
        });

        let returnRecentTrades = this.apiInterface.getRecentTrades(this.currencyPairName).then((response) => {
            return response;
        }).catch((error) => {
            console.log(error.toString());
        });

        let returnRecentSpread = this.apiInterface.getRecentSpread(this.currencyPairName).then((response) => {
            return response;
        }).catch((error) => {
            console.log(error.toString());
        });

        this.setAssetPairInformation(
            await returnTicker,
            await returnOHLCData,
            await returnOrderBook,
            await returnRecentTrades,
            await returnRecentSpread);

        this.displayAssetPairInformation();
    }

    setAssetPairInformation(ticker, ohlcData, orderBook, recentTrades, recentSpread) {
        this.tickerInfo = ticker;
        this.ohlcData = ohlcData;
        this.orderBook = orderBook;
        this.recentTrades = recentTrades;
        this.recentSpread = recentSpread;

        console.log(this.assetPair);
/*
        console.log(this.tickerInfo);
        console.log(this.ohlcData);
        console.log(this.orderBook);
        console.log(this.recentTrades);
        console.log(this.recentSpread);
*/
    }

    displayAssetPairInformation() {
        this.myTableBuilder.buildAssetPairTable(this.assetPair, this.baseAsset.altName, this.quoteAsset.altName, this.assetPairDiv);
    }
}

export default MasterController;