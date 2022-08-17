//https://app.exchangerate-api.com
const currencySelectOne = document.querySelector ("#select-currency-one");
const amountInputOne = document.querySelector ("#amount-one-input");
const currencySelectTwo = document.querySelector ("#select-currency-two");
const amountInputTwo = document.querySelector ("#amount-two-input");

const rate = document.querySelector("#div-message-rate");

const btnSwap = document.querySelector("#btn-swap");

currencySelectOne.addEventListener("change", calcRate);
currencySelectTwo.addEventListener("change", calcRate);

amountInputOne.addEventListener("input", calcRate);
amountInputTwo.addEventListener("input", calcRate);

btnSwap.addEventListener("click", function() {
    const tempValue = currencySelectOne.value;
    currencySelectOne.value = currencySelectTwo.value;
    currencySelectTwo.value = tempValue;
    calcRate();

});
function calcRate(){
    const currencyOne = currencySelectOne.value;
    const currencyTwo = currencySelectTwo.value;
    console.log(currencyOne);
    fetch(`https://open.er-api.com/v6/latest/${currencyOne}`)
     .then((res) => res.json())
     .then((data) => {
      const rateData = data.rates[currencyTwo];
      rate.innerHTML = `1 ${currencyOne} = ${rateData} ${currencyTwo}`;
      amountInputTwo.value = (amountInputOne.value * rateData).toFixed(2);
    });
}

calcRate();