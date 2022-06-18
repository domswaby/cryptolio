import dataUtils from './dataUtil.js';
let dataGrabber = new dataUtils(); 

class Portfolio{
    constructor(){
        this.portfolio = this.getPortfolio();
        this.updatePortList();
    }

    getPortfolio() {
        let port = JSON.parse(localStorage.getItem("portfolio"));
        if(!port){
            localStorage.setItem("portfolio", JSON.stringify([]))
            return []; 
        }
        else{ 
            return JSON.parse(localStorage.getItem("portfolio")); 
        } 
    }

    addCoin(coin) {
        let alreadyAdded = this.portfolio.some((ele) => ele.id === coin.id)
        
        if(!alreadyAdded){
            coin.amount = 1; 
            coin.image = {}; 
            return dataGrabber.coinInfo(coin).then((res) => {
                coin.image.thumb = res.image.thumb;
                coin.usd = res.market_data.current_price.usd;
                coin.price = res.market_data.current_price.usd;
                this.portfolio.push(coin);
                localStorage.setItem("portfolio", JSON.stringify(this.portfolio));
                this.updatePortList();
                return res;
            });
        }else{
            alert(`You've already added ${coin.name}`);
        }
    }

    removeCoin(coin){
        let port = this.portfolio.filter((ele) => {
            return ele.id !== coin.id;
        }); 
        this.portfolio = port;
        localStorage.setItem("portfolio", JSON.stringify(port)); 
        this.barChart.buildChart();
        this.updatePortList();
    }

    updateCoinAmount(coin, amount){
        let port = this.portfolio; 
        port.forEach((ele, index) => {
            if(ele.id === coin.id){
                coin.amount = amount; 
                coin.usd = Math.round(amount * coin.price * 100) / 100; 
            }
        });
        this.portfolio = port;
        localStorage.setItem("portfolio", JSON.stringify(port)); 
        this.barChart.buildChart();
        this.updatePortList();
    }

    updatePortList(){
               
        let list = document.querySelector("#port-list"); 
        list.innerHTML = ''; 
        let child; 
        let child2;
        let image;
        let nameSpan;
        let button;
        let amountSpan; 
        let imageWrap; 
        let dollarSpan;
        let input;
        let inputSpan; 
        let inputBtn; 
        
        this.portfolio.forEach((ele) => {
            child = document.createElement('li');
            child2 = document.createElement('li');
            input = document.createElement('input'); 
            inputSpan = document.createElement('span'); 
            inputBtn = document.createElement('button'); 
            
            button = document.createElement('button');
            
            image = document.createElement('img');
            imageWrap = document.createElement('div');
            nameSpan = document.createElement('span');
            amountSpan = document.createElement('span');
            dollarSpan = document.createElement('span');
            
            button.classList.add('remove-button');
            dollarSpan.classList.add('dollar-number'); 
            inputBtn.classList.add('port-input-btn'); 
            

            button.innerHTML = 'remove';
            button.addEventListener("click", (e) => {
                this.removeCoin(ele);
            });
            input.addEventListener("keyup", (e) => {
                e.stopPropagation();
                if(e.code === "Enter"){
                    this.updateCoinAmount(ele, e.target.value);
                    e.target.value = ''; 
                }
            }); 
            input.setAttribute("id", ele.name);
            inputBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                let myInput = document.getElementById(ele.name);
                this.updateCoinAmount(ele, myInput.value);
            })
            image.src = ele.image.thumb; 
            nameSpan.innerHTML = ele.id;
            amountSpan.innerHTML = ele.amount;
            dollarSpan.innerHTML = `$${ele.usd}`;
            inputSpan.innerHTML = `Amount: `;
            inputBtn.innerHTML = `CHANGE`;
            child2.setAttribute("id", 'amount-input');

            child.appendChild(imageWrap);
            imageWrap.appendChild(image);
            child.appendChild(nameSpan);
            child.appendChild(amountSpan);
            child.appendChild(dollarSpan);
            child.appendChild(button);
            child2.appendChild(inputSpan);
            child2.appendChild(input);
            child2.appendChild(inputBtn);

            list.appendChild(child);
            list.appendChild(child2);
        });

    }
}

export default Portfolio;