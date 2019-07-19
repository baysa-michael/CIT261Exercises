import ViewBuilder from "../view/viewBuilder.js";

class MasterController {
    constructor(serverTime, assetList, assetPairList) {
        this.serverTime = serverTime;
        this.assetList = assetList;
        this.assetPairList = assetPairList;
        this.primaryCurrencyDiv = document.getElementById("primaryCurrencyDiv");
        this.secondaryCurrencyDiv = document.getElementById("secondaryCurrencyDiv");

        this.primaryCurrency = null;
        this.secondaryCurrency = null;
        this.currencyPair = null;

        this.myViewBuilder = new ViewBuilder();
    }

    addPrimaryCurrencySelector() {
        // Create the Primary Currency Dropdown
        let primaryCurrencyMenu = this.myViewBuilder.addCurrencyMenu(this.assetList.assetInfoList,
            "primaryCurrency", "Primary Currency");

        console.log(this.assetList);

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

            let secondaryCurrencyMenu = this.myViewBuilder.addCurrencyMenu(filteredAssetList,
                "secondaryCurrency", "Secondary Currency");

            secondaryCurrencyMenu.addEventListener("change", (event) => {
                this.secondaryCurrency = event.target.value;
                this.retrieveAssetPairInformation();
            });

            this.secondaryCurrencyDiv.appendChild(secondaryCurrencyMenu);
        }
    }

    retrieveAssetPairInformation() {

    }
}

export default MasterController;