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

let confirmButton = document.getElementById("confirm-button");

confirmButton.addEventListener("click", function() {
     onCardCardholder.innerHTML = cardholderInput.value.toUpperCase();
     onCardCardNumber.innerHTML = cardNumberInput.value;
     onCardExpiryMonth.innerHTML = expiryMonthInput.value;
     onCardExpiryYear.innerHTML = expiryYearInput.value;
     onCardCVC.innerHTML = cvcInput.value;

})