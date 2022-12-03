(function () {

// the errors messages will be stored here and later displayed to the user
    let errorMessages = []
// an array of objects {name, reference, description, price}
    let playersList = [{key:'dff', value: 10}, {key:'', value: 0}, {key:'', value: 0}]


    /** you need to implement this function - do not change the name of the function
     * add a product to the productsList and update the HTML displaying the list of products using displayProducts()
     * @param product an object, the new product to add (see the code line 61)
     */
    function addProduct(product) {
        playersList.push(product);
        console.log(playersList)
    }

    /** you need to implement this function - do not change the name of the function
     * sort the productsList amd update the HTML displaying the list of products using displayProducts()
     */
    function sortProductsByReference() {
        productsList.sort((a, b) => a.reference > b.reference ? 1 : -1);
        displayProducts(fillTable());
        console.log(productsList)
    }


    /** you need to implement this function - do not change the name of the function
     * @param formInput an object containing the values of the form fields
     * @returns {boolean} true if the form is valid, false otherwise
     */
    function validateProduct(formInput) {
        let validFrom = true;
        if (!validatorName(formInput.playerName))
            validFrom = false;
        console.log(errorMessages);
        return validFrom;
    }

    function validatorName(inpName) {
        if (validatorLenAndVal(inpName.length, 0)) {
            errorMessages.push("The input field Reference - is empty.");
            return false;
        }
        if (!validatorLenAndVal(inpName.length, 12)) {
            errorMessages.push("Input field : Reference - is too long. (Max : 20).");
            return false;
        }
        if (!validatorLetterOrDigit(inpName)) {
            if (inpName.includes(' '))
                errorMessages.push("Input " + inpName + "field must contain a single word.");
            else
                errorMessages.push("Input field : Reference - can contain a-z or 0-9 ONLY.");
            return false;
        }
        return true;
    }


    function validatorLenAndVal(currInp, wanted) {
        return currInp <= wanted;
    }

    function validatorLetterOrDigit(currInp) {
        return /^[A-Za-z0-9]*$/.test(currInp);
    }


    /** you need to implement this function - do not change the name of the function
     * @param listOfErrors an array of strings containing the error messages
     * @returns {string|string|*} the HTML code to display the errors
     */
    function convertErrorsToHtml() {
        let convertList =``
        for(let i = 2;i<=10;++i)
            convertList += `<option value=${i}>${i}</option>`;

        return convertList;
    }


// you may move but not modify the code below this line

    /**
     * This function updates the HTML displaying the list of products.
     * @param html
     */
    const displayProducts = (html) => {
        document.getElementById("tableScore").innerHTML = html;
    }
    const displayProduct = (html) => {
        document.getElementById("boardOption").innerHTML = html;
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


    /**
     * upon loading the page, we bind handlers to the form and the button
     */
    document.addEventListener("DOMContentLoaded", () => {

        document.getElementById("messageForm").addEventListener("submit", (event) => {
            event.preventDefault();


            errorMessages = [];
            // we build the new product object from the form input:
            let player = {
                playerName: document.getElementById("name").value.trim(),
                rowBoard: document.getElementById("numberOfRows").value.trim(),
                colBoard: document.getElementById("numberOfCol").value.trim()
            }

            if(document.getElementById("name").value.length > 10){
               console.log(document.getElementById("name").value.trim());

                const nameField = document.getElementById("name");

                nameField.addEventListener("input", () => {
                    nameField.setCustomValidity("sssssssssssssssssssssssssssssss.");
                    nameField.checkValidity();
                    console.log(nameField.checkValidity());
                });
            }


            // we validate the product:
            if (validateProduct(player)) {
                // if the product is valid, we add it to the list of products:
                document.getElementById("errorMessages").innerHTML = "Product is saved!";
                // add the product to the list of products and update the HTML table
                addProduct(player);
                displayProducts(fillTable());
            } else
                // if the product is not valid, we display the errors:
                document.getElementById("errorMessages").innerHTML = convertErrorsToHtml(errorMessages);
        });


        displayProducts(fillTable());
        displayProduct(convertErrorsToHtml());

        // the sort button handler:
    /*    document.getElementById("sortByReference").addEventListener("click", (event) => {
            sortProductsByReference();
        })*/

    });
})();
