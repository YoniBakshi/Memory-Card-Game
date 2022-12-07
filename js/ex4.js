(function () {
    let playing = false;
// the errors messages will be stored here and later displayed to the user
    let gameImg = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg",
        "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg"]
// an array of objects {name, reference, description, price}
    let playersList = []

    const memoryCardGame = function () {
        let boardCol
        let boardRow
        let randomImgArr
        function initB(){
            boardCol = document.getElementById("numberOfCol").value
            boardRow = document.getElementById("numberOfRows").value
            randomImgArr = []
        }
        function getboardInfo() {
            return {
                "row": boardRow,
                "col": boardCol,
                "mul": (boardRow * boardCol),
                "rand": randomImgArr
            };
        }
        function setRandomImg(arr){
            randomImgArr = arr;
        }
        return {
            init : initB,
            boardSize: getboardInfo,
            setRandImg: setRandomImg
        }
    }();

    const pickRandom = (array) => {
        const clonedArray = [...array]
        const randomPicks = []

        for (let index = 0; index < memoryCardGame.boardSize()["mul"] / 2; index++) {
            const randomIndex = Math.floor(Math.random() * clonedArray.length)

            randomPicks.push(clonedArray[randomIndex])
            clonedArray.splice(randomIndex, 1)
        }
        //const andomPicks = randomPicks.concat(randomPicks)


        //console.log(andomPicks)
        return randomPicks.concat(randomPicks)
    }

    const shuffle = (array) => {
        const clonedArray = [...array]

        for (let index = clonedArray.length - 1; index > 0; index--) {
            const randomIndex = Math.floor(Math.random() * (index + 1))
            const original = clonedArray[index]

            clonedArray[index] = clonedArray[randomIndex]
            clonedArray[randomIndex] = original
        }

        return clonedArray
    }
    /** you need to implement this function - do not change the name of the function
     * sort the productsList amd update the HTML displaying the list of products using displayProducts()
     */
    function sortProductsByReference() {
        productsList.sort((a, b) => a.reference > b.reference ? 1 : -1);
        displayProducts(fillTable());
        console.log(productsList)
    }


    function validatorName() {
        const errorM = document.getElementById("name");
        if (!validatorLenAndVal(errorM.value.trim().length)) {
            errorM.setCustomValidity("field less than 12.");
            return false;
        } else if (errorM.value.trim().includes(' ')) {
            errorM.setCustomValidity("field must contain a single word.");
            return false;
        } else {
            errorM.setCustomValidity("");
            return true;
        }
    }

    function validatorBoardSize() {
        let errorM = document.getElementById("boardSizeError");
        if (memoryCardGame.boardSize()["mul"] % 2 === 0) {
            errorM.classList.add('d-none');
            document.querySelector("#Play").disabled = false;
            return true;
        } else {
            errorM.classList.remove('d-none');
            document.querySelector("#Play").disabled = true;
            return false;
        }
    }

    function validatorLenAndVal(currInp) {
        return currInp <= 7 ;
    }

    function validatorLetterOrDigit(currInp) {
        return /^[A-Za-z0-9]*$/.test(currInp);
    }


    /** you need to implement this function - do not change the name of the function
     * @param listOfErrors an array of strings containing the error messages
     * @returns {string|string|*} the HTML code to display the errors
     */
    /*    function convertErrorsToHtml() {
            let convertList = ``
            for (let i = 2; i <= 10; ++i)
                convertList += `<option value=${i}>${i}</option>`;

            return convertList;
        }*/


// you may move but not modify the code below this line

    /**
     * This function updates the HTML displaying the list of products.
     * @param html
     */
    const displayProducts = (html) => {
        document.getElementById("tableScore").innerHTML = html;
    }
    const displayProduct = (html) => {
        document.getElementById("gameTableImg").innerHTML = html;
    }

    function fillTable() {
        let tableProd = `<table class="table">
  <thead>
    <tr>
      <th scope="col"> Rank </th>
      <th scope="col"> Player </th>
      <th scope="col"> Score </th>
    </tr>
  </thead>
<tbody>`
        playersList.forEach((player, index) => {
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

    const creatGameTable = () => {
        let tableProd = document.createElement("table");
        tableProd.classList.add("mx-auto")
        let id = 0;
        for(let i =0; i<memoryCardGame.boardSize()["row"]; ++i){
            const row = document.createElement("tr")
            for(let j = 0; j < memoryCardGame.boardSize()["col"];++j){
                const col = document.createElement("td")
                const img = document.createElement("img")
                img.src = "./images/card.jpg"
                img.id = id++
               // img.addEventListener('click')
                //img.classList.add("img-fluid")
                col.appendChild(img);
                row.appendChild(col);
            }
            tableProd.appendChild(row);
        }
        document.getElementById("gameTableImg").appendChild(tableProd)
        //tableProd.addEventListener('click',)
    }

    const playGame = () => {
        if (validatorName() && validatorBoardSize()) {
            getPlayerName();
            document.getElementById("formPage").classList.add('d-none')
            document.getElementById("gameBoard").classList.remove('d-none');
            displayProducts(fillTable());
            creatGameTable()
            memoryCardGame.setRandImg(pickRandom(gameImg))
            console.log(shuffle(memoryCardGame.boardSize()["rand"]))
            playing = true;
        }
    }

    const getPlayerName = () => {
        let name = document.getElementById("name").value.trim().toLowerCase()
        for (let k of playersList)
            if (k.key === name)
                return;
        playersList.push({key: name, value: 0})
    }

    /**
     * upon loading the page, we bind handlers to the form and the button
     */
    document.addEventListener("DOMContentLoaded", () => {

        document.getElementById("messageForm").addEventListener("keyup", (elm) => {
            memoryCardGame.init()
            validatorName()
        })

        document.getElementById("messageForm").addEventListener("click", (elm) => {
            memoryCardGame.init()
            validatorBoardSize();
        })

        document.getElementById("gameTableImg").addEventListener("click", (elm) => {
            console.log(elm.target.id)

        })

        document.getElementById("messageForm").addEventListener("submit", (elm) => {
           elm.preventDefault();
            playGame()
        })
        document.getElementById("Back").addEventListener("click", (elm) => {
            document.getElementById("formPage").classList.remove('d-none')
            document.getElementById("gameBoard").classList.add('d-none');
            document.getElementById("gameTableImg").innerHTML = "";
        })

        /*       // we validate the product:
               if (validateProduct(player)) {
                   // if the product is valid, we add it to the list of products:
                   document.getElementById("errorMessages").innerHTML = "Product is saved!";
                   // add the product to the list of products and update the HTML table
                   addProduct(player);
                   displayProducts(fillTable());
               } else
                   // if the product is not valid, we display the errors:
                   document.getElementById("errorMessages").innerHTML = convertErrorsToHtml(errorMessages);
               //});*/
        //displayProduct(convertErrorsToHtml());
        // the sort button handler:
        /*    document.getElementById("sortByReference").addEventListener("click", (event) => {
                sortProductsByReference();
            })*/

    });
})();
