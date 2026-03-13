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
                                      makeTurn.disabled = false; //!
                                  });

                                      function changed(X, x){
                                        if(x!=X) return 1;
                                        else     return 0;
                                      }
 makeTurn.addEventListener("click", 
                           ////------------on every turn--------------------------------------------
                          () => {
                                 // Get input values
                                   const accA = parseInt(accountA.value);
                                   const accB = parseInt(accountB.value);
                                   const accC = parseInt(accountC.value);

                                    
                                    
                                    let howManyAccountsChanged = changed(accA, A) + changed(accB, B) + changed(accC, C)                 
                                    // Test if the current is over by checking if all accounts are zero
                                    let isAllZero = (accA + accB + accC === 0)
                                     let isCheating = (accA < 0) || (accB < 0) || (accC < 0) ||
                                                     (accA > A) || (accB > B) || (accC > C) ||
                                                      howManyAccountsChanged != 1; // Only one account should change per turn

                                      // Player cannot add coins, only remove
                                      if (isCheating || isAllZero ) {
                                         gameLog.innerHTML += `<span class=fired>${currentPlayer} is fired!</span><br>`;
                                         winner = (currentPlayer === gamer1Name) ? gamer2Name : gamer1Name;     
                                          gameActive = false;
                                          makeTurn.disabled = true; //!
                                           return;
                                      }
                                         
                                   
                                        // do move
                                        A = accA;
                                        B = accB;   
                                        C = accC;   

                                        //todo message about my succefull move
                                        // ....................................

                                        
                                        //todo message about Robo1 thinking and moving
                                        //............................................
                                        // logics for Robo1 to play smartly 
                                         if(equilibrium(A, B, C) === 0) {
                                            // Robo1 to think and to do something smart!
                                            if(A > 0) A--;
                                            else if(B > 0) B--;
                                                 else if(C > 0) C--;
                                         }
                                         else if(A > 0) A = generateRandomAccount(0, A);
                                              else if(B > 0) B = generateRandomAccount(0, B);
                                                   else if(C > 0) C = generateRandomAccount(0, C);
                                           
                                          // set new values to input fields
                                          accountA.value = A;
                                          accountB.value = B;
                                          accountC.value = C;           
                                           // Log move
                                           gameLog.innerHTML += `<p>${currentPlayer} removed coins. Accounts: A=${accA}, B=${accB}, C=${accC}</p>`;
                               
                                           // Switch player
                                           currentPlayer = (currentPlayer === gamer1Name) ? gamer2Name : gamer1Name;
                                            gameLog.innerHTML += `<span>${currentPlayer}'s Turn </span><br>`;
                               
                                   

                                 });

