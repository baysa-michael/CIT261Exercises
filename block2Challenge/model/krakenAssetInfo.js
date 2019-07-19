class KrakenAssetInfo {
    constructor(jsonInfo) {
        this.errorMessage = null;
        this.assetInfoList = [];

        // Set object if no error exists
        if (jsonInfo.error.length > 0) {
            // If object error, set error message
            this.errorMessage = jsonInfo.error[0];
        } else if (jsonInfo.hasOwnProperty("result") &&
                    Object.keys(jsonInfo.result).length > 0) {
            // Construct a list from the keys
            Object.keys(jsonInfo.result).forEach((key) => {
                let assetInfo = {
                    primaryName: key.toUpperCase(),
                    altName: jsonInfo.result[key].altname.toUpperCase(),
                    assetClass: jsonInfo.result[key].aclass.toUpperCase(),
                    precision: jsonInfo.result[key].decimals,
                    displayPrecision: jsonInfo.result[key].display_decimals
                };

                this.assetInfoList.push(assetInfo);
            });
        } else {
            this.errorMessage = "ERROR:  Result Missing - " +
                "Unable to Create KrakenAssetInfo Object";
        }
    }

    getAssetInfoListContaining(targetAsset) {
        return this.assetInfoList.filter((item) => {
            return (item.primaryName === targetAsset || item.altName === targetAsset);
        });
    }

    toString() {
        console.log("**********Kraken Asset Info Display:");
        console.log(`Error Message:  ${this.errorMessage}`);
        console.log(`Asset List:`);
        this.assetInfoList.forEach((item) => {
            console.log(`${item.primaryName} (${item.altName}):  Asset Class - ${item.assetClass};  Precision - ${item.precision}; Display Precision - ${item.displayPrecision}`);
        });
    }
}

export default KrakenAssetInfo;