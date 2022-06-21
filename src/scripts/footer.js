
    // footer
    
    export const footer = () => {
        let footer = document.querySelector("footer");
        let date = new Date();
        let year = date.getFullYear();
        footer.innerHTML = `All rights reserved ©${year}`; 
    }