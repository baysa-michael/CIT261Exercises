class KrakenPublicAPIUtilities {
    constructor() {
        this.proxyURL = "https://cors-anywhere.herokuapp.com/";
        this.baseURL = "https://api.kraken.com/0/public/";
        this.proxyBaseURL = this.proxyURL + this.baseURL;
        this.options = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };
    }

    async callAPI(extendedURL) {
        return fetch(extendedURL, this.options)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    return response.json();
                }
            }).catch((error) => {
                throw error;
            });
    }

    getServerTime() {
        let extendedURL = this.proxyBaseURL + "Time";

        try {
            return this.callAPI(extendedURL);
        } catch(error) {
            throw error;
        }
    }

    getAssetInfo(targetAssets = null) {
        let extendedURL = this.proxyBaseURL + "Assets";

        if (targetAssets !== null) {
            extendedURL += "?asset=";

            let isFirstAsset = true;
            targetAssets.forEach((asset) => {
                extendedURL += (isFirstAsset ? "" : ",") + asset;

                if (isFirstAsset) {
                    isFirstAsset = false;
                }
            });
        }

        try {
            return this.callAPI(extendedURL);
        } catch(error) {
            throw error;
        }
    }

    getAssetPairs(targetInfo = null, targetPairs = null) {
        let extendedURL = this.proxyBaseURL + "AssetPairs";

        if (targetInfo !== null || targetPairs !== null) {
            extendedURL += "?asset=";

            if ((targetInfo !== null) === (targetPairs !== null)) {
                extendedURL += `info=${targetInfo}&pair=${targetPairs}`;
            } else if (targetInfo !== null) {
                extendedURL += `info=${targetInfo}`;
            } else {
                extendedURL += `pair=${targetPairs}`;
            }
        }

        try {
            return this.callAPI(extendedURL);
        } catch(error) {
            throw error;
        }
    }

    getTickerInformation(assetPairList) {
        let extendedURL = this.proxyBaseURL + "Ticker?pair=" + assetPairList;

        try {
            return this.callAPI(extendedURL);
        } catch(error) {
            throw error;
        }
    }

    getServerTime2() {
        let xmlhttp = new XMLHttpRequest();
        let extendedURL = this.proxyBaseURL + "Time";

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let myArr = JSON.parse(this.responseText);
                console.log(myArr);
            }
        };
        xmlhttp.open("GET", extendedURL, true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send();
    }
}

export default KrakenPublicAPIUtilities;