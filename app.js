let cardholderInput = document.getElementById("cardholder-name-input");
let onCardCardholder = document.getElementById("cardholder-name");
let cardHolderErrorMessage = document.getElementById("cardholder-error");

let cardNumberInput = document.getElementById("card-number-input");
let onCardCardNumber = document.getElementById("card-number");
let cardNumberErrorMessage = document.getElementById("card-number-error");

let expiryMonthInput = document.getElementById("expiry-date-month-input");
let onCardExpiryMonth = document.getElementById("expiry-month");

let expiryYearInput = document.getElementById("expiry-date-year-input");
let onCardExpiryYear = document.getElementById("expiry-year")
let expiryErrorMonthMessage = document.getElementById("expiry-error-month");
let expiryErrorYearMessage = document.getElementById("expiry-error-year");

let cvcInput = document.getElementById("cvc-input");
let onCardCVC = document.getElementById("cvc");
let cvcErrorMessage = document.getElementById("cvc-error");

let confirmButton = document.getElementById("confirm-button");

let rightSection = document.getElementById("right-section");
let acceptedSection = document.getElementById("acceptedSection");

let isOkay = false;

function isInputValueBlank(input, errorMessage) {
     if (input.value.replaceAll(" ", "") === "") {
          errorMessage.style.display = "block";
          errorMessage.innerHTML = "Can't be blank";
     }
}

function errorHandlingForExpAndCVC(errorMessage, input, onCardData, inputMaxLength, baseValue) {
     if (input.value.length === inputMaxLength && !isNaN(input.value) && !/\s/.test(input.value)) {
          errorMessage.style.display = "none";
          onCardData.innerHTML = input.value;
          isOkay = true;
     }


     else {
          errorMessage.style.display = "block";
          onCardData.innerHTML = baseValue;

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

     let temporaryCardNumber = cardNumberInput.value.replaceAll(" ", "");
     let formattedCardNumber = "";
     for (let i = 0; i <= 12; i+=4) {
          formattedCardNumber += temporaryCardNumber.slice(i, i+4) + " ";
     }

     onCardCardNumber.innerHTML = formattedCardNumber;

     onCardExpiryMonth.innerHTML = expiryMonthInput.value;
     onCardExpiryYear.innerHTML = expiryYearInput.value;

     errorHandlingForExpAndCVC(cvcErrorMessage, cvcInput, onCardCVC, 3, "000");

     isInputValueBlank(cardholderInput, cardHolderErrorMessage);
     isInputValueBlank(cardNumberInput, cardNumberErrorMessage);

     if (isOkay)
     {
          acceptedSection.style.opacity = '1';
          acceptedSection.style.zIndex = '15';
          rightSection.style.zIndex = '-1';
          rightSection.style.opacity = '0';
     }



})