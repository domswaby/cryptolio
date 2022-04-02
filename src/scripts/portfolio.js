
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

    updatePortList(){
        if(this.portfolio.length === 0) return;
        let list = document.querySelector("#port-list"); 
        list.innerHTML = ''; 
        let child; 
        this.portfolio.forEach((ele) => {
            child = document.createElement('li')
            child.innerHTML = ele.id; 
            list.appendChild(child);
        })
    }

}

export default Portfolio;