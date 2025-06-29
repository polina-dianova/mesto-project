import {
  deleteCard,
  likeCard,
  unlikeCard
} from './api.js';


export default function createCard(data, template, imageContent) {
  const card = template.content.cloneNode(true);
  const cardElement = card.querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  likeCounter.textContent = data.likes.length;
  if (data.likes.some(user => user._id === window.myId)) {
    likeButton.classList.add('card__like-button_is-active');
  }
  
  likeButton.addEventListener('click', () => {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const toggleLike = isLiked ? unlikeCard : likeCard;

    toggleLike(data._id)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
      })
      .catch((err) => console.log(err));
  });
  

  if (data.owner._id === window.myId) {
    deleteButton.addEventListener('click', () => {
      deleteCard(data._id)
        .then(() => cardElement.remove())
        .catch((err) => console.log(err));
    });
  } else {
    deleteButton.remove();
  }
  cardImage.addEventListener('click', () => {
    imageContent(cardImage, cardTitle);
  });

  

  return cardElement;
}
