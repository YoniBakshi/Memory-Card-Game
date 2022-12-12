"use strict";

(function () {
        /**
         * Array which used as inventory of card's pictures to pick randomly each game.
         */
        let gameImg = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg",
            "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg"]

        /**
         *
         * Leadboard of 3 best players with their highest scores.
         */
        let rankedListArr = []

        /**
         * Module of current player's data.
         */
        const gamePlayData = function () {
            let clickCounter, pairedCounter, name;

            function initPlayerData() {
                clickCounter = pairedCounter = 0;
                name = document.getElementById("name").value.trim();
            }

            /**
             * Dictionary of current player
             * name = Player's name.
             * clickCounter = counter of player's clicks in current game.
             * pairedCounter = counter of cards which the player paired successfully in current game.
             */
            function getPlayerData() {
                return {
                    "name": name,
                    "clickCounter": clickCounter,
                    "pairedCounter": pairedCounter
                }
            }

            function setClicks() {
                ++clickCounter;
            }

            function setPairsCounter() {
                pairedCounter += 2;
            }

            /**
             * getPlayers = key to call a function which contains 3 values of current player. (name, clicks & paired counters)
             * initPlayer = key to call function which initialize player's data in each game.
             * clicks =  key to call a function which update the quantity of clicks + 1
             * pairedFlipped = key to call a function which update the quantity of cards that played paired + 2
             */
            return {
                getPlayers: getPlayerData,
                initPlayer: initPlayerData,
                clicks: setClicks,
                pairedFlipped: setPairsCounter
            }
        }();

        /**
         *  Module of current board game.
         */
        const memoryCardGame = function () {
            let boardCol, boardRow, randomImgArr, flippedArr;

            function initBoard() {
                boardCol = document.getElementById("numberOfCol").value;
                boardRow = document.getElementById("numberOfRows").value;
                randomImgArr = flippedArr = [];
            }

            /**
             * row = quantity of board's rows input
             * col = quantity of board's columns input
             * mul = size of current board (According to rows & columns inputs)
             * rand = array of randomly picked images from "inventory images array"
             * flippedCard = array which intended to contain the 2 cards that the played flipped at the moment
             *               (emptying and filling up during the game all the time)
             */
            function getBoardInfo() {
                return {
                    "row": boardRow,
                    "col": boardCol,
                    "mul": (boardRow * boardCol),
                    "rand": randomImgArr,
                    "flippedCard": flippedArr
                };
            }

            function setRandomImg(arr) {
                randomImgArr = arr;
            }

            function setFlipped() {
                flippedArr = [];
            }

            /**
             * getPlayers = key to call a function which contains 3 values of current player. (name, clicks & paired counters)
             * initPlayer = key to call function which initialize player's data in each game.
             * clicks =  key to call a function which update the quantity of clicks + 1
             * pairedFlipped = key to call a function which update the quantity of cards that played paired + 2
             */

            /**
             * board = key to call a function which contains 3 values of current player.
             * init = key to call function which initialize board's data in each game.
             * setRandImg = key to call a function to set the randomized card's pictures
             * setFlip = key to call a function which set the array of flipped cards
             *           (which being emptying and filling up for every 2 flipped cards).
             */
            return {
                board: getBoardInfo,
                init: initBoard,
                setRandImg: setRandomImg,
                setFlip: setFlipped
            }
        }();

        /**
         * Print options for rows and columns.
         */
        function convertOptionsToHtml() {
            let convertList = ``
            for (let i = 2; i <= 5; ++i) {
                convertList += `<option value=${i}>${i}</option>`;
                if (i === 4)
                    convertList += `<option value=${i} selected>${i}</option>`;
            }
            document.getElementById("numberOfRows").innerHTML = convertList
            document.getElementById("numberOfCol").innerHTML = convertList
        }

        /**
         * Pick a random pictures from the inventory (array "gameImg") for current cards game.
         * @param array = original card array
         * @returns = Return random array  * 2
         */
        const randomizeCards = (array) => {
            const clonedArray = [...array]
            const randomCards = [];

            for (let i = 0; i < memoryCardGame.board().mul / 2; ++i) {
                const randomizeI = Math.floor(Math.random() * clonedArray.length);  // Get random card
                randomCards.push(clonedArray[randomizeI]);  // Add random card to new array randomized
                clonedArray.splice(randomizeI, 1); // Delete chosen random card from cards array
            }
            return randomCards.concat(randomCards); // Return random array  * 2
        }

        /**
         * Shuffle the order of cards board game
         * @param array = randomized array
         * @returns accomplished random board game array
         */
        const shuffleBoard = (array) => {
            const clonedArray = [...array]

            for (let i = clonedArray.length - 1; i > 0; --i) {
                const randomizeI = Math.floor(Math.random() * (i + 1)); //Get random card using index
                const original = clonedArray[i]; // Switch between card in index i and card index in randomized index
                clonedArray[i] = clonedArray[randomizeI];
                clonedArray[randomizeI] = original;
            }
            return clonedArray;
        }

        function validatorName() {
            memoryCardGame.init();
            const errorM = document.getElementById("name");
            if (!(errorM.value.trim().length <= 12) || errorM.value.trim().includes(' ')) {
                errorM.setCustomValidity("Please match the requested format.");
                return false;
            } else {
                errorM.setCustomValidity("");
                return true;
            }
        }

        /**
         * Validate input of board size that quantity of cards game will be even.
         */
        function validatorBoardSize() {
            memoryCardGame.init();
            let errorM = document.getElementById("boardSizeError");
            if (memoryCardGame.board().mul % 2 === 0) {
                errorM.classList.add('d-none');
                document.querySelector("#Play").disabled = false;
                return true;
            } else {
                errorM.classList.remove('d-none');
                document.querySelector("#Play").disabled = true;
                return false;
            }
        }

        const convertTableToHtml = (html) => {
            document.getElementById("tableScore").innerHTML = html;
        }

        function fillRankedTable() {
            let tableProd = `<table class="table">
  <thead>
    <tr>
      <th scope="col"> Rank </th>
      <th scope="col"> Player </th>
      <th scope="col"> Score </th>
    </tr>
  </thead>
<tbody>`
            rankedListArr.forEach((player, index) => {
                tableProd += ` <tr>
     <td>${index + 1}</td>
     <td>${player.key}</td>
     <td>${player.value}</td>
    </tr>`
            })

            tableProd += `</tbody>
                </table>`
            return tableProd;
        }

        /**
         * Create the cards on the board and set attach to each image the needed values such as unique id, the image itself
         */
        const createGameTable = () => {
            let tableProd = document.createElement("table");
            tableProd.classList.add("mx-auto")
            let id = 0;
            for (let i = 0; i < memoryCardGame.board().row; ++i) {
                const row = document.createElement("tr")
                for (let j = 0; j < memoryCardGame.board()["col"]; ++j) {
                    const col = document.createElement("td")
                    const img = document.createElement("img")
                    img.src = "./images/unflipped.jpg"
                    img.id = id++
                    img.classList.add("img-fluid")
                    img.addEventListener('click', flipCardByClick)
                    col.appendChild(img);
                    row.appendChild(col);
                }
                tableProd.appendChild(row);
            }
            document.getElementById("gameTableImg").appendChild(tableProd)
        }

        /**
         * Available scenarios for a click
         */
        const flipCardByClick = (elm) => {
            // If less than 2 cards are flipped at the moment
            if (memoryCardGame.board().flippedCard.length < 2) {
                elm.target.src = `./images/${memoryCardGame.board().rand[elm.target.id]}`
                elm.target.removeEventListener('click', flipCardByClick)
                memoryCardGame.board().flippedCard.push(elm.target)
                gamePlayData.clicks()
                document.getElementById("numberOfClicks").innerHTML = `
                    <p class="text-center fs-5 fw-bold">
                    Number of clicks : ${gamePlayData.getPlayers().clickCounter}</p> `
            }

            // If 2 cards are flipped at the moment so check if it's a pair and set according to it
            if ((memoryCardGame.board().flippedCard.length === 2)) {
                if (memoryCardGame.board().flippedCard[0].src === memoryCardGame.board().flippedCard[1].src) {
                    memoryCardGame.setFlip()
                    gamePlayData.pairedFlipped();
                } else if (elm.target.src.includes(memoryCardGame.board().flippedCard[0].src)
                    || elm.target.src.includes(memoryCardGame.board().flippedCard[1].src)) {
                    setTimeout(() => {
                        memoryCardGame.board().flippedCard.forEach((card) => {
                            card.src = `./images/unflipped.jpg`;
                            card.addEventListener('click', flipCardByClick)
                        })
                        memoryCardGame.setFlip()
                    }, document.getElementById("timer").value * 1000)
                }
            }
            updateRankedList();
        }

        /**
         * Switch display from form to the board game when it's set and randomized.
         */
        const playGame = () => {
            if (validatorName() && validatorBoardSize()) {
                gamePlayData.initPlayer()
                document.getElementById("formPage").classList.add('d-none');
                document.getElementById("gameBoard").classList.remove('d-none');
                document.getElementById("numberOfClicks").classList.remove('d-none');
                document.getElementById("numberOfClicks").innerHTML = `
                    <p class="text-center fs-5 fw-bold"> 
                    Number of clicks : ${gamePlayData.getPlayers().clickCounter} </p>`

                createGameTable()
                memoryCardGame.setRandImg(shuffleBoard(randomizeCards(gameImg)))
            }
        }

        const calculateScore = () => {
            return (memoryCardGame.board().mul * 100 +
                (2 / document.getElementById("timer").value) -
                gamePlayData.getPlayers().clickCounter).toFixed(3);
        }

        /**
         * Check if current entered name already exist or not in lead board and pop last one. so it keeps only
         * the 3 best scores
         */
        const updateRankedList = () => {
            if (gamePlayData.getPlayers().pairedCounter === memoryCardGame.board().mul) {
                let exists = false
                rankedListArr.forEach((compName) => {
                    if (compName.key.toLowerCase() === gamePlayData.getPlayers().name.toLowerCase()) {
                        if (compName.value < calculateScore()) {
                            compName.value = calculateScore();
                            compName.key = gamePlayData.getPlayers().name
                        }
                        exists = true
                    }
                })

                if (!exists)
                    rankedListArr.push({key: gamePlayData.getPlayers().name, value: calculateScore()})
                rankedListArr.sort((a, b) => a.value < b.value ? 1 : -1);
                if (rankedListArr.length > 3)
                    rankedListArr.pop()
                endScreen();
            }
        }

        const endScreen = () => {
            let arr = [`st`, `nd`, `rd`]
            document.getElementById("numberOfClicks").classList.add('d-none');
            convertTableToHtml(fillRankedTable());
            if (rankedListArr.find(x => x.key === gamePlayData.getPlayers().name)) {
                let index = rankedListArr.findIndex(p => p.key === gamePlayData.getPlayers().name);
                document.getElementById("gameTableImg").innerHTML =
                    `<div class = "p-2 mb-3 bg-info rounded-3">                
                            <h1 class = "text-center display-5 fw-bold"> Congrtz! You've reached : 
                            ${index + 1}<sup>${arr[index]}</sup> place </h1>
                            <p class="text-center fs-4"> Your score is : ${calculateScore()}</p>
                    </div>` + fillRankedTable();
            } else
                document.getElementById("gameTableImg").innerHTML =
                    ` <div class = "p-2 mb-3 bg-info rounded-3">                
                            <h1 class = "text-center display-5 fw-bold"> Game Over </h1>
                            <p class="text-center fs-4"> Your score is : ${calculateScore()} 
                            <br>
                            Almost there! maybe next time </p>
                    </div>` + fillRankedTable();
        }

        document.addEventListener("DOMContentLoaded", () => {
            convertOptionsToHtml();

            document.getElementById("messageForm").addEventListener("keyup", validatorName)

            document.getElementById("messageForm").addEventListener("click", validatorBoardSize)

            document.getElementById("messageForm").addEventListener("submit", (elm) => {
                elm.preventDefault();
                playGame();
            })

            document.getElementById("Back").addEventListener("click", () => {
                document.getElementById("formPage").classList.remove('d-none');
                document.getElementById("gameBoard").classList.add('d-none');
                document.getElementById("gameTableImg").innerHTML = "";
                document.getElementById("messageForm").reset();
            })
        });
    }
)
();
