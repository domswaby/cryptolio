
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
           this.portfolio.push(coin);
           localStorage.setItem("portfolio", JSON.stringify(this.portfolio))
           this.updatePortList();
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
        let button; 
        this.portfolio.forEach((ele) => {
            child = document.createElement('li')
            button = document.createElement('button');
            button.innerHTML = 'remove'
            button.addEventListener("click", (e) => {
                this.removeCoin(ele);
            })
            child.innerHTML = ele.id; 
            child.appendChild(button);
            list.appendChild(child);
        })
    }

}

export default Portfolio;