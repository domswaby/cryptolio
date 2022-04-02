
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
        this.portfolio.push(coin);
        localStorage.setItem("portfolio", JSON.stringify(this.portfolio))
    }

}

export default Portfolio;