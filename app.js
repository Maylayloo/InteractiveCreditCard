let cardholderInput = document.getElementById("cardholder-name-input");
let onCardCardholder = document.getElementById("cardholder-name");

let cardNumberInput = document.getElementById("card-number-input");
let onCardCardNumber = document.getElementById("card-number");

let expiryMonthInput = document.getElementById("expiry-date-month-input");
let onCardExpiryMonth = document.getElementById("expiry-month");

let expiryYearInput = document.getElementById("expiry-date-year-input");
let onCardExpiryYear = document.getElementById("expiry-year")

let cvcInput = document.getElementById("cvc-input");
let onCardCVC = document.getElementById("cvc");
let cvcErrorMessage = document.getElementById("cvc-error");

let confirmButton = document.getElementById("confirm-button");

function errorHandlingForExpAndCVC(errorMessage, input, onCardData, inputMaxLength, baseValue) {
     errorMessage.style.display = "none";


     if (input.value.length === 3 && !isNaN(input.value) && !/\s/.test(input.value))
          onCardData.innerHTML = input.value;

     else {
          errorMessage.style.display = "block";
          onCardCVC.innerHTML = baseValue;

          if (input.value === "") {
               errorMessage.innerHTML = "Can't be blank";
          }

          else if (input.value.length !== inputMaxLength)
               errorMessage.innerHTML = "Wrong format, 3 digits";

          else if (isNaN(input.value))
               errorMessage.innerHTML = "Wrong format, numbers only";

          else if (/\s/.test(input.value))
               errorMessage.innerHTML = "Can't contain spaces";

          input.value = "";
     }
}



confirmButton.addEventListener("click", function() {
     onCardCardholder.innerHTML = cardholderInput.value.toUpperCase();
     onCardCardNumber.innerHTML = cardNumberInput.value;
     onCardExpiryMonth.innerHTML = expiryMonthInput.value;
     onCardExpiryYear.innerHTML = expiryYearInput.value;

     errorHandlingForExpAndCVC(cvcErrorMessage, cvcInput, onCardCVC, 3, "000");

})