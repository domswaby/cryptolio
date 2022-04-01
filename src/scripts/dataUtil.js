console.log("hello I'm dataUtil"); 

let root_url = "https://api.coingecko.com/api/v3"; 

let simple_price_endpoint = root_url + "/simple/price?ids=bitcoin&vs_currencies=usd"; 
let coins_list_endpoint = root_url + "/coins/list"; 
let coin_endpoint = root_url + "/coins/bitcoin"; 

let my_data; 

// fetch(simple_price_endpoint)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     my_data = data; 
//     ele.innerHTML = `Today's bitcoin price is: ${my_data.bitcoin.usd}`; 
//   });

// fetch(coins_list_endpoint)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     my_data = data; 
//     ele.innerHTML = `The coins list has this many coins lol: ${my_data.length}`; 
//   });

  fetch(coin_endpoint)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    my_data = data; 
    ele.innerHTML = `The bitcoin symbol is: <img src='${my_data.image.thumb}' />`;
  });


let ele = document.querySelector("#test-display"); 


