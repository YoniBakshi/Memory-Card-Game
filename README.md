[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=9537662&assignment_repo_type=AssignmentRepo)

# Authors:
Yehonatan Bakshi

Hila Saadon

README :
- A classic memory card game - limited edition with Poro's images. The goal is to find each card it's pair, flip 2 cards at the same time by clicking it.
- Main page will contain a field name to fill, and 3 buttons : Play, Settings, High scores.
- At first, the player must enter a name which will be validated so it contains letters a-z, A-Z, 0-9 ONLY.
  - No spaces are allowed at all.
  - Can contain up to 12 letters/digits.
- Setting : The player can set a preference to his game :
  - Set the quantity of cards in a row and column, but the size of board must be an even number of cards. (rows * cols) 
  - Set the delay of cards when it's flipping.
  - Rows & Columns option range is 2-5 (Default of both is 4) , Delay options : 0.5, 1.0, 1.5, 2.0
- High Score : Leaderboard which contains the 3 best players with their best scores. Being updated every game.
- When the player finish the game - his calculated score will be printed and the updated leaderboard with player's rank or a nice try message.


Notes :
- A player who didn't finish the game won't be able to enter the leaderboard.
- Letters of entered name will be checked as lowercase - if name is already in the leaderboard - score will be updated.
- All fields must be valid to start a game.


- Score's formula :
    - using 3 values : 
      1. Board's size.
      2. Quantity of clicks.
      3. Delay of flipping cards.
    - Based on these three parameters : we multiply the board's size by 100, adding half of the delay of flipped cards and decrease by the quantity of clicks.
    - Score will be shown with 3 digits after the decimal point.


- Picking cards randomly formula :
    - Receive original card's pictures array, looping till size of board /2 , 
    - Get a random card (using limit Math.floor).
    - Insert this random card's picture to an array of random pictures and delete it from the original array.
    - In the end, function returns the accomplished random card's picture array.


- Shuffle the order of board's card :
  - Receive the chosen random pictures for the cards, Get a index (using limit Math.floor),
  - Switch places between randomized index and original index.
  - In the end, function returns the accomplished random board game array.
