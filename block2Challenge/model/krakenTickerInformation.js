class KrakenTickerInformation {
    constructor(jsonInfo) {
        this.errorMessage = null;
        this.assetPairList = [];

        // Set object if no error exists
        if (jsonInfo.error.length > 0) {
            // If object error, set error message
            this.errorMessage = jsonInfo.error[0];
        } else if (jsonInfo.hasOwnProperty("result") &&
            Object.keys(jsonInfo.result).length > 0) {
            // Construct a list from the keys
            Object.keys(jsonInfo.result).forEach((key) => {
                let assetPair = {
                    pair: key.toUpperCase(),
                    askPrice: jsonInfo.result[key].a[0],
                    askWholeLotVolume: jsonInfo.result[key].a[1],
                    askLotVolume: jsonInfo.result[key].a[2],
                    bidPrice: jsonInfo.result[key].b[0],
                    bidWholeLotVolume: jsonInfo.result[key].b[1],
                    bidLotVolume: jsonInfo.result[key].b[2],
                    lastTradeClosedPrice: jsonInfo.result[key].c[0],
                    lastTradeClosedVolume: jsonInfo.result[key].c[1],
                    volumeToday: jsonInfo.result[key].v[0],
                    volumeLast24Hours: jsonInfo.result[key].v[1],
                    volumeWeightedAveragePriceToday: jsonInfo.result[key].p[0],
                    volumeWeightedAveragePriceLast24Hours: jsonInfo.result[key].p[1],
                    numberOfTradesToday: jsonInfo.result[key].t[0],
                    numberOfTradesLast24Hours: jsonInfo.result[key].t[1],
                    lowToday: jsonInfo.result[key].l[0],
                    lowLast24Hours: jsonInfo.result[key].l[1],
                    highToday: jsonInfo.result[key].h[0],
                    highLast24Hours: jsonInfo.result[key].h[1],
                    openingPriceToday: jsonInfo.result[key].o,
                };

                this.assetPairList.push(assetPair);
            });
        } else {
            this.errorMessage = "ERROR:  Result Missing - " +
                "Unable to Create KrakenTickerInformation Object";
        }
    }

    toString() {
        console.log("**********Kraken Ticker Information Display:");
        console.log(`Error Message:  ${this.errorMessage}`);
        console.log(`Asset Pair Ticker List:`);
        this.assetPairList.forEach((item) => {
            console.log("*****START ASSET PAIR TICKER*****");
            console.log(item.pair);
            console.log("ASK:");
            console.log(`Margin Call - ${item.marginCall}; Margin Stop - ${item.marginStop}`);
            console.log("Leverage Buy Multipliers:");
            console.log(item.leverageBuyMultipliers);
            console.log("Leverage Sell Multipliers:");
            console.log(item.leverageSellMultipliers);
            console.log("Fees - Taker:");
            console.log(item.feesTaker);
            console.log("Fees - Maker:");
            console.log(item.feesMaker);
            console.log("*****END ASSET PAIR TICKER*****");
        });
    }
}

export default KrakenTickerInformation;