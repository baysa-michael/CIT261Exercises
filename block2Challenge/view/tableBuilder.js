class TableBuilder {
    formatTool1 = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
    });

    formatTool2 = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    formatTool3 = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        maximumFractionDigits: 0
    });

    buildAssetPairTable(assetPair, baseName, quoteName, targetElement) {
        // Clear Target Element
        targetElement.innerHTML = "";

        // Set Title
        let title = document.createElement("h3");
        title.innerText = `ASSET PAIR:  ${assetPair.altName}`;
        targetElement.appendChild(title);

        // Set Information Table
        let infoTable = document.createElement("table");
        infoTable.innerHTML =
            `<thead>
                <tr>
                    <th colspan="2" class="tableSubHeader">General Information</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Currency Pair</td>
                    <td class="centerAlign">${assetPair.altName}</td>
                </tr>
                <tr>
                    <td>Base Currency</td>
                    <td class="centerAlign">${baseName}</td>
                </tr>
                <tr>
                    <td>Quote Currency</td>
                    <td class="centerAlign">${quoteName}</td>
                </tr>
            </tbody>`;
        targetElement.appendChild(infoTable);

        // Set Margin Table
        let marginTable = document.createElement("table");
        marginTable.innerHTML =
            `<thead>
                <tr>
                    <th colspan="2" class="tableSubHeader">Margin Trading Information</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Margin Call</td>
                    <td class="centerAlign">${assetPair.marginCall}</td>
                </tr>
                <tr>
                    <td>Margin Stop</td>
                    <td class="centerAlign">${assetPair.marginStop}</td>
                </tr>
            </tbody>`;
        targetElement.appendChild(marginTable);

        // Set Buy Leverage Table
        let buyLeverageTable = document.createElement("table");
        buyLeverageTable.innerHTML =
            `<thead>
                <tr>
                    <th colspan="2" class="tableSubHeader">Buy Leverage Information</th>
                </tr>
            </thead>
            <tbody>`;
        if (assetPair.leverageBuyMultipliers.length > 0) {
            assetPair.leverageBuyMultipliers.forEach((item) => {
                buyLeverageTable.innerHTML +=
                    `<tr>
                        <td>Buy Multiplier</td>
                        <td class="centerAlign">${item}</td>
                    </tr>`;
            });
        } else {
            buyLeverageTable.innerHTML +=
                `<tr>
                    <td colspan="2">N/A</td>
                </tr>`;
        }
        buyLeverageTable.innerHTML += `</tbody>`;
        targetElement.appendChild(buyLeverageTable);

        // Set Sell Leverage Table
        let sellLeverageTable = document.createElement("table");
        sellLeverageTable.innerHTML =
            `<thead>
                <tr>
                    <th colspan="2" class="tableSubHeader">Sell Leverage Information</th>
                </tr>
            </thead>
            <tbody>`;
        if (assetPair.leverageSellMultipliers.length > 0) {
            assetPair.leverageSellMultipliers.forEach((item) => {
                sellLeverageTable.innerHTML +=
                    `<tr>
                        <td>Sell Multiplier</td>
                        <td class="centerAlign">${item}</td>
                    </tr>`;
            });
        } else {
            sellLeverageTable.innerHTML +=
                `<tr>
                    <td colspan="2">N/A</td>
                </tr>`;
        }
        sellLeverageTable.innerHTML += `</tbody>`;
        targetElement.appendChild(sellLeverageTable);

        // Set Maker Fees Table
        let makerFeesTable = document.createElement("table");
        makerFeesTable.innerHTML =
            `<thead>
                <tr>
                    <th colspan="2" class="tableSubHeader">Maker Fees Information</th>
                </tr>
                <tr>
                    <th>30 Day Volume</th>
                    <th>Fee Percentage</th>
                </tr>
            </thead>
            <tbody>`;
        if (assetPair.feesMaker.length > 0) {
            assetPair.feesMaker.forEach((item) => {
                makerFeesTable.innerHTML +=
                    `<tr>
                        <td>${this.formatTool3.format(item[0])}</td>
                        <td class="centerAlign">${Math.round(item[1] * 1000)/10}</td>
                    </tr>`;
            });
        } else {
            makerFeesTable.innerHTML +=
                `<tr>
                    <td colspan="2">N/A</td>
                </tr>`;
        }
        makerFeesTable.innerHTML += `</tbody>`;
        targetElement.appendChild(makerFeesTable);

        // Set Taker Fees Table
        let takerFeesTable = document.createElement("table");
        takerFeesTable.innerHTML =
            `<thead>
                <tr>
                    <th colspan="2" class="tableSubHeader">Taker Fees Information</th>
                </tr>
                <tr>
                    <th>30 Day Volume</th>
                    <th>Fee Percentage</th>
                </tr>
            </thead>
            <tbody>`;
        if (assetPair.feesTaker.length > 0) {
            assetPair.feesTaker.forEach((item) => {
                takerFeesTable.innerHTML +=
                    `<tr>
                        <td>${this.formatTool3.format(item[0])}</td>
                        <td class="centerAlign">${Math.round(item[1] * 1000)/10}</td>
                    </tr>`;
            });
        } else {
            takerFeesTable.innerHTML +=
                `<tr>
                    <td colspan="2">N/A</td>
                </tr>`;
        }
        takerFeesTable.innerHTML += `</tbody>`;
        targetElement.appendChild(takerFeesTable);
    }

    buildOHLCTable(ohlcData, targetElement) {
        // Clear Target Element
        targetElement.innerHTML = "";

        // Set Title
        let title = document.createElement("h3");
        title.innerText = `LAST 30 DAYS OHLC`;
        targetElement.appendChild(title);

        // Set Information Table
        let ohlcTable = document.createElement("table");
        ohlcTable.innerHTML =
            `<thead>
                <tr>
                    <th>Time</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Close</th>
                    <th>Volume</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>`;
        if (ohlcData.ohlcList.length > 0) {
            ohlcData.ohlcList.forEach((item) => {
                ohlcTable.innerHTML +=
                    `<tr>
                        <td class="centerAlign">${item.jsTime.getMonth()}/${item.jsTime.getDate()}/${item.jsTime.getFullYear()}</td>
                        <td class="rightAlign">${this.formatTool1.format(item.rOpen)}</td>
                        <td class="rightAlign">${this.formatTool1.format(item.rHigh)}</td>
                        <td class="rightAlign">${this.formatTool1.format(item.rLow)}</td>
                        <td class="rightAlign">${this.formatTool1.format(item.rClose)}</td>
                        <td class="rightAlign">${this.formatTool2.format(item.rVolume)}</td>
                        <td class="rightAlign">${this.formatTool3.format(item.rCount)}</td>
                    </tr>`;
            });
        } else {
            ohlcTable.innerHTML +=
                `<tr>
                    <td colspan="2">N/A</td>
                </tr>`;
        }
        ohlcTable.innerHTML += `</tbody>`;
        targetElement.appendChild(ohlcTable);

    }
}

export default TableBuilder;