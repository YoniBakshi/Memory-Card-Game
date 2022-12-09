"use strict";

(function () {
    // Array contains pictures for the game - randomize each game
    let gameImg = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg",
        "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg"]

    let rankedListArr = []

    const gamePlayData = function () {
        let clickCounter, pairedCounter, name;

        function initPlayerData() {
            clickCounter = pairedCounter = 0;
            name = document.getElementById("name").value.trim();
        }

        // Dictionary of current player
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

        return {
            initPlayer: initPlayerData,
            getPlayers: getPlayerData,
            clicks: setClicks,
            pairedFlipped: setPairsCounter
        }
    }();

    const memoryCardGame = function () {
        let boardCol, boardRow, randomImgArr, flippedArr

        function initBoard() {
            boardCol = document.getElementById("numberOfCol").value;
            boardRow = document.getElementById("numberOfRows").value;
            randomImgArr = flippedArr = [];
        }

        // Dictionary of board info
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

        return {
            init: initBoard,
            board: getBoardInfo,
            setRandImg: setRandomImg,
            setFlip: setFlipped
        }
    }();

    function convertOptionsToHtml() {
        let convertList = ``
        for (let i = 2; i <= 5; ++i){
            convertList += `<option value=${i}>${i}</option>`;
            if(i === 4)
                convertList += `<option value=${i} selected>${i}</option>`;
        }
        document.getElementById("numberOfRows").innerHTML = convertList
        document.getElementById("numberOfCol").innerHTML = convertList
    }

    // Pick a random pictures from "gameImg" for the current game cards
    const randomizeCards = (array) => {
        const clonedArray = [...array]
        const randomCards = [];

        for (let i = 0; i < memoryCardGame.board().mul / 2; ++i) {
            const randomizeI = Math.floor(Math.random() * clonedArray.length);
            randomCards.push(clonedArray[randomizeI]);
            clonedArray.splice(randomizeI, 1);
        }
        return randomCards.concat(randomCards);
    }

    // Shuffle the order of cards board game
    const shuffle = (array) => {
        const clonedArray = [...array]

        for (let i = clonedArray.length - 1; i > 0; --i) {
            const randomizeI = Math.floor(Math.random() * (i + 1));
            const original = clonedArray[i];
            clonedArray[i] = clonedArray[randomizeI];
            clonedArray[randomizeI] = original;
        }
        return clonedArray;
    }

    function validatorName() {
        const errorM = document.getElementById("name");
        if (!(errorM.value.trim().length <= 12) || errorM.value.trim().includes(' ')) {
            errorM.setCustomValidity("Please match the requested format.");
            return false;
        } else {
            errorM.setCustomValidity("");
            return true;
        }
    }

    function validatorBoardSize() {
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
        let tableProd = `<table class = "table">
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

    const createGameTable = () => {
        let tableProd = document.createElement("table");
        tableProd.classList.add("mx-auto")
        let id = 0;
        for (let i = 0; i < memoryCardGame.board()["row"]; ++i) {
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

    const flipCardByClick = (elm) => {

        if (memoryCardGame.board().flippedCard.length < 2) {
            elm.target.src = `./images/${memoryCardGame.board().rand[elm.target.id]}`
            elm.target.removeEventListener('click', flipCardByClick)
            memoryCardGame.board().flippedCard.push(elm.target)
            gamePlayData.clicks()
        }
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

    const playGame = () => {
        if (validatorName() && validatorBoardSize()) {
            gamePlayData.initPlayer()
            document.getElementById("formPage").classList.add('d-none');
            document.getElementById("gameBoard").classList.remove('d-none');
            createGameTable()
            memoryCardGame.setRandImg(shuffle(randomizeCards(gameImg)))
        }
    }

    const calculateScore = () => {
        return (memoryCardGame.board().mul * 100 +
            (2 / document.getElementById("timer").value) -
            gamePlayData.getPlayers().clickCounter).toFixed(3);
    }

    const updateRankedList = () => {
        if (gamePlayData.getPlayers().pairedCounter === memoryCardGame.board().mul) {
            let exists = false
            rankedListArr.forEach((compName) => {
                if (compName.key.toLowerCase() === gamePlayData.getPlayers().name.toLowerCase()) {
                    if (compName.value < calculateScore())
                        compName.value = calculateScore();
                    exists = true
                }
            })

            if (!exists) {
                rankedListArr.push({key: gamePlayData.getPlayers().name, value: calculateScore()})
                rankedListArr.sort((a, b) => a.value < b.value ? 1 : -1);
                if (rankedListArr.length > 3)
                    rankedListArr.pop()
            }
            endScreen();
        }
    }

    const endScreen = () => {
        convertTableToHtml(fillRankedTable());
        document.getElementById("gameTableImg").innerHTML =
            ` <div class = "p-2 mb-3 bg-primary rounded-3">                
                            <h1 class = "text-center display-5 fw-bold"> your score is : ${calculateScore()} </h1>
                    </div>` + fillRankedTable();
    }

    /**
     * upon loading the page, we bind handlers to the form and the button
     */
    document.addEventListener("DOMContentLoaded", () => {
        convertOptionsToHtml();

        document.getElementById("messageForm").addEventListener("keyup", () => {
            memoryCardGame.init()
            validatorName()
        })

        document.getElementById("messageForm").addEventListener("click", () => {
            memoryCardGame.init()
            validatorBoardSize();
        })

        document.getElementById("messageForm").addEventListener("submit", (elm) => {
            elm.preventDefault();
            playGame()
        })

        document.getElementById("Back").addEventListener("click", () => {
            document.getElementById("formPage").classList.remove('d-none')
            document.getElementById("gameBoard").classList.add('d-none');
            document.getElementById("gameTableImg").innerHTML = "";
            document.getElementById("messageForm").reset();
        })

    });
})();
