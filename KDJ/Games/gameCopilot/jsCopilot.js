// Equilibrium function: XOR sum of accounts
function equilibrium(a, b, c) {
  return a ^ b ^ c;
}

// Global state
let player = "";
let partner = "";
let accounts = { a: 0, b: 0, c: 0 };
let turn = "player"; // alternates between player and partner

// Start Game
document.getElementById("startGame").addEventListener("click", () => {
  player = document.getElementById("playerName").value;
  partner = document.getElementById("partnerName").value;
  accounts.a = parseInt(document.getElementById("accountA").value);
  accounts.b = parseInt(document.getElementById("accountB").value);
  accounts.c = parseInt(document.getElementById("accountC").value);

  document.getElementById("gameState").innerText =
    `Game started! ${player} vs ${partner}. Accounts: A=${accounts.a}, B=${accounts.b}, C=${accounts.c}`;
});

// Make Turn
document.getElementById("makeTurn").addEventListener("click", () => {
  if (turn === "player") {
    // Player chooses manually (for simplicity, reduce A by 1 if possible)
    if (accounts.a > 0) accounts.a--;
    turn = "partner";
  } else {
    // Partner logic
    if (partner === "Robo1") {
      randomMove();
    } else if (partner === "Robo2") {
      smartMove(true); // smart but with mistakes
    } else if (partner === "Robo3") {
      smartMove(false); // perfect smart
    } else {
      randomMove(); // default
    }
    turn = "player";
  }

  updateState();
});

// Random bot move
function randomMove() {
  let keys = ["a", "b", "c"];
  let choice = keys[Math.floor(Math.random() * 3)];
  if (accounts[choice] > 0) accounts[choice]--;
}

// Smart bot move
function smartMove(withMistake) {
  let xorSum = equilibrium(accounts.a, accounts.b, accounts.c);
  if (xorSum === 0 || withMistake) {
    randomMove(); // mistake or no winning move
  } else {
    // Find account to adjust
    for (let key of ["a", "b", "c"]) {
      let target = accounts[key] ^ xorSum;
      if (target < accounts[key]) {
        accounts[key] = target;
        return;
      }
    }
    randomMove(); // fallback
  }
}

// Update state
function updateState() {
  document.getElementById("gameState").innerText =
    `Accounts: A=${accounts.a}, B=${accounts.b}, C=${accounts.c}. Turn: ${turn}`;

  if (accounts.a === 0 && accounts.b === 0 && accounts.c === 0) {
    document.getElementById("winner").innerText =
      `${turn === "player" ? partner : player} wins!`;
  }
}