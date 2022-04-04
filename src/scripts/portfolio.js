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
            coin.amount = 1
            coin.image = {}
            dataGrabber.coinInfo(coin).then((res) => {
                coin.image.thumb = res.image.thumb;
                coin.usd = res.market_data.current_price.usd;
                this.portfolio.push(coin);
                localStorage.setItem("portfolio", JSON.stringify(this.portfolio))
                this.updatePortList();
                console.log(this.getPortfolio());
            })
        }else{
            alert(`You've already added ${coin.name}`)
        }
    }

    removeCoin(coin){
        let port = this.portfolio.filter((ele) => {
            return ele.id !== coin.id
        }); 
        this.portfolio = port;
        localStorage.setItem("portfolio", JSON.stringify(port)); 
        this.updatePortList();

    }

    updatePortList(){
        if(this.portfolio.length === 0) return;
       
        let list = document.querySelector("#port-list"); 
        list.innerHTML = ''; 
        let child; 
        let image;
        let nameSpan;
        let button;
        let amountSpan; 
        let imageWrap; 
        let dollarSpan;
        
        this.portfolio.forEach((ele) => {
            child = document.createElement('li')

            button = document.createElement('button');
            image = document.createElement('img');
            imageWrap = document.createElement('div');
            nameSpan = document.createElement('span');
            amountSpan = document.createElement('span');
            dollarSpan = document.createElement('span');

            button.innerHTML = 'remove'
            button.addEventListener("click", (e) => {
                this.removeCoin(ele);
            })

            image.src = ele.image.thumb
            nameSpan.innerHTML = ele.id;
            amountSpan.innerHTML = ele.amount;
            dollarSpan.innerHTML = ele.usd;

            child.appendChild(imageWrap);
            imageWrap.appendChild(image);
            child.appendChild(nameSpan);
            child.appendChild(amountSpan);
            child.appendChild(dollarSpan);
            child.appendChild(button);
            list.appendChild(child);
        })
    }

}

export default Portfolio;