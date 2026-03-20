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

var gamer00   //  = Gamer0  Behaviour; 
var gamer01   // =  Gamer1  Behaviour;                                      
   

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
                                                                      // logics for Robo2 to play near smart (not dumb version) 
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

let createGamerBehaviour = function(howGetAndSetAccount) { // This function creates a behavior for a gamer based on the provided method for getting and setting account values.
                           let getAndSetAccount = howGetAndSetAccount; // closure to hold the method for getting and setting account values, allowing for different behaviors for different gamers (e.g., human player vs. Robo1).
                            return function() { 
                                 // Get input values
                                 [accA, accB , accC] = getAndSetAccount()
                                    
                                   // Test if the current Game is over by checking if all accounts are zero
                                   let sumAllZero = (accA + accB + accC === 0)
                                   let howManyAccountsChanged = changed(accA, A) + changed(accB, B) + changed(accC, C)                 
                                    let isCheating = (accA < 0) || (accB < 0) || (accC < 0) ||
                                                     (accA > A) || (accB > B) || (accC > C) ||
                                                      howManyAccountsChanged != 1; // Only one account should change per turn

                                      // Player should not cheat and coins must exist
                                      if (isCheating || sumAllZero ) { //end of current game round
                                         if(isCheating) {  // cheater is looser and the other player is winner
                                            gameState.innerHTML= `<h2>Cheating detected!</h2>`;
                                            looser = currentPlayer
                                            winner = partnerOf(currentPlayer);     
                                         }   
                                         else // if(sumAllZero) // current player is winner and the other player is looser
                                            {
                                              gameState.innerHTML= `<h2>All accounts are zero!</h2>`;
                                              winner = currentPlayer
                                              looser = partnerOf(currentPlayer);
                                            }
                                           logMessage = `<span class=fired>${gamer[looser]} is fired!</span><br>`;
                                            gameLog.innerHTML   += logMessage;
                                            gameState.innerHTML += logMessage + `<h2>${gamer[winner]} wins the game! </h2> `;
                                           winnerOfGame.innerHTML = gamer[winner]
                                           gameActive = false;
                                           
                                           startGame.disabled = false; //!
                                           playerName.disabled = false; //!
                                           partnerName.disabled = false; //!
                                           makeTurnGamer2.disabled =true;
                                           makeTurnGamer1.disabled =true;
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

                                          if(makeTurnGamer1.disabled){makeTurnGamer1.disabled =false; makeTurnGamer2.disabled =true;}
                                                     else            {makeTurnGamer1.disabled =true; makeTurnGamer2.disabled =false;}    
                            }
}



 
//adding Event Listener to button with id=startGame
 startGame.addEventListener("click", 
                            //// ------------Start Game------------------------------
                            () => {
                                    gameActive = true;

                                    if(playerName.value.trim() == "") playerName.value = gamer0Name;
                                       else                           {gamer0Name = playerName.value; gamer[0] = gamer0Name;}

                                    if(partnerName.value.trim() == "")partnerName.value = gamer1Name;
                                       else                           {gamer1Name = partnerName.value; gamer[1] = gamer1Name;}

                                     if(gamer0Name === "Robo1")gamer00 = createGamerBehaviour(getAccountsFromRobo1); 
                                     else if(gamer0Name === "Robo2")gamer00 = createGamerBehaviour(getAccountsFromRobo2); 
                                          else if(gamer0Name === "Robo3")gamer00 = createGamerBehaviour(getAccountsFromRobo3); 
                                                else   gamer00   = createGamerBehaviour(getAccountsFromHTML); 

                                     if(gamer1Name === "Robo1")gamer01 = createGamerBehaviour(getAccountsFromRobo1); 
                                     else if(gamer1Name === "Robo2")gamer01 = createGamerBehaviour(getAccountsFromRobo2); 
                                          else if(gamer1Name === "Robo3")gamer01 = createGamerBehaviour(getAccountsFromRobo3); 
                                                else   gamer01   = createGamerBehaviour(getAccountsFromHTML); 
                                                
                                      makeTurnGamer1.addEventListener("click", gamer00 ) ;
                                      makeTurnGamer2.addEventListener("click", gamer01 ) ;


                                    gameNumber++;
                                    if(gameNumber%2==0){makeTurnGamer1.disabled =false; makeTurnGamer2.disabled =true;}
                                       else            {makeTurnGamer1.disabled =true; makeTurnGamer2.disabled =false;}
                                           
                                    let startMessage = `<h1>New Game Started! </h1> Game Number: ${gameNumber} <br>`;
                                     gameLog.innerHTML = startMessage;

                                    currentPlayer = gameNumber % 2 // currentPlayer will alternate between 0 and 1 for each new game, ensuring that the starting player changes every game.
                                     let currPlayerMessage = `<span>${gamer[currentPlayer]}'s Turn </span><br>`;
                                      gameLog.innerHTML += currPlayerMessage;
                                      gameState.innerHTML= startMessage + currPlayerMessage;
                                      winnerOfGame.innerHTML = ""; // Clear previous winner

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

 
 



