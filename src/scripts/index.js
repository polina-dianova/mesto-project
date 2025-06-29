import enableValidation from './validate.js'
import createCard from './card.js'
import {openModal, closeModal} from './modal.js'
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addCard,
  updateAvatar
} from './api.js';
import '../pages/index.css'

const placeForCards = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template')

const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

const profileImage = document.querySelector('.profile__image');

const profilePopup = document.querySelector('.popup_type_edit')
profilePopup.classList.add('popup_is-animated')
const cardPopup = document.querySelector('.popup_type_new-card')
cardPopup.classList.add('popup_is-animated')
const imagePopup = document.querySelector('.popup_type_image')
imagePopup.classList.add('popup_is-animated')
const avatarPopup = document.querySelector('.popup_type_avatar');
avatarPopup.classList.add('popup_is-animated')

const imageCloseButton = imagePopup.querySelector('.popup__close')
const image = imagePopup.querySelector('.popup__image')
const imageTitle = imagePopup.querySelector('.popup__caption')

const profileButton = document.querySelector('.profile__edit-button')
const profileCloseButton = profilePopup.querySelector('.popup__close')

const cardButton = document.querySelector('.profile__add-button')
const cardCloseButton = cardPopup.querySelector('.popup__close')

const profileFormElement = profilePopup.querySelector('.popup__form')
const nameInput = profilePopup.querySelector('.popup__input_type_name')
const jobInput = profilePopup.querySelector('.popup__input_type_description')

const cardFormElement = cardPopup.querySelector('.popup__form')
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name')
const cardUrlInput = cardPopup.querySelector('.popup__input_type_url')

const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarPopup.querySelector('.popup__input');
const avatarButton = avatarPopup.querySelector('.popup__button');
const avatarCloseButton = avatarPopup.querySelector('.popup__close')


Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url("${userData.avatar}")`;
    window.myId = userData._id;

    cards.forEach((item) => {
      const card = createCard(item, cardTemplate, imageContent);
      placeForCards.append(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });



profileButton.addEventListener('click', (evt) => {
    openModal(profilePopup)
    nameInput.value = profileTitle.textContent
    jobInput.value = profileDescription.textContent
})

profileCloseButton.addEventListener('click', (evt) => {
    closeModal(profilePopup)
})

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 

    const originalText = profileFormElement.querySelector('.popup__button').textContent;
    profileFormElement.querySelector('.popup__button').textContent = 'Сохранение...';

    updateUserInfo(nameInput.value, jobInput.value)
    .then((res) => {
        profileTitle.textContent = res.name;
        profileDescription.textContent = res.about;
        closeModal(profilePopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
        profileFormElement.querySelector('.popup__button').textContent = originalText;
    });
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit); 



profileImage.addEventListener('click', () => {
    openModal(avatarPopup);
});

avatarCloseButton.addEventListener('click', (evt) => {
    closeModal(avatarPopup)
})

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();

    const originalText = avatarButton.textContent;
    avatarButton.textContent = 'Сохранение...';

    updateAvatar(avatarInput.value)
        .then((res) => {
            profileImage.style.backgroundImage = `url(${res.avatar})`;
            closeModal(avatarPopup);
            avatarForm.reset();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            avatarButton.textContent = originalText;
        });
}

avatarForm.addEventListener('submit', handleAvatarFormSubmit);


cardButton.addEventListener('click', (evt) => {
    openModal(cardPopup)
})

cardCloseButton.addEventListener('click', (evt) => {
    closeModal(cardPopup)
})

function handleCardFormSubmit(evt) {
    evt.preventDefault(); 

    const originalText = cardFormElement.querySelector('.popup__button').textContent;
    cardFormElement.querySelector('.popup__button').textContent = 'Сохранение...';

    addCard(cardNameInput.value, cardUrlInput.value)
    .then((newCard) => {
        const card = createCard(newCard, cardTemplate, imageContent);
        placeForCards.prepend(card);
        closeModal(cardPopup);
        cardFormElement.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => {
        cardFormElement.querySelector('.popup__button').textContent = originalText;
    });
}

cardFormElement.addEventListener('submit', handleCardFormSubmit); 


function imageContent(cardImage, cardTitle) {
    imageTitle.textContent = cardTitle.textContent;
    image.setAttribute('src', cardImage.getAttribute('src'));
    image.setAttribute('alt', cardImage.getAttribute('alt'));
    openModal(imagePopup)
}

imageCloseButton.addEventListener('click', (evt) => {
    closeModal(imagePopup)
})


const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationSettings);
