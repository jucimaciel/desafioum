const label_converter= document.getElementById('converter');
const input_dinheiro = document.getElementById('dinheiro');
const label_moeda = document.getElementById('moeda');
const input_convertor = document.getElementById('convertor');

const tax_info = document.getElementById('tax_info');
const swap = document.getElementById('swap');

label_converter.addEventListener('change', calculate);
input_dinheiro.addEventListener('input', calculate);
label_moeda.addEventListener('change', calculate);
input_convertor.addEventListener('input', calculate);
swap.addEventListener('click', infoSwap);

main();

function main() {
  let currency = { "BRL": "Real", "EUR": "Euro", "USD": "Dollar" };
  let options = [];
  for (var [key, value] of Object.entries(currency)) {
    options.push(`<option value='${key}'>${value}</option>`);
  }
  label_converter.innerHTML = options.join('\n');
  label_moeda.innerHTML = options.join('\n');
  calculate();
}

function infoSwap() {
  let temp = label_converter.value;
  label_converter.value = label_moeda.value;
  label_moeda.value = temp;
  calculate();
}

async function getURL(url) {
  return (await fetch(url)).json();
}

function getInfoSelect(select) {
  return select.options[select.selectedIndex].text;
}

async function calculate() {
  let from = label_converter.value;
  let to = label_moeda.value;
  let { rates } = await getURL(`https://api.exchangerate-api.com/v4/latest/${from}`);
  let rate = rates[to];
  tax_info.innerText = `1 ${getInfoSelect(label_converter)} = ${rate} ${getInfoSelect(label_moeda)}`
  input_convertor.value = (input_dinheiro.value * rate).toFixed(2);
}