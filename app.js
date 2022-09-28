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

let continueButton = document.getElementById("continue-button");

let isCVCOkay = false;
let isCardNumberOkay = false;
let isCardHolderOkay = false;


let baseCardValues = {
     cardNumber: "0000 0000 0000 0000",
     cardHolder: "JANE APPLESED",
     cardExpiryMonth: "00",
     cardExpiryYear: "00",
     cardCVC: "000"
}


function isOkay() {
     return isCVCOkay && isCardHolderOkay && isCardNumberOkay;
}

function initBaseCardValues() {
     onCardCardNumber.innerHTML = baseCardValues.cardNumber;
     onCardCardholder.innerHTML = baseCardValues.cardHolder;
     onCardExpiryMonth.innerHTML = baseCardValues.cardExpiryMonth;
     onCardExpiryYear.innerHTML = baseCardValues.cardExpiryYear;
     onCardCVC.innerHTML = baseCardValues.cardCVC;
}
function changeScenes(fromSection, toSection) {
     fromSection.style.opacity = '0';
     fromSection.style.zIndex = '2';
     toSection.style.zIndex = '5';
     toSection.style.opacity = '1';

}

function showError(error, errorMessage) {
     error.style.display = "block";
     error.innerHTML = errorMessage;
}

function cardholderNameErrorHandling(error) {
     if (cardholderInput.value.replaceAll(" ", "") === "") {
          showError(error, "Can't be blank");

          onCardCardholder.innerHTML = baseCardValues.cardHolder;
     }
     else
          isCardHolderOkay = true;
}

function cvcErrorHandling(errorMessage, input, onCardData, inputMaxLength, baseValue) {
     if (input.value.length === inputMaxLength && !isNaN(input.value) && !/\s/.test(input.value)) {
          errorMessage.style.display = "none";
          onCardData.innerHTML = input.value;
          isCVCOkay = true;
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


initBaseCardValues();

confirmButton.addEventListener("click", function() {
     onCardCardholder.innerHTML = cardholderInput.value.toUpperCase();

     isCVCOkay = false;
     isCardNumberOkay = false;
     isCardHolderOkay = false;

     let temporaryCardNumber = cardNumberInput.value.replaceAll(" ", "");
     if (temporaryCardNumber.length === 0) {
          showError(cardNumberErrorMessage, "Can't be blank")
     }
     else if (temporaryCardNumber.length < 16) {
          showError(cardNumberErrorMessage, "Can't contain spaces or be less than 16 digits");
     }
     else if (isNaN(Number(cardNumberInput.value))) {
          showError(cardNumberErrorMessage, "Wrong format, numbers only");
     }
     else {
          let formattedCardNumber = "";
          for (let i = 0; i <= 12; i+=4) {
               formattedCardNumber += temporaryCardNumber.slice(i, i+4) + " ";
          }

          onCardCardNumber.innerHTML = formattedCardNumber;
          isCardNumberOkay = true;
     }


     onCardExpiryMonth.innerHTML = expiryMonthInput.value;
     onCardExpiryYear.innerHTML = expiryYearInput.value;

     cvcErrorHandling(cvcErrorMessage, cvcInput, onCardCVC, 3, "000");

     cardholderNameErrorHandling(cardHolderErrorMessage);
     // isInputValueBlank(cardNumberInput, cardNumberErrorMessage);

     if (isOkay())
     {
          changeScenes(rightSection, acceptedSection);
     }



})

continueButton.addEventListener("click", function() {
     initBaseCardValues();
     changeScenes(acceptedSection, rightSection);
})