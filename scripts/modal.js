export {openModal, closeModal}


function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) closeModal(openedPopup);
    }
}

function closeByMouse(evt) {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (evt.target.classList.contains('popup')) {
        closeModal(openedPopup);
    }
}

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc)
    document.addEventListener('mousedown', closeByMouse);
}

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc)
    document.removeEventListener('mousedown', closeByMouse);
}

