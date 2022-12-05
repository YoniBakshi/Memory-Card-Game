(function () {
    let playing = false;
// the errors messages will be stored here and later displayed to the user
    let errorMessages = []
// an array of objects {name, reference, description, price}
    let playersList = []


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
        const inpName = document.getElementById("name").value.trim();
        if (!validatorLenAndVal(inpName.length)) {
            errorM.setCustomValidity("field less than 12.");
            return false;
        } else if (inpName.includes(' ')) {
            errorM.setCustomValidity("field must contain a single word.");
            return false;
        } else {
            errorM.setCustomValidity("");
            return true;
        }
    }

    function validatorBoardSize() {
        let errorM = document.getElementById("boardSizeError");
        const rows = document.getElementById("numberOfRows").value.trim();
        const cols = document.getElementById("numberOfCol").value.trim();
        if ((rows * cols) % 2 === 0) {
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

    function PlayGame() {
        if (validatorName() && validatorBoardSize()) {
            getPlayerName();
            console.log("fvfvvffvfvfvvfvf")
            document.getElementById("formPage").classList.add('d-none')
            document.getElementById("gameBoard").classList.remove('d-none');
            displayProducts(fillTable());
            displayProduct(fillTable());
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

/*
        if (!playing)
             document.getElementById("gameBoard").style.display = "none"
*/


        document.getElementById("messageForm").addEventListener("keyup", (elm) => {
            validatorName()
        })

        document.getElementById("messageForm").addEventListener("click", (elm) => {
            validatorBoardSize();
        })

        document.getElementById("messageForm").addEventListener("submit", (elm) => {
           elm.preventDefault();
           PlayGame()
        })
        document.getElementById("Back").addEventListener("click", (elm) => {
            document.getElementById("formPage").classList.remove('d-none')
            document.getElementById("gameBoard").classList.add('d-none');

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
