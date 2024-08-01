// scripts.js

function fillSampleData() {
  const sampleData =
    "1500,250.50,0.123456789,-0.987654321,1.234567890,-1.345678901,0.234567890,-0.123456789,0.456789012,-0.345678901,0.678901234,0.123456789,-0.567890123,-1.678901234,-0.789012345,-0.234567890,0.890123456,0.345678901,0.456789012,0.123456789,-0.567890123,0.789012345,0.678901234,0.567890123,0.345678901,-0.234567890,0.456789012,0.567890123,0.678901234,0.123442341";
  document.getElementById("transactionDetails").value = sampleData;
}

document
  .getElementById("fraudForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var details = document.getElementById("transactionDetails").value;

    fetch("https://web-app-mdq4.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transactionDetails: details }),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("result").innerText =
          "Fraud Probability: " + data.probability;
      });
  });
