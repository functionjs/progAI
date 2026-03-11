// script.js
let currentPlayer = "Manager 1";
let gameActive = false;

document.getElementById("startBtn").addEventListener("click", () => {
    gameActive = true;
    document.getElementById("gameState").textContent = ${currentPlayer}'s Turn;
    document.getElementById("turnBtn").disabled = false;
});

document.getElementById("turnBtn").addEventListener("click", () => {
    if (!gameActive) return;

    // Get input values
    const accA = parseInt(document.getElementById("accA").value);
    const accB = parseInt(document.getElementById("accB").value);
    const accC = parseInt(document.getElementById("accC").value);

    // Validate move (e.g., at least one coin removed)
    if (accA + accB + accC === 0) {
        document.getElementById("gameState").textContent = ${currentPlayer} is fired!;
        gameActive = false;
        return;
    }

    // Log move
    const log = document.getElementById("log");
    log.innerHTML += <p>${currentPlayer} removed coins. Accounts: A=${accA}, B=${accB}, C=${accC}</p>;

    // Switch player
    currentPlayer = currentPlayer === "Manager 1" ? document.getElementById("partnerName").value : "Manager 1";
    document.getElementById("gameState").textContent = ${currentPlayer}'s Turn;
});

