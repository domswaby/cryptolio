console.log("hello I'm dataUtil"); 

let root_url = "https://api.coingecko.com/api/v3"; 

let simple_price_endpoint = root_url + "/simple/price?ids=bitcoin&vs_currencies=usd"; 

let my_data; 

fetch(simple_price_endpoint)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    my_data = data; 
    ele.innerHTML = `Today's bitcoin price is: ${my_data.bitcoin.usd}`; 
  });


let ele = document.querySelector("#test-display"); 


