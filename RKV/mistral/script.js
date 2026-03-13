// script.js
console.log("js code for Game 1 loaded");

// Game State variables
var gamer1Name = "Manager 1";
var gamer2Name = "Robo1";
var gameNumber = 0;
var gameActive    = false;
var currentPlayer ; // Will hold the name of the current player: gamer1Name or gamer2Name
var A,B,C; // Account balances

   function generateRandomAccount(from, to) {
       return Math.round(from + Math.random() * (to - from));
   }

gameLog.innerHTML = `Testing gameLog ...`;   
//adding Event Listener to button with id=startGame
 startGame.addEventListener("click", 
                            //// ------------Start Game------------------------------
                            () => {
                                    gameActive = true;

                                    if(playerName.value.trim() == "") {
                                        playerName.value = gamer1Name;
                                     }   
                                    if(partnerName.value.trim() == "") {
                                        partnerName.value = gamer2Name;
                                     }     


                                    gameNumber++;
                                     gameLog.innerHTML = `<h1>New Game Started! </h1> Game Number: ${gameNumber} <br>`;
                                     
                                     

                                     if(gameNumber % 2 === 0)currentPlayer = gamer2Name
                                     else                    currentPlayer = gamer1Name
                                      gameLog.innerHTML += `<span>${currentPlayer}'s Turn </span><br>`;


                                    A = generateRandomAccount(1, 10);
                                    B = generateRandomAccount(1, 10);
                                    C = generateRandomAccount(1, 10);
                                     accountA.value = A;
                                     accountB.value = B;
                                     accountC.value = C;
                                      makeTurn.disabled = false; //?
                                  });

 

 makeTurn.addEventListener("click", 
                           ////------------on every turn--------------------------------------------
                          () => {
                                  console.log("click on turn button");
                                  if (!gameActive) return;
                                  
                                  console.log("testing current turn");
                                 // Get input values
                                   const accA = parseInt(accountA.value);
                                   const accB = parseInt(accountB.value);
                                   const accC = parseInt(accountC.value);
                               
                                   // Validate move (e.g., at least one coin removed)
                                   // to do: add more validation rules if needed!

                                   // Test if the current is over by checking if all accounts are zero
                                   if (accA + accB + accC === 0) {
                                       gameLog.innerHTML += `<span class=fired>${currentPlayer} is fired!</span><br>`;
                                       winner = (currentPlayer === gamer1Name) ? gamer2Name : gamer1Name;     
                                        gameActive = false;
                                         return;
                                   }
                               
                                   // Log move
                                   gameLog.innerHTML += `<p>${currentPlayer} removed coins. Accounts: A=${accA}, B=${accB}, C=${accC}</p>`;
                               
                                   // Switch player
                                   currentPlayer = currentPlayer === "Manager 1" ? document.getElementById("partnerName").value : "Manager 1";
                                   gameLog.innerHTML += `<span>${currentPlayer}'s Turn </span><br>`;
                               
                                   

                                 });

