

export const instructionsModal = () => {

    const openModal = document.querySelector('.open-modal-btn')
    const modalContainer = document.querySelector('.modal-container')
    const closeModal = document.querySelector('.close-modal-btn')
    
    openModal.addEventListener("click", () => {
      modalContainer.classList.add('show-modal')
    });
    
    closeModal.addEventListener("click", () => {
      modalContainer.classList.remove('show-modal')
    });
}