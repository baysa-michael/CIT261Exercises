// On Load Code
window.addEventListener("load", resetBoard);


function resetBoard() {
    // Reset Player Turn
    document.getElementById("playerTurn").innerHTML = "1";

    // Clear the current board
    let boardContainer = document.getElementById("boardContainer");
    for (let child of boardContainer.children) {
        child.remove();
    }

    // Reconstruct the board
    let board = document.createElement("table");
    for (let i = 0; i < 3; i++) {
        // Construct Board Row
        let boardRow = document.createElement("tr");

        for (let j = 0; j < 3; j++) {
            // Construct cell
            let cell = document.createElement("td");

            // Set border type
            let borderType = "2px solid black";

            // Add appropriate borders
            // Left
            if (j > 0) {
                cell.style.borderLeft = borderType;
            }

            // Right
            if (j < 2) {
                cell.style.borderRight = borderType;
            }

            // Top
            if (i > 0) {
                cell.style.borderTop = borderType;
            }

            // Bottom
            if (i < 2) {
                cell.style.borderBottom = borderType;
            }

            // Size the cell
            let cellSize = "5em";
            cell.style.height = cellSize;
            cell.style.width = cellSize;

            // Add an ID and Class to the cell
            cell.id = "Cell" + i + "-" + j;
            cell.classList.add("unselected");

            // Add click event listeners to the cell
            cell.addEventListener("click", event => {
                selectCell(cell.id);
            });

            // Append the cell to the row
            boardRow.appendChild(cell);
        }

        // Append row
        board.appendChild(boardRow);
    }

    // Collapse the borders
    board.style.borderCollapse = "collapse";

    // Append the finalized board to the target element
    boardContainer.appendChild(board);
}

function selectCellEventListener() {

}

function selectCell(cellID) {
    // Retrieve the player turn
    let currentPlayer = parseInt(document.getElementById("playerTurn").value);

    // Add a canvas element to the cell


    // Draw the appropriate symbol


    // Remove the current listener
    document.getElementById(cellID).removeEventListener()
}