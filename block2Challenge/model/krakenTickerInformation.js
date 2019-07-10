class KrakenTickerInformation {
    constructor(jsonInfo) {
        this.errorMessage = null;
        this.tickerInfoList = [];

        // Set object if no error exists
        if (jsonInfo.error.length > 0) {
            // If object error, set error message
            this.errorMessage = jsonInfo.error[0];
        } else if (jsonInfo.hasOwnProperty("result") &&
            Object.keys(jsonInfo.result).length > 0) {
            // Construct a list from the keys
            Object.keys(jsonInfo.result).forEach((key) => {
                let tickerInfo = {
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

                this.tickerInfoList.push(tickerInfo);
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
        this.tickerInfoList.forEach((item) => {
            console.log("*****START ASSET PAIR TICKER*****");
            console.log(item.pair);
            console.log("ASK");
            console.log(`Ask Price:  ${item.askPrice}`);
            console.log(`Ask Whole Lot Volume:  ${item.askWholeLotVolume}`);
            console.log(`Ask Lot Volume: ${item.askLotVolume}`);
            console.log("BID");
            console.log(`Bid Price:  ${item.bidPrice}`);
            console.log(`Bid Whole Lot Volume:  ${item.bidWholeLotVolume}`);
            console.log(`Bid Lot Volume: ${item.bidLotVolume}`);
            console.log("LAST TRADE");
            console.log(`Last Trade Closed Price:  ${item.lastTradeClosedPrice}`);
            console.log(`Last Trade Closed Volume:  ${item.lastTradeClosedVolume}`);
            console.log("VOLUME");
            console.log(`Today's Volume:  ${item.volumeToday}`);
            console.log(`Last 24 Hours Volume:  ${item.volumeLast24Hours}`);
            console.log("WEIGHTED AVERAGE VOLUME PRICE");
            console.log(`Today's Weighted Average Volume Price:  ${item.volumeWeightedAveragePriceToday}`);
            console.log(`Last 24 Hours Weighted Average Volume Price:  ${item.volumeWeightedAveragePriceLast24Hours}`);
            console.log("TRADE COUNT");
            console.log(`Today's Count of Trades:  ${item.numberOfTradesToday}`);
            console.log(`Last 24 Hours Count of Trades:  ${item.numberOfTradesLast24Hours}`);
            console.log("OPENING, LOW, & HIGH PRICES");
            console.log(`Today's Opening Price:  ${item.openingPriceToday}`);
            console.log(`Today's Low Price:  ${item.lowToday}`);
            console.log(`Last 24 Hours Low Price:  ${item.lowLast24Hours}`);
            console.log(`Today's High Price:  ${item.highToday}`);
            console.log(`Last 24 Hours High Price:  ${item.highLast24Hours}`);
            console.log("*****END ASSET PAIR TICKER*****");
        });
    }
}

export default KrakenTickerInformation;