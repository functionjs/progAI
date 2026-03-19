// script.js
console.log("js code for Game 1 loaded");

// Game State variables
var gamer0Name = "Manager1";
var gamer1Name = "🤖1";
var gamer = [gamer0Name, gamer1Name];
var gameNumber = -1;
var gameActive    = false;
var currentPlayer = 0 ; // Will hold index of the  name of the current player: gamer0Name or gamer1Name; currentPlayer ^ 1 will give the index of the other player  
var A,B,C; // Account balances

   function generateRandomAccount(from, to) {
       return Math.round(from + Math.random() * (to - from));
   }

   // Equilibrium function
    function equilibrium(a, b, c) {
                                      return a ^ b ^ c; // XOR operation to determine if the current state is a winning position (non-zero) or losing position (zero)
                                                        // 3 ^ 2 = 1 (winning position)
                                                        // 1 ^ 2 = 3 (winning position)
                                                        // 3 ^ 1 = 2 (winning position)
                                                        // 1 ^ 3 ^ 2 = 0 (losing position)
                                                        // 3 ^ 3 = 0 (losing position)
                                                        // 2 ^ 2 = 0 (losing position)

                                                        // 1 ^ 1 = 0 (losing position)
                                                        // 1 ^ 0 = 1 (winning position)
                                                        // 0 ^ 0 = 0 (losing position)

                                                        // binary representation of the accounts can also be used to analyze the game state and determine optimal moves for Robo1.
                                                        // 3 : 011
                                                        // 2 : 010
                                                        // 1 : 001
                                                        // 0 : 000
                                                        // The XOR operation helps to identify winning and losing positions based on the binary representation of the accounts.

                                                        // 3 : 011
                                                        // 2 : 010
                                                        // -------- XOR
                                                        // 1 : 001

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

                                    if(playerName.value.trim() == "") playerName.value = gamer0Name;
                                       else                           {gamer0Name = playerName.value; gamer[0] = gamer0Name;}

                                    if(partnerName.value.trim() == "")partnerName.value = gamer1Name;
                                       else                           {gamer1Name = partnerName.value; gamer[1] = gamer1Name;}
                                          

                                    gameNumber++;
                                    let startMessage = `<h1>New Game Started! </h1> Game Number: ${gameNumber} <br>`;
                                     gameLog.innerHTML = startMessage;

                                    currentPlayer = gameNumber % 2 // currentPlayer will alternate between 0 and 1 for each new game, ensuring that the starting player changes every game.
                                     let currPlayerMessage = `<span>${gamer[currentPlayer]}'s Turn </span><br>`;
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
                                      playerName.disabled = true; //!
                                      partnerName.disabled = true; //!
                                  });

                                      function changed(X, x){
                                                             if(x!=X) return 1;
                                                             else     return 0;
                                      }
                                      function partnerOf(currentPlayerIndex){
                                                         return currentPlayerIndex ^ 1;
                                      }

                                      function getAccountsFromHTML(){
                                        return [ parseInt(accountA.value), parseInt(accountB.value), parseInt(accountC.value)];
                                      }

                                      function getAccountsFromRobo1(){
                                        // logics for Robo1 to play "smart" 
                                              [accA, accB, accC] = getAccountsFromHTML(); 
                                               if(equilibrium(accA, accB, accC) === 0) {
                                                  // Robo1 to draw the Game!
                                                  if(accA > 0) accA--;
                                                  else if(accB > 0) accB--;
                                                       else if(accC > 0) accC--;
                                               }    
                                               else // Robo1 to play random moves
                                                    if(accA > 0) accA = generateRandomAccount(0, accA-1);
                                                    else if(accB > 0) accB = generateRandomAccount(0, accB-1);
                                                         else if(accC > 0) accC = generateRandomAccount(0, accC-1);
                                                 return [ accA, accB, accC];
                                      }

 makeTurn.addEventListener("click", 
                           ////------------on every turn--------------------------------------------
                          () => {
                                 // Get input values
                                 [accA, accB , accC] = getAccountsFromHTML()
                                    
                                   // Test if the current Game is over by checking if all accounts are zero
                                   let sumAllZero = (accA + accB + accC === 0)
                                   let howManyAccountsChanged = changed(accA, A) + changed(accB, B) + changed(accC, C)                 
                                    let isCheating = (accA < 0) || (accB < 0) || (accC < 0) ||
                                                     (accA > A) || (accB > B) || (accC > C) ||
                                                      howManyAccountsChanged != 1; // Only one account should change per turn

                                      // Player should not cheat and coins must exist
                                      if (isCheating || sumAllZero ) {
                                         if(isCheating) {
                                            gameState.innerHTML= `<h2>Cheating detected!</h2>`;
                                            looser = currentPlayer
                                            winner = partnerOf(currentPlayer);     
                                         }   
                                         if(sumAllZero) {
                                            gameState.innerHTML= `<h2>All accounts are zero!</h2>`;
                                            winner = currentPlayer
                                            looser = partnerOf(currentPlayer);
                                         }
                                          logMessage = `<span class=fired>${gamer[looser]} is fired!</span><br>`;
                                           gameLog.innerHTML   += logMessage;
                                           gameState.innerHTML += logMessage + `<h2>${gamer[winner]} wins the game! </h2> `;
                                          winnerOfGame.innerHTML = gamer[winner]
                                          gameActive = false;
                                          makeTurn.disabled = true; //!
                                          startGame.disabled = false; //!
                                          playerName.disabled = false; //!
                                          partnerName.disabled = false; //!
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
                                          logMessage = `<p>${gamer[currentPlayer]} removed coins. Accounts: A=${A}, B=${B}, C=${C}</p>` 
                                          // Switch player
                                           currentPlayer = partnerOf(currentPlayer);
                                            logMessage += `<span>Now ${gamer[currentPlayer]}'s Turn </span><br>`;
                                             gameLog.innerHTML += logMessage;
                                              gameState.innerHTML = logMessage; 
                                        
                                              //todo message about Robo1 thinking and moving
                                              //............................................
                                               // logics for Robo1 to play "smart" 
                                              [accA, accB, accC] = getAccountsFromRobo1();
                                                // Test if the current Game is over by checking if all accounts are zero
                                                sumAllZero = (accA + accB + accC === 0)
                                                howManyAccountsChanged = changed(accA, A) + changed(accB, B) + changed(accC, C)                 
                                                isCheating = (accA < 0) || (accB < 0) || (accC < 0) ||
                                                             (accA > A) || (accB > B) || (accC > C) ||
                                                              howManyAccountsChanged != 1; // Only one account should change per turn

                                                  // Player should not cheat and coins must exist
                                                  if (isCheating || sumAllZero ) {
                                                     if(isCheating) {
                                                                      gameState.innerHTML= `<h2>Cheating detected!</h2>`;
                                                                      looser = currentPlayer
                                                                      winner = partnerOf(currentPlayer);     
                                                      }   
                                          if(sumAllZero) {
                                            gameState.innerHTML= `<h2>All accounts are zero!</h2>`;
                                            winner = currentPlayer
                                            looser = partnerOf(currentPlayer);
                                         }
                                          logMessage = `<span class=fired>${gamer[looser]} is fired!</span><br>`;
                                           gameLog.innerHTML += logMessage;
                                           gameState.innerHTML += logMessage + `<h2>${gamer[winner]} wins the game! </h2> `;
                                           winnerOfGame.innerHTML = gamer[winner] 
                                           gameActive = false;
                                           makeTurn.disabled = true; //!
                                           startGame.disabled = false; //!
                                           playerName.disabled = false; //!
                                           partnerName.disabled = false; //!
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

