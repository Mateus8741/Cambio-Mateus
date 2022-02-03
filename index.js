const Digitado = document.getElementById("valor1");

const moeda1 = document.getElementById("moeda1");
const moeda2 = document.getElementById("moeda2");

const Trocar = document.getElementById("Trocar");
const finalAmount = document.getElementById("finalAmount");
const Resultado = document.getElementById("resultado");

const Texto = document.getElementById("Texto");
const Input = document.getElementById("Input");

const flag = document.getElementById("flag");

var cifras = [
  { simbolo: "R$", moeda: "BRL", bandeira: "br" },
  { simbolo: "£", moeda: "GBP", bandeira: "gb" },
  { simbolo: "€", moeda: "EUR", bandeira: "fr" },
  { simbolo: "$", moeda: "USD", bandeira: "us" },
];

function calculate() {
  const select1 = moeda1.value;
  const select2 = moeda2.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/f3521b54b09889d7b0e25ca9/latest/${select1}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const rate = data.conversion_rates[select2];
      const amount = Digitado.value;
      const total = amount * rate;

      let field1 = "";
      let field2 = "";
      let flag1 = "";
      let flag2 = "";

      cifras.forEach((item) => {
        if (item.moeda == select1) {
          field1 = item.simbolo;
        } else if (item.moeda == select2) {
          field2 = item.simbolo;
        }

        if (item.moeda == select1) {
          flag1 = item.bandeira;
          var img = document.getElementById("img1");
          img.src = `https://flagcdn.com/48x36/${flag1}.png`;
        } else if (item.moeda == select2) {
          flag2 = item.bandeira;
          var img = document.getElementById("img2");
          img.src = `https://flagcdn.com/48x36/${flag2}.png`;
        }

      });

      Resultado.innerHTML = `${field2} ${total} ${select2}`;
      Input.innerHTML = `Converter ${field1} ${Digitado.value} ${moeda1.value} para ${field2} ${total} ${moeda2.value}`;
      finalAmount.style.display = "block";
    });
}

moeda1.addEventListener("change", calculate);
moeda2.addEventListener("change", calculate);

Trocar.addEventListener("click", () => {
  const temp = moeda1.value;
  moeda1.value = moeda2.value;
  moeda2.value = temp;
  finalAmount.style.display = "none";
  calculate();
});