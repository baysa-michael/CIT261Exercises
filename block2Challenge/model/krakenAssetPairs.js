class KrakenAssetPairs {
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
                    primaryName: key.toUpperCase(),
                    altName: jsonInfo.result[key].altname.toUpperCase(),
                    webSocketName:  (jsonInfo.result[key].wsname === undefined ? null : jsonInfo.result[key].wsname.toUpperCase()),
                    baseName: jsonInfo.result[key].base.toUpperCase(),
                    baseAssetClass:  jsonInfo.result[key].aclass_base.toUpperCase(),
                    quoteName:  jsonInfo.result[key].quote.toUpperCase(),
                    quoteAssetClass:  jsonInfo.result[key].aclass_quote.toUpperCase(),
                    pairDecimals: jsonInfo.result[key].pair_decimals,
                    lot: jsonInfo.result[key].lot.toUpperCase(),
                    lotDecimals: jsonInfo.result[key].lot_decimals,
                    lotMultiplier: jsonInfo.result[key].lot_multiplier,
                    marginCall:  jsonInfo.result[key].margin_call,
                    marginStop:  jsonInfo.result[key].margin_stop,
                    leverageBuyMultipliers:  jsonInfo.result[key].leverage_buy,
                    leverageSellMultipliers:  jsonInfo.result[key].leverage_sell,
                    feesTaker:  jsonInfo.result[key].fees,
                    feesMaker:  jsonInfo.result[key].fees_maker
                };

                this.assetPairList.push(assetPair);
            });
        } else {
            this.errorMessage = "ERROR:  Result Missing - " +
                "Unable to Create KrakenAssetPairs Object";
        }
    }

    getAssetPairListContaining(targetAsset) {
        return this.assetPairList.filter((item) => {
            return (item.baseName === targetAsset || item.quoteName === targetAsset);
        });
    }

    getAssetPair(primaryCurrency, secondaryCurrency) {
        return this.assetPairList.filter((item) => {
            return ((item.baseName === primaryCurrency && item.quoteName === secondaryCurrency) ||
                (item.baseName === secondaryCurrency && item.quoteName === primaryCurrency) &&
                (!item.primaryName.includes(".D")));
        });
    }

    toString() {
        console.log("**********Kraken Asset Pair Display:");
        console.log(`Error Message:  ${this.errorMessage}`);
        console.log(`Asset Pair List:`);
        this.assetPairList.forEach((item) => {
            console.log("*****START ASSET PAIR*****");
            console.log("General Information:");
            console.log(`${item.primaryName} (${item.altName}):  Web Socket Name - ${item.webSocketName}; Base Asset - ${item.baseName} (${item.baseAssetClass}); Quote Asset - ${item.quoteName} (${item.quoteAssetClass}); Pair Decimals - ${item.pairDecimals}; Lot, Decimals, and Multiplier - ${item.lot}, ${item.lotDecimals}, ${item.lotMultiplier}`);
            console.log("Margin Information:");
            console.log(`Margin Call - ${item.marginCall}; Margin Stop - ${item.marginStop}`);
            console.log("Leverage Buy Multipliers:");
            console.log(item.leverageBuyMultipliers);
            console.log("Leverage Sell Multipliers:");
            console.log(item.leverageSellMultipliers);
            console.log("Fees - Taker:");
            console.log(item.feesTaker);
            console.log("Fees - Maker:");
            console.log(item.feesMaker);
            console.log("*****END ASSET PAIR*****");
        });
    }
}

export default KrakenAssetPairs;