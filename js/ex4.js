(function () {

// A sample array of forbidden words, you modify it. Note that it can also be empty.
    const forbiddenWords = ["politics", "religion", "cheap", "expensive", "money", "offer"]
// the errors messages will be stored here and later displayed to the user
    let errorMessages = []
// an array of objects {name, reference, description, price}
    let productsList = []


    /** you need to implement this function - do not change the name of the function
     * add a product to the productsList and update the HTML displaying the list of products using displayProducts()
     * @param product an object, the new product to add (see the code line 61)
     */
    function addProduct(product) {
        productsList.push(product);
        console.log(productsList)
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
        if (!validatorReference(formInput.reference))
            validFrom = false;
        if (!validatorNameAndDescription(formInput.name, 'Name'))
            validFrom = false;
        if (!validatorNameAndDescription(formInput.description, 'Description'))
            validFrom = false;
        if (!validatorPrice(formInput.price))
            validFrom = false;
        console.log(errorMessages);
        return validFrom;
    }

    function validatorReference(inpRef) {
        if (validatorLenAndVal(inpRef.length, 0)) {
            errorMessages.push("The input field Reference - is empty.");
            return false;
        }
        if (!validatorLenAndVal(inpRef.length, 21)) {
            errorMessages.push("Input field : Reference - is too long. (Max : 20).");
            return false;
        }
        if (!validatorLetterOrDigit(inpRef)) {
            if (inpRef.includes(' '))
                errorMessages.push("Input " + inpRef + "field must contain a single word.");
            else
                errorMessages.push("Input field : Reference - can contain a-z or 0-9 ONLY.");
            return false;
        }
        return true;
    }

    function validatorNameAndDescription(inpNameOrDes, field) {
        if (validatorLenAndVal(inpNameOrDes.length, 0)) {
            errorMessages.push("The input field " + field + " - is empty.");
            return false;
        }
        if (!validatorLenAndVal(inpNameOrDes.length, 21)) {      // TODO 50
            errorMessages.push("Input field : " + field + " - is too long. (Max : 50).");
            return false;
        }
        if (validatorForbiddenWords(inpNameOrDes)) {               // if returns true so it's a bad word
            errorMessages.push("Input field : " + field + " - contains a forbidden word/s :( .");
            return false;
        }
        return true;
    }

    function validatorPrice(inpPrice) {
        if (validatorLenAndVal(inpPrice.length, 0)) {
            errorMessages.push("The input field Price - is empty.");
            return false;
        }

        if (!/^[0-9.]*$/.test(inpPrice)) {
            errorMessages.push("Input field TODOOOOOOOOO : Price - needs to be a number.");  //TODO
            return false;
        }

        if (inpPrice.includes('.') && !validatorLenAndVal(inpPrice.toString().split('.')[1].length, 2)) {
            errorMessages.push("Input field : Price - " + inpPrice +" has too many decimals. it must have at most 2 decimals.");  //TODO
            return false;
        }

        if (validatorLenAndVal(inpPrice, 0)) {
            errorMessages.push("Input field : Price - " + inpPrice + "must be positive mamash.");  //TODO
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

    function validatorForbiddenWords(currInpF) {
        return forbiddenWords.includes(currInpF);
    }


    /** you need to implement this function - do not change the name of the function
     * @param listOfErrors an array of strings containing the error messages
     * @returns {string|string|*} the HTML code to display the errors
     */
    function convertErrorsToHtml(listOfErrors) {
        let convertList = `<p class=text>  please correct the following mistake(s): </p>`
        listOfErrors.forEach((error, index) => {
            convertList += `<p class=text> ${index + 1}. ${error} </p>`
        })

        return convertList;
    }


// you may move but not modify the code below this line

    /**
     * This function updates the HTML displaying the list of products.
     * @param html
     */
    const displayProducts = (html) => {
        document.getElementById("productsTable").innerHTML = html;
    }

    function fillTable() {
        let tableProd = `<table class="table">
  <thead>
    <tr>
      <th scope="col"> Reference </th>
      <th scope="col"> Name </th>
      <th scope="col"> Description </th>
      <th scope="col"> Price </th>
    </tr>
  </thead>
<tbody>`
        productsList.forEach((prod) => {
            tableProd += ` <tr>
     <td>${prod.reference}</td>
     <td>${prod.name}</td>
     <td>${prod.description}</td>
     <td>${prod.price}</td>
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

        document.getElementById("messageForm").addEventListener("click", (event) => {
            event.preventDefault();




            errorMessages = [];
            // we build the new product object from the form input:
            let player = {
                name: document.getElementById("productName").value.trim(),
                reference: document.getElementById("productRef").value.trim(),
            }
            // we validate the product:
            if (validateProduct(prod)) {
                // if the product is valid, we add it to the list of products:
                document.getElementById("errorMessages").innerHTML = "Product is saved!";
                // add the product to the list of products and update the HTML table
                addProduct(prod);
                displayProducts(fillTable());
            } else
                // if the product is not valid, we display the errors:
                document.getElementById("errorMessages").innerHTML = convertErrorsToHtml(errorMessages);
        });

        // the sort button handler:
        document.getElementById("sortByReference").addEventListener("click", (event) => {
            sortProductsByReference();
        })

    });
})();
