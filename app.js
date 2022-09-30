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

let expiryDateErrorMessage = document.getElementById("expiry-error-month");


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
let isExpiryMonthOkay = false;
let isExpiryYearOkay = false


let baseCardValues = {
     cardNumber: "0000 0000 0000 0000",
     cardHolder: "JANE APPLESED",
     cardExpiryMonth: "00",
     cardExpiryYear: "00",
     cardCVC: "000"
}


function resetALlInputs() {
     cardNumberInput.value = ""
     cardholderInput.value = ""
     expiryMonthInput.value = ""
     expiryYearInput.value = ""
     cvcInput.value = ""
}

function restartOkayValues() {
     isCVCOkay = false;
     isCardNumberOkay = false;
     isCardHolderOkay = false;
     isExpiryMonthOkay = false;
     isExpiryYearOkay = false;
}

function isOkay() {
     return isCVCOkay && isCardHolderOkay && isCardNumberOkay && isExpiryMonthOkay && isExpiryYearOkay;
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

function hideError(error) {
     error.style.display = "none";
}

function doesContainE(string) {// Had to do this, because for example 111e9 is still a number
      return string.includes("e");

}




function cardholderNameErrorHandling(error) {
     if (cardholderInput.value.replaceAll(" ", "") === "") {
          showError(error, "Can't be blank");

          onCardCardholder.innerHTML = baseCardValues.cardHolder;
          cardholderInput.value = "";
          cardholderInput.style.borderColor = "var(--red)";
     }
     else {
          onCardCardholder.innerHTML = cardholderInput.value.toUpperCase();
          isCardHolderOkay = true;
          cardholderInput.style.borderColor = "var(--lightGrayishViolet)";

          hideError(error);
     }

}

function cardNumberErrorHandling() {
     let temporaryCardNumber = cardNumberInput.value.replaceAll(" ", "");
     if (temporaryCardNumber.length === 0) {
          showError(cardNumberErrorMessage, "Can't be blank")
          cardNumberInput.value = "";
          cardNumberInput.style.borderColor = "var(--red)";
     }
     else if (temporaryCardNumber.length < 16) {
          showError(cardNumberErrorMessage, "Can't contain spaces or be less than 16 digits");
          cardNumberInput.value = "";
          cardNumberInput.style.borderColor = "var(--red)";
     }
     else if (isNaN(Number(cardNumberInput.value)) || doesContainE(cardNumberInput.value)) {
          showError(cardNumberErrorMessage, "Wrong format, numbers only");
          cardNumberInput.value = "";
          cardNumberInput.style.borderColor = "var(--red)";
     }
     else {
          let formattedCardNumber = "";
          for (let i = 0; i <= 12; i+=4) {
               formattedCardNumber += temporaryCardNumber.slice(i, i+4) + " ";
          }

          onCardCardNumber.innerHTML = formattedCardNumber;
          hideError(cardNumberErrorMessage);
          cardNumberInput.style.borderColor = "var(--lightGrayishViolet)";

          isCardNumberOkay = true;
     }
}

function cvcErrorHandling(errorMessage, input, onCardData, inputMaxLength, baseValue) {
     if (input.value.length === inputMaxLength && !isNaN(Number(input.value)) && !/\s/.test(input.value) && !doesContainE(input.value)) {
          errorMessage.style.display = "none";
          onCardData.innerHTML = input.value;
          input.style.borderColor = "var(--lightGrayishViolet)";

          isCVCOkay = true;

     }


     else {
          input.style.borderColor = "var(--red)";
          errorMessage.style.display = "block";
          onCardData.innerHTML = baseValue;

          if (input.value === "")
               errorMessage.innerHTML = "Can't be blank";

          else if (input.value.length !== inputMaxLength)
               errorMessage.innerHTML = "Wrong format, 3 digits";

          else if (isNaN(Number(input.value)) || doesContainE(input.value))
               errorMessage.innerHTML = "Wrong format, numbers only";

          else if (/\s/.test(input.value))
               errorMessage.innerHTML = "Can't contain spaces";

          input.value = "";
     }
}

function expiryDateErrorHandling() {
     if (expiryMonthInput.value > 12) {
          hideError(expiryDateErrorMessage);

          showError(expiryDateErrorMessage, "Wrong format")
          expiryMonthInput.style.borderColor = "var(--red)"
     }
     else if (expiryMonthInput.value.replaceAll(" ", "").length < 2 || expiryYearInput.value.replaceAll(" ", "").length < 2) {

          hideError(expiryDateErrorMessage);
          expiryYearInput.style.borderColor = "var(--lightGrayishViolet)"
          expiryMonthInput.style.borderColor = "var(--lightGrayishViolet)"

          if (expiryMonthInput.value.replaceAll(" ", "").length < 2) {

               showError(expiryDateErrorMessage, "Can't be blank")
               expiryMonthInput.style.borderColor = "var(--red)"

          }
          if (expiryYearInput.value.replaceAll(" ", "").length < 2) {

               showError(expiryDateErrorMessage, "Can't be blank")
               expiryYearInput.style.borderColor = "var(--red)"
          }

     }
     else if (
         (isNaN(Number(expiryMonthInput.value)) || doesContainE(expiryMonthInput.value))
         ||
         (isNaN(Number(expiryYearInput.value)) || doesContainE(expiryYearInput.value))) {

          hideError(expiryDateErrorMessage);
          expiryYearInput.style.borderColor = "var(--lightGrayishViolet)"
          expiryMonthInput.style.borderColor = "var(--lightGrayishViolet)"

          if (isNaN(Number(expiryMonthInput.value)) || doesContainE(expiryMonthInput.value)) {
               showError(expiryDateErrorMessage, "Wrong format, numbers only")
               expiryMonthInput.style.borderColor = "var(--red)"
          }
          if (isNaN(Number(expiryYearInput.value)) || doesContainE(expiryYearInput.value)) {
               showError(expiryDateErrorMessage, "Wrong format, numbers only")
               expiryYearInput.style.borderColor = "var(--red)"
          }

     }

     else {
          expiryYearInput.style.borderColor = "var(--lightGrayishViolet)"
          expiryMonthInput.style.borderColor = "var(--lightGrayishViolet)"
          hideError(expiryDateErrorMessage);
          onCardExpiryMonth.innerHTML = expiryMonthInput.value;
          onCardExpiryYear.innerHTML = expiryYearInput.value;

          isExpiryMonthOkay = true;
          isExpiryYearOkay = true;
     }
}




initBaseCardValues();


confirmButton.addEventListener("click", function() {

     restartOkayValues();

     cvcErrorHandling(cvcErrorMessage, cvcInput, onCardCVC, 3, "000");
     cardholderNameErrorHandling(cardHolderErrorMessage);
     cardNumberErrorHandling();
     expiryDateErrorHandling();



     if (isOkay())
     {
          changeScenes(rightSection, acceptedSection);
     }



})

continueButton.addEventListener("click", function() {
     initBaseCardValues();
     changeScenes(acceptedSection, rightSection);
     resetALlInputs();
})
