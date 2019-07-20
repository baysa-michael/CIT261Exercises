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

    getOHLCData(assetPair, interval = 1, since = 0) {
        /*
            INTERVAL NOTES
            1 - Minutes - 1/2 Day (12 Hours) of Data
            5 - 5 Minutes - 2 1/2 Days (60 Hours) of Data
            15 - 15 Minutes - 7 1/2 Days (180 Hours) of Data
            30 - 30 Minutes - 15 Days (360 Hours) of Data
            60 - 1 Hour - 30 Days (720 Hours) of Data
            240 - 4 Hours - 120 Days (2,880 Hours) of Data
            1440 - 1 Day - 720 Days (17,280 Hours) of Data
            10080 - 1 Week -
            21600 - 15 Days -
         */

        let extendedURL = `${this.proxyBaseURL}OHLC?pair=${assetPair}&interval=${interval}&since=${since}`;

        try {
            return this.callAPI(extendedURL);
        } catch(error) {
            throw error;
        }
    }

    getOrderBook(assetPair, count = null) {
        let extendedURL = `${this.proxyBaseURL}Depth?pair=${assetPair}` + (count === null ? "" : `count=${count}`);

        try {
            return this.callAPI(extendedURL);
        } catch(error) {
            throw error;
        }
    }

    getRecentTrades(assetPair, since = null) {
        let extendedURL = `${this.proxyBaseURL}Trades?pair=${assetPair}` + (since === null ? "" : `since=${since}`);

        try {
            return this.callAPI(extendedURL);
        } catch(error) {
            throw error;
        }
    }

    getRecentSpread(assetPair, since = null) {
        let extendedURL = `${this.proxyBaseURL}Spread?pair=${assetPair}` + (since === null ? "" : `since=${since}`);

        try {
            return this.callAPI(extendedURL);
        } catch(error) {
            throw error;
        }
    }

    logServerTime(unixServerTime) {
        window.localStorage.setItem("krakenAPILastServerCall", unixServerTime);
    }

    incrementCallLimitCounter(incrementAmount) {
        // Get the current value
        let currentValue = parseInt(window.localStorage.getItem("krakenAPICallCounter"));
        let updatedValue = ((currentValue === null || isNaN(currentValue)) ? 0 : currentValue + incrementAmount);
        updatedValue = (updatedValue < 0 ? 0 : updatedValue);

        window.localStorage.setItem("krakenAPICallCounter", updatedValue);

        console.log(`Updated Call Count:  ${updatedValue}`);
    }

    decrementCallLimitCounter(newServerTime) {
        let oldServerTime = parseInt(window.localStorage.getItem("krakenAPILastServerCall"));
        let decrementAmount = Math.round((newServerTime - oldServerTime) / 3);

        // Get the current value
        let currentValue = parseInt(window.localStorage.getItem("krakenAPICallCounter"));
        let updatedValue = ((currentValue === null || isNaN(currentValue)) ? 0 : currentValue - decrementAmount);
        updatedValue = (updatedValue < 0 ? 0 : updatedValue);

        window.localStorage.setItem("krakenAPICallCounter", updatedValue);

        console.log(`Updated Call Count:  ${updatedValue}`);
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