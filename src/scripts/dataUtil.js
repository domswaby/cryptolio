console.log("hello I'm dataUtil"); 

let root_url = "https://api.coingecko.com/api/v3"; 
let simple_price_endpoint = root_url + "/simple/price?ids=bitcoin&vs_currencies=usd"; 
let coin_endpoint = root_url + "/coins/bitcoin"; 
let coins_list_endpoint = root_url + "/coins/list"; 
let my_data; 

class DataUtil { 

  constructor() { 
    this.ele = document.querySelector("#test-display");
  }
  coinsList(){

    return fetch(coins_list_endpoint)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.ele.innerHTML = `The coins list has this many coins lol: ${data.length}`; 
        return data; 
      });

  }

  simplePrice(){
    return fetch(simple_price_endpoint)
      .then(response => response.json())
      .then(data => {
        this.ele.innerHTML = `Today's bitcoin price is: ${data.bitcoin.usd}`; 
        return data; 
      });
  }

  coinInfo(){
    return fetch(coin_endpoint)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      ele.innerHTML = `The bitcoin symbol is: <img src='${data.image.thumb}' />`;
    });
  }

}

export default DataUtil;  

