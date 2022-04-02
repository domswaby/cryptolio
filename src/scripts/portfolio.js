
class Portfolio{
    constructor(){
        this.portfolio = this.getPortfolio();
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
        }else{
            alert(`You've already added ${coin.name}`)
        }
    }

}

export default Portfolio;