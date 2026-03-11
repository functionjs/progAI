// script.js
let currentPlayer = "Manager 1";
let gameActive = false;

startGame.addEventListener("click", () => {
    gameActive = true;
    gameLog.textContent = `${currentPlayer}'s Turn`;
    makeTurn.disabled = false;
});

 makeTurn.addEventListener("click", () => {
    if (!gameActive) return;

    // Get input values
    const accA = parseInt(accountA.value);
    const accB = parseInt(accountB.value);
    const accC = parseInt(accountC.value);

    // Validate move (e.g., at least one coin removed)
    if (accA + accB + accC === 0) {
        gameLog.textContent += `${currentPlayer} is fired!`;
        gameActive = false;
        return;
    }

    // Log move
    
    gameLog.innerHTML += `<p>${currentPlayer} removed coins. Accounts: A=${accA}, B=${accB}, C=${accC}</p>`;

    // Switch player
    currentPlayer = currentPlayer === "Manager 1" ? document.getElementById("partnerName").value : "Manager 1";
    gameLog.textContent += `${currentPlayer}'s Turn`;
});

