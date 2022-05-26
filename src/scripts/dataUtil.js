let root_url = "https://api.coingecko.com/api/v3"; 
// let simple_price_endpoint = root_url + "/simple/price?ids=bitcoin&vs_currencies=usd"; 
let simple_price_endpoint = root_url + "/simple/price?"; 
// let coin_endpoint = root_url + "/coins/bitcoin"; 
let coin_info_endpoint = root_url + "/coins"; 
let coins_list_endpoint = root_url + "/coins/list"; 
let coin_history_endpoint_part_2 = "/market_chart?vs_currency=usd&days=365&interval=daily"; 

let my_data; 

class DataUtil { 

  constructor() { 
    
  }
  coinsList(){

    return fetch(coins_list_endpoint)
      .then(response => response.json())
      .then(data => {
        
        return data; 
      });

  }

  simplePrice(){
    //let endpoint = `${simple_price_endpoint}ids=${coin.id}&vs_currencies=usd`
    return fetch(simple_price_endpoint)
      .then(response => response.json())
      .then(data => {
        this.ele.innerHTML = `Today's bitcoin price is: ${data.bitcoin.usd}`; 
        return data; 
      });
  }

  coinInfo(coin){
    let endpoint = `${coin_info_endpoint}/${coin.id}`
    return fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      
      return data;
      // ele.innerHTML = `The bitcoin symbol is: <img src='${data.image.thumb}' />`;
    });
  }

  coinHistory(coin_id){
    let endpoint = `${root_url}/coins/${coin_id}${coin_history_endpoint_part_2}`; 
    return fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      return data;
      // ele.innerHTML = `The bitcoin symbol is: <img src='${data.image.thumb}' />`;
    });
  }

}

export default DataUtil;  

