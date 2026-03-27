// script.js
console.log("js code for Game 1 loaded");

// Game State variables
var gamer0Name = "Manager1";
var gamer1Name = "Robo1🤖";
var gamer = [gamer0Name, gamer1Name];
var currentPlayer = 0 ; // Will hold index of the  name of the current player: gamer0Name or gamer1Name; currentPlayer ^ 1 will give the index of the other player  
var gameNumber = -1;
var gameActive    = false;
var A,B,C; // Account balances

var gamer00behaviour   //  = Gamer0  Behaviour; 
var gamer01behaviour   // =  Gamer1  Behaviour;  
//  handler references
var handler00 = null; //helper to remove old event listeners when starting a new game with different player types (e.g., switching from human to Robo1 or vice versa)
var handler01 = null; //helper to remove old event listeners when starting a new game with different player types (e.g., switching from human to Robo1 or vice versa)                                  
var getPlayer0AccountsFrom =  null; // This variable will hold the method for getting and setting account values, allowing for different behaviors for different gamers (e.g., human player vs. Robo1).
var getPlayer1AccountsFrom =  null; // This variable will hold the method for getting and setting account values, allowing for different behaviors for different gamers (e.g., human player vs. Robo1).

gameLog.innerHTML = `...`;   

makeTurnGamer2.disabled = true; //!
makeTurnGamer1.disabled = true; //!
startGame.disabled = false; //!
var logMessage = ""



                                      function generateRandomMoney(min, max){
                                                 return min + Math.floor(Math.random() * (max - min + 1)) ;
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

                                      function changed(X, x){// Check if the value X has changed relative to value x
                                                             if(x!=X) return 1;
                                                             else     return 0;
                                      }
                                      function partnerOf(currentPlayerIndex){// Get the index of the other player
                                                         return currentPlayerIndex ^ 1;
                                      }

                                          function getAccountsFromHTML(){// Get current account values from HTML input fields
                                                   console.log("Getting accounts from HTML");
                                                   return [ parseInt(accountA.value), parseInt(accountB.value), parseInt(accountC.value)];
                                          }
                                      function getAccountsFromRobo1(){// Get current account values from HTML input fields and apply
                                                                      // logics for Robo1 to play "smart" (dumb version: just play random moves) 
                                              [accA, accB, accC] = [A,B,C] 
                                               console.log("Getting accounts from Robo1 logic: ", accA, accB, accC);
                                               if(equilibrium(accA, accB, accC) === 0) {
                                                  // Robo1 to draw the Game!
                                                  if(accA > 0) accA--;
                                                  else if(accB > 0) accB--;
                                                       else if(accC > 0) accC--;
                                               }    
                                               else // Robo1 to play random moves
                                                    if(accA > 0) accA = generateRandomMoney(0, accA-1);
                                                    else if(accB > 0) accB = generateRandomMoney(0, accB-1);
                                                         else if(accC > 0) accC = generateRandomMoney(0, accC-1);
                                                 return [ accA, accB, accC];
                                      }
                                      function getAccountsFromRobo2(){// Get current account values from HTML input fields and apply
                                                                      // logics for Robo2 to play near optimal (not dumb version) 
                                              [accA, accB, accC] = [A,B,C] 
                                                console.log("Getting accounts from Robo2 logic: ", accA, accB, accC);
                                               if(equilibrium(accA, accB, accC) === 0) {
                                                  // Robo2 to tie the Game!
                                                 /* 
                                                  if(accA > 0) accA--;
                                                  else if(accB > 0) accB--;
                                                       else if(accC > 0) accC--;
                                                 */       
                                               }    
                                               else // Robo2 to play near optimal moves
                                                    {
                                                     /* 
                                                     if(accA > 0) accA = generateRandomMoney(0, accA-1);
                                                     else if(accB > 0) accB = generateRandomMoney(0, accB-1);
                                                         else if(accC > 0) accC = generateRandomMoney(0, accC-1);
                                                     */    
                                                    }      
                                                 return [ accA, accB, accC];
                                      }
                                      function getAccountsFromRobo3(){// Get current account values from HTML input fields and apply
                                                                      // logics for Robo3 to play  absolute smart!
                                              [accA, accB, accC] = [A,B,C] 
                                                console.log("Getting accounts from Robo3 logic: ", accA, accB, accC);
                                               if(equilibrium(accA, accB, accC) === 0) {
                                                  // Robo3 to tie the Game!
                                                 /* 
                                                  if(accA > 0) accA--;
                                                  else if(accB > 0) accB--;
                                                       else if(accC > 0) accC--;
                                                 */       
                                               }    
                                               else // Robo3 to play  optimal moves!
                                                    {
                                                     /* 
                                                     if(accA > 0) accA = generateRandomMoney(0, accA-1);
                                                     else if(accB > 0) accB = generateRandomMoney(0, accB-1);
                                                         else if(accC > 0) accC = generateRandomMoney(0, accC-1);
                                                     */    
                                                    }      
                                                 return [ accA, accB, accC];
                                      }

                                      function rotateWolf(index) {
                                                                   let trans= "rotate(0deg)"; 
                                                                    if (index > 0) trans = "rotate(180deg)";
                                                                     wolfImage.style.transform = trans;
                                                                 }

    let gamerCallbackedTurn = function(howGetAndSetAccountCallback) { // This function creates a behavior for a gamer based on the provided method for getting and setting account values.
                                            rotateWolf(currentPlayer); // Rotate the wolf image based on the current player index, providing a visual indication of which player's turn it is.
                                 // Get input values
                                   [accA, accB , accC] = howGetAndSetAccountCallback();
                                    
                                   // Test if the current Game is over by checking if all accounts are zero
                                   let sumAllZero = (accA + accB + accC === 0)
                                   let howManyAccountsChanged = changed(accA, A) + changed(accB, B) + changed(accC, C)                 
                                    let isCheating = (accA < 0) || (accB < 0) || (accC < 0) ||
                                                     (accA > A) || (accB > B) || (accC > C) ||
                                                      howManyAccountsChanged != 1; // Only one account should change per turn
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
                                          logMessage = ` ${gamer[currentPlayer]} removed coins. Current accounts: A=${A}, B=${B}, C=${C}` 
                                           gameLog.innerHTML += logMessage;
                                      // Player should not cheat and coins must exist
                                      if (isCheating || sumAllZero ) { //end of current game round
                                         if(isCheating) {  // cheater is looser and the other player is winner
                                            gameState.innerHTML= `<h3>Cheating detected!</h3>`;
                                            looser = currentPlayer
                                            winner = partnerOf(currentPlayer);     
                                         }   
                                         else // if(sumAllZero) // current player is winner and the other player is looser
                                            {
                                              gameState.innerHTML= `<h3>All accounts are zero!</h3>`;
                                              winner = currentPlayer
                                              looser = partnerOf(currentPlayer);
                                            }
                                           logMessage = `<span class=fired> ${gamer[looser]} is fired!</span>`;
                                            gameLog.innerHTML   += logMessage;
                                            gameState.innerHTML += logMessage + `<h2>${gamer[winner]} wins the game! </h2> `;
                                           gameActive = false;
                                           
                                           startGame.disabled = false; //!
                                           playerName.disabled = false; //!
                                           partnerName.disabled = false; //!
                                           makeTurnGamer2.disabled =true;
                                           makeTurnGamer1.disabled =true;
                                            return;
                                      }

                                          // Switch player
                                           currentPlayer = partnerOf(currentPlayer);
                                            logMessage = `<br><span>  Now ${gamer[currentPlayer]}'s Turn </span>`;
                                             gameLog.innerHTML += logMessage;
                                              gameState.innerHTML = logMessage; 

                                          if(makeTurnGamer1.disabled){makeTurnGamer1.disabled =false; makeTurnGamer2.disabled =true;}
                                                     else            {makeTurnGamer1.disabled =true; makeTurnGamer2.disabled =false;}    
                                    }
 //adding Event Listener to button with id=startGame
  startGame.addEventListener("click", 
                            //// ------------Start Game------------------------------
                            () => {
                                    gameActive = true;

                                    if(playerName.value.trim() == "") playerName.value = gamer0Name;// If the player name input field is empty, use the default gamer0Name; otherwise, update gamer0Name with the value from the input field and update the gamer array accordingly.
                                    else                             {gamer0Name = playerName.value; gamer[0] = gamer0Name;}

                                    if(partnerName.value.trim() == "")partnerName.value = gamer1Name;
                                    else                             {gamer1Name = partnerName.value; gamer[1] = gamer1Name;}

                                     if(gamer0Name.startsWith("Robo1"))getPlayer0AccountsFrom = getAccountsFromRobo1 ; 
                                     else if(gamer0Name.startsWith("Robo2"))getPlayer0AccountsFrom = getAccountsFromRobo2; 
                                          else if(gamer0Name.startsWith("Robo3"))getPlayer0AccountsFrom = getAccountsFromRobo3; 
                                               else   getPlayer0AccountsFrom   = getAccountsFromHTML; 

                                     if(gamer1Name.startsWith("Robo1"))getPlayer1AccountsFrom = getAccountsFromRobo1 ; 
                                     else if(gamer1Name.startsWith("Robo2"))getPlayer1AccountsFrom = getAccountsFromRobo2; 
                                          else if(gamer1Name.startsWith("Robo3"))getPlayer1AccountsFrom = getAccountsFromRobo3; 
                                                else   getPlayer1AccountsFrom   = getAccountsFromHTML    ; 
                                                
                                      // WITH these four lines:
                                      if (handler00) makeTurnGamer1.removeEventListener("click", handler00); // remove old
                                      if (handler01) makeTurnGamer2.removeEventListener("click", handler01); // remove old

                                         handler00 = gamer00behaviour;  // save reference
                                         handler01 = gamer01behaviour;

                                    ++gameNumber;// Increment the game number at the start of each new game, allowing for tracking of how many games have been played and alternating which player starts each game based on whether the game number is even or odd.
                                     if(gameNumber%2==0){makeTurnGamer1.disabled =false; makeTurnGamer2.disabled =true;} // Alternate which player starts each game: if gameNumber is even, gamer0 starts; if odd, gamer1 starts.
                                     else               {makeTurnGamer1.disabled =true; makeTurnGamer2.disabled =false;}
                                           
                                    let startMessage = `<h5> Game Number: ${gameNumber} Started! </h5>`;
                                     gameLog.innerHTML = startMessage;

                                    currentPlayer = gameNumber % 2 // currentPlayer will alternate between 0 and 1 for each new game, ensuring that the starting player changes every game.
                                     let currPlayerMessage = `<span>${gamer[currentPlayer]}'s Turn </span>`;
                                      gameLog.innerHTML += currPlayerMessage;
                                      gameState.innerHTML= startMessage + currPlayerMessage;
                                      
                                    // Initialize accounts with random values between 1 and 10 for each account (A, B, C) at the start of each game, and update the corresponding input fields in the HTML to reflect these initial values.  
                                    A = generateRandomMoney(1, 10);
                                    B = generateRandomMoney(1, 10);
                                    C = generateRandomMoney(1, 10);
                                     accountA.value = A;
                                     accountB.value = B;
                                     accountC.value = C;

                                      startGame.disabled = true; //!
                                      playerName.disabled = true; //!
                                      partnerName.disabled = true; //!
                                  });

makeTurnGamer1.addEventListener("click", handler00); // add fresh
makeTurnGamer2.addEventListener("click", handler01); // add fresh


 
 



