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

//var gamer00behaviour   //  = Gamer0  Behaviour; 
//var gamer01behaviour   // =  Gamer1  Behaviour;  
//  handler references
var getPlayer0AccountsFrom =  (e) => {}; // This variable will hold the method for getting and setting account values, allowing for different behaviors for different gamers (e.g., human player vs. Robo1).
var getPlayer1AccountsFrom =  (e) => {}; // This variable will hold the method for getting and setting account values, allowing for different behaviors for different gamers (e.g., human player vs. Robo1).
var handlerEnvelope00 = (e) => {}; // This variable will hold the event handler for gamer 0's turn, allowing for dynamic assignment of behavior based on the type of player (human or Robo).
var handlerEnvelope01 = (e) => {}; // This variable will hold the event handler for gamer 1's turn, allowing for dynamic assignment of behavior based on the type of player (human or Robo).

gameLogDiv.innerHTML = `...`;   

makeTurnGamer2Button.disabled = true; //!
makeTurnGamer1Button.disabled = true; //!
startGameButton.disabled = false; //!
var logMessage = ""

var controller = new AbortController();



                                      function generateRandomMoney(min, max){// Generate a random integer between min and max (inclusive) to initialize account balances at the start of each game, ensuring variability in the game state and different scenarios for players to navigate.
                                                 return min + Math.floor(Math.random() * (max - min + 1)) ;
                                      }

                                      // Equilibrium function for 3 accounts (a, b, c) to determine if the current game state is a winning position (non-zero) or losing position (zero) for the current player, based on the XOR operation applied to the account balances. This function helps to identify optimal moves for Robo1 by analyzing the binary representation of the account balances and determining whether the current state is favorable for the player or not.
                                      function equilibrium(a, b, c) {
                                          return a ^ b ^ c; // XOR operation to determine if the current state is a winning position (non-zero) or losing position (zero)
                                                        // 3 ^ 2 = 1 (winning position if You will do correct moves)
                                                        // 1 ^ 2 = 3 (winning position if You will do correct moves)
                                                        // 3 ^ 1 = 2 (winning position if You will do correct moves)
                                                        // 3 ^ 3 = 0 (losing position in any case, no matter what move you do)
                                                        // 2 ^ 2 = 0 (losing position in any case, no matter what move you do)

                                                        // 1 ^ 1 = 0 (losing position in any case, no matter what move you do)
                                                        // 1 ^ 0 = 1 (winning position if You will do correct moves)
                                                        // 0 ^ 0 = 0 (losing position in any case, no matter what move you do)

                                                        // binary representation of the accounts can also be used to analyze the game state and determine optimal moves for Robo1.
                                                        // 3 :0011
                                                        // 2 :0010
                                                        // 1 :0001
                                                        // 0 :0000
                                                        // 4 :0100
                                                        // 5 :0101
                                                        // 6 :0110
                                                        // 7 :0111    
                                                        // 8 :1000
                                                        // 9 :1001
                                                        // 10:1010       
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

                                      function randomMove(accounts){
                                        //let accounts = [A,B,C] ;
                                         let n = Math.floor(Math.random()*3)
                                          if(accounts[n]==0) return randomMove(accounts); // If the randomly selected account is already zero, recursively call randomMove to select a different account until a non-zero account is chosen.
                                          
                                          accounts[n] -= Math.floor(Math.random()* (accounts[n]-1))+1;
                                           return accounts;
                                      }

                                          function smartMove(accounts, withMistake=false){
                                            //let accounts = [A,B,C] ;
                                             let xor = equilibrium(accounts[0],accounts[1],accounts[2]);
                                          
                                              if(xor === 0 || (withMistake && Math.random()<0.2)){
                                                  return randomMove(accounts);
                                              }
                                               // accounts=[2, 3, 4]   xor= 2^3^4 =5    
                                               //                          (2^5)^3^4  = 0  =>  (2^5)=7 > 2   => bad!
                                               //                           2^(3^5)^4 = 0  =>  (3^5)=6 > 3   => bad!
                                               //                           2^3^(4^5) = 0  =>  (4^5)=1 < 4   => new accounts=[2,3,1]   
                                               //
                                               for(let i=0; i<3; i++){
                                                   acc = accounts[i];
                                                    let target = acc ^ xor;
                                                     if(target < acc){
                                                        acc = target;
                                                         accounts[i] = acc;
                                                          return accounts;            
                                                     }
                                               }
                                          }

                                      function getAccountsFromHTML(){// Get current account values from HTML input fields
                                                   console.log("Getting accounts from HTML");
                                                   return [ parseInt(accountA.value), parseInt(accountB.value), parseInt(accountC.value)];
                                      }
                                      function getAccountsFromRobo1(){ // Get current account values from HTML input fields and apply
                                                                      // logics for Robo1 to play "smart" (dumb version: just play random moves) 
                                              [accA, accB, accC] = [A,B,C] 
                                               console.log("Getting accounts for Robo1: ", accA, accB, accC);
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
                                                console.log("Returning new accounts from Robo1 logic: ", [accA, accB, accC]); 
                                                 return [ accA, accB, accC];
                                      }
                                      function getAccountsFromRobo2(){ // Get current account values from HTML input fields and apply
                                                                      // logics for Robo2 to play near optimal (not dumb version) 
                                              let accounts  = [A,B,C] 
                                                console.log("Getting accounts for Robo2 : ", accounts);
                                               let newaccounts = smartMove(accounts, true); 
                                                console.log("Returning new accounts from Robo2 logic: ", newaccounts); 
                                                 return newaccounts;
                                      }
                                      function getAccountsFromRobo3(){ // Get current account values from HTML input fields and apply
                                                                        // logics for Robo3 to play  absolute smart!
                                              let accounts = [A,B,C] 
                                                console.log("Getting accounts from Robo3 logic: ", accounts);
                                                let newaccounts = smartMove(accounts); 
                                                 console.log("Returning new accounts from Robo3 logic: ", newaccounts); 
                                                  return newaccounts;
                                      }

                                      function rotateWolf(index) {
                                                                   let trans= "rotate(0deg)"; 
                                                                    if (index > 0) trans = "rotate(180deg)";
                                                                     wolfImage.style.transform = trans;
                                                                 }

    const gamerCallbackedTurn = function(e, howGetAndSetAccountCallback) { // This function creates a behavior for a gamer based on the provided method for getting and setting account values.
                                   console.log("Gamer callbacked turn with method: ", howGetAndSetAccountCallback.name, " event:",e);

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
                                           gameLogDiv.innerHTML += logMessage;
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
                                            gameLogDiv.innerHTML   += logMessage;
                                            gameState.innerHTML += logMessage + `<h2>${gamer[winner]} wins the game! </h2> `;
                                           gameActive = false;
                                           
                                           startGameButton.disabled = false; //!
                                           playerName.disabled = false; //!
                                           partnerName.disabled = false; //!
                                           makeTurnGamer2Button.disabled =true;
                                           makeTurnGamer1Button.disabled =true;
                                            return;
                                      }

                                          // Switch player
                                          rotateWolf(partnerOf(currentPlayer));
                                           currentPlayer = partnerOf(currentPlayer);
                                            logMessage = `<br><span>  Now ${gamer[currentPlayer]}'s Turn </span>`;
                                             gameLogDiv.innerHTML += logMessage;
                                              gameState.innerHTML = logMessage; 

                                          if(makeTurnGamer1Button.disabled){makeTurnGamer1Button.disabled =false; makeTurnGamer2Button.disabled =true; }
                                          else                       {makeTurnGamer1Button.disabled =true;  makeTurnGamer2Button.disabled =false;}   

                                            

                                }
                                
 //adding Event Listener to button with id=startGame
  startGameButton.addEventListener("click", 
                            //// ------------Start Game------------------------------
                            () => {
                              controller.abort();
                              controller = new AbortController();
                                    gameActive = true;
                                     
                                    const inputPlayerName = [playerName, partnerName];
                                        const setPlayerName = (playerIndex) => {
                                                                                if(inputPlayerName[playerIndex].value.trim() == "") inputPlayerName[playerIndex].value = gamer[playerIndex]; // If the player name input field is empty, use the default gamer name; otherwise, update the gamer name with the value from the input field and update the gamer array accordingly.
                                                                                else                                                gamer[playerIndex] = inputPlayerName[playerIndex].value; 
                                        }
                                    setPlayerName(0); // Set player 0 name based on input field or default value
                                    setPlayerName(1); // Set player 1 name based on input field or default value

                                        const selectAccountsFunction = (playerIndex) => {
                                                                                      if(gamer[playerIndex].startsWith("Robo1")) return getAccountsFromRobo1 ; 
                                                                                      else if(gamer[playerIndex].startsWith("Robo2")) return getAccountsFromRobo2; 
                                                                                           else if(gamer[playerIndex].startsWith("Robo3")) return getAccountsFromRobo3; 
                                                                                                else   return getAccountsFromHTML; 
                                                                                     }
                                    const turnButtons = [makeTurnGamer1Button, makeTurnGamer2Button];
                                    const handlerEnvelopes = [handlerEnvelope00, handlerEnvelope01];
                                     for(let gamerIndex=0; gamerIndex<2; gamerIndex++){ // Loop through both players to set up their turn buttons and event handlers based on their assigned methods for getting and setting account values.
                                        //  turnButtons[gamerIndex].removeEventListener("click", handlerEnvelopes[gamerIndex]); // Remove any existing event listener for the player's turn button to prevent multiple handlers from being attached if the game is restarted.
                                          handlerEnvelopes[gamerIndex] =  (e) => gamerCallbackedTurn(e, selectAccountsFunction(gamerIndex)); // Create a new event handler for the player's turn button that calls the gamerCallbackedTurn function with the appropriate method for getting and setting account values based on the player's name.
                                           turnButtons[gamerIndex].addEventListener("click", handlerEnvelopes[gamerIndex],{ signal: controller.signal }); // Add the new event listener to the player's turn button to enable them to take their turn in the game.
                                     } 
                                      // WITH these four lines:


                                    ++gameNumber;// Increment the game number at the start of each new game, allowing for tracking of how many games have been played and alternating which player starts each game based on whether the game number is even or odd.
                                     if(gameNumber%2==0){makeTurnGamer1Button.disabled =false; makeTurnGamer2Button.disabled =true;} // Alternate which player starts each game: if gameNumber is even, gamer0 starts; if odd, gamer1 starts.
                                     else               {makeTurnGamer1Button.disabled =true; makeTurnGamer2Button.disabled =false;}
                                    
   
                                           
                                    let startMessage = `<h5> Game Number: ${gameNumber} Started! </h5>`;
                                     gameLogDiv.innerHTML = startMessage;

                                    currentPlayer = gameNumber % 2 // currentPlayer will alternate between 0 and 1 for each new game, ensuring that the starting player changes every game.
                                     rotateWolf(currentPlayer); 
                                     let currPlayerMessage = `<span>${gamer[currentPlayer]}'s Turn </span>`;
                                      gameLogDiv.innerHTML += currPlayerMessage;
                                      gameStatePre.innerHTML= startMessage + currPlayerMessage;
                                      
                                    // Initialize accounts with random values between 1 and 10 for each account (A, B, C) at the start of each game, and update the corresponding input fields in the HTML to reflect these initial values.  
                                    A = generateRandomMoney(1, 10);
                                    B = generateRandomMoney(1, 10);
                                    C = generateRandomMoney(1, 10);
                                     accountA.value = A;
                                     accountB.value = B;
                                     accountC.value = C;

                                      startGameButton.disabled = true; //!
                                      playerName.disabled = true; //!
                                      partnerName.disabled = true; //!
                                  });



 
 



