[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=9537662&assignment_repo_type=AssignmentRepo)

# ex04 javascript

# Authors:
Yehonatan Bakshi , ID : 308077668 , Email : yehonatanba@edu.hac.ac.il

Hila Saadon , ID : 208405217 , Email : hilasaa@edu.hac.ac.il

Notes :
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