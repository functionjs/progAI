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

   // Equilibrium function
    function equilibrium(a, b, c) {
                                      return a ^ b ^ c;
    }

gameLog.innerHTML = `...`;   

makeTurn.disabled = true; //!
startGame.disabled = false; //!
let logMessage = ""

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
                                    let startMessage = `<h1>New Game Started! </h1> Game Number: ${gameNumber} <br>`;
                                     gameLog.innerHTML = startMessage;

                                    
                                     

                                     if(gameNumber % 2 === 0)currentPlayer = gamer2Name
                                     else                    currentPlayer = gamer1Name
                                     let currPlayerMessage = `<span>${currentPlayer}'s Turn </span><br>`;
                                      gameLog.innerHTML += currPlayerMessage;
                                      gameState.innerHTML= startMessage + currPlayerMessage;
                                      winnerOfGame.innerHTML = ""; // Clear previous winner

                                    A = generateRandomAccount(1, 10);
                                    B = generateRandomAccount(1, 10);
                                    C = generateRandomAccount(1, 10);
                                     accountA.value = A;
                                     accountB.value = B;
                                     accountC.value = C;
                                      makeTurn.disabled = false; //!
                                      startGame.disabled = true; //!
                                  });

                                      function changed(X, x){
                                                             if(x!=X) return 1;
                                                             else     return 0;
                                      }
                                      function partnerOf(currentPlayer){
                                                         return (currentPlayer === gamer1Name) ? gamer2Name : gamer1Name;     

                                      }
 makeTurn.addEventListener("click", 
                           ////------------on every turn--------------------------------------------
                          () => {
                                 // Get input values
                                   const accA = parseInt(accountA.value);
                                   const accB = parseInt(accountB.value);
                                   const accC = parseInt(accountC.value);
                                    
                                   // Test if the current Game is over by checking if all accounts are zero
                                   let isAllZero = (accA + accB + accC === 0)
                                   let howManyAccountsChanged = changed(accA, A) + changed(accB, B) + changed(accC, C)                 
                                    let isCheating = (accA < 0) || (accB < 0) || (accC < 0) ||
                                                     (accA > A) || (accB > B) || (accC > C) ||
                                                      howManyAccountsChanged != 1; // Only one account should change per turn

                                      // Player should not cheat and coins must exist
                                      if (isCheating || isAllZero ) {
                                         if(isCheating) {
                                            gameState.innerHTML= `<h2>Cheating detected!</h2>`;
                                            looser = currentPlayer
                                            winner = partnerOf(currentPlayer);     
                                         }   
                                         if(isAllZero) {
                                            gameState.innerHTML= `<h2>All accounts are zero!</h2>`;
                                            winner = currentPlayer
                                            looser = partnerOf(currentPlayer);
                                         }
                                          logMessage = `<span class=fired>${looser} is fired!</span><br>`;
                                           gameLog.innerHTML += logMessage;
                                           gameState.innerHTML += logMessage + `<h2>${winner} wins the game! </h2> `;
                                          winnerOfGame.innerHTML = winner
                                          gameActive = false;
                                          makeTurn.disabled = true; //!
                                          startGame.disabled = false; //!
                                           return;
                                      }
                                         
                                   
                                        // do move
                                        A = accA;
                                        B = accB;   
                                        C = accC;   
                                          // set new values to input fields
                                         accountA.value = A;
                                         accountB.value = B;
                                         accountC.value = C;           

                                         //todo message about my succefull move
                                         // Log move
                                          logMessage = `<p>${currentPlayer} removed coins. Accounts: A=${A}, B=${B}, C=${C}</p>` 
                                          // Switch player
                                           currentPlayer = partnerOf(currentPlayer);
                                            logMessage += `<span>Now ${currentPlayer}'s Turn </span><br>`;
                                             gameLog.innerHTML += logMessage;
                                              gameState.innerHTML = logMessage; 
                                        
                                              //todo message about Robo1 thinking and moving
                                              //............................................
                                               // logics for Robo1 to play "smart" 
                                               if(equilibrium(A, B, C) === 0) {
                                                  // Robo1 to draw the Game!
                                                  if(A > 0) A--;
                                                  else if(B > 0) B--;
                                                       else if(C > 0) C--;
                                               }    
                                               else // Robo1 to play random moves
                                                    if(A > 0) A = generateRandomAccount(0, A);
                                                    else if(B > 0) B = generateRandomAccount(0, B);
                                                         else if(C > 0) C = generateRandomAccount(0, C);
                                                 
                                          // set new values to input fields
                                          accountA.value = A;
                                          accountB.value = B;
                                          accountC.value = C;           
                                           // Log move
                                           logMessage = `<p>${currentPlayer} removed coins. Accounts: A=${A}, B=${B}, C=${C}</p>`
                                            gameLog.innerHTML += logMessage;
                                            gameState.innerHTML += logMessage; 
                               
                                           // Switch player
                                           currentPlayer = partnerOf(currentPlayer);
                                           logMessage = `<span>Now ${currentPlayer}'s Turn </span><br>`;
                                            gameLog.innerHTML += logMessage;
                                            gameState.innerHTML += logMessage;
                               
                                   

                                 });

