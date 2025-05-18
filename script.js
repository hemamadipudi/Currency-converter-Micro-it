const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const apiKey = "https://api.exchangerate-api.com/v4/latest/USD";

// Fetch currency list and populate dropdowns
fetch(apiKey)
  .then(res => res.json())
  .then(data => {
    const currencies = Object.keys(data.rates);
    currencies.forEach(currency => {
      let option1 = document.createElement("option");
      option1.value = currency;
      option1.text = currency;
      fromCurrency.appendChild(option1);

      let option2 = document.createElement("option");
      option2.value = currency;
      option2.text = currency;
      toCurrency.appendChild(option2);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "EUR";
  });

function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (amount === "" || isNaN(amount)) {
    result.innerText = "Please enter a valid amount";
    return;
  }

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[to];
      const converted = (amount * rate).toFixed(2);
      result.innerText = `${amount} ${from} = ${converted} ${to}`;
    })
    .catch(() => {
      result.innerText = "Error fetching exchange rate.";
    });
}
