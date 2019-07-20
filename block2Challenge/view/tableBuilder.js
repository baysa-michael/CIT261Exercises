class TableBuilder {
    buildAssetPairTable(assetPair, baseName, quoteName, targetElement) {
        // Clear Target Element
        targetElement.innerHTML = "";

        // Set Title
        let title = document.createElement("h2");
        title.innerText = `ASSET PAIR:  ${assetPair.altName}`;
        targetElement.appendChild(title);

        // Set Information Table
        let infoTable = document.createElement("table");
        infoTable.innerHTML =
            `<thead>
                <tr>
                    <th colspan="2" class="tableSubHeader">General Information</th>
                </tr>
                <tr>
                    <th>Attribute</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Currency Pair</td>
                    <td>${assetPair.altName}</td>
                </tr>
                <tr>
                    <td>Base Currency</td>
                    <td>${baseName}</td>
                </tr>
                <tr>
                    <td>Quote Currency</td>
                    <td>${quoteName}</td>
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
                <tr>
                    <th>Attribute</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Margin Call</td>
                    <td>${assetPair.marginCall}</td>
                </tr>
                <tr>
                    <td>Margin Stop</td>
                    <td>${assetPair.marginStop}</td>
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
                <tr>
                    <th>Attribute</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>`;
        if (assetPair.leverageBuyMultipliers.length > 0) {
            assetPair.leverageBuyMultipliers.forEach((item) => {
                buyLeverageTable.innerHTML +=
                    `<tr>
                        <th>Buy Multiplier</th>
                        <th>${item}</th>
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
                <tr>
                    <th>Attribute</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>`;
        if (assetPair.leverageSellMultipliers.length > 0) {
            assetPair.leverageSellMultipliers.forEach((item) => {
                sellLeverageTable.innerHTML +=
                    `<tr>
                        <th>Sell Multiplier</th>
                        <th>${item}</th>
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
                        <th>${item[0]}</th>
                        <th>${Math.round(item[1] * 1000)/10}</th>
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
                        <th>${item[0]}</th>
                        <th>${Math.round(item[1] * 1000)/10}</th>
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
}

export default TableBuilder;