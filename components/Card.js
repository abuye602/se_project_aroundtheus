// export default class Card {
//   constructor({ name, link }, cardSelector) {
//     this._name = name;
//     this._link = link;
//     this._cardSelector = cardSelector;
//   }

//   _setEventListeners() {
//     // ".card__like-button"
//     this.cardElement
//       .querySelector(".card__like-button")
//       .addEventListner("click", () => {
//         this._likeButton();
//       });

//     // ".card__trash"
//     this._cardElement
//       .querySelector(".card__trash")
//       .addEventListner("click", () => {
//         this._trashButton();
//       });
//   }

//   _trashButton() {
//     this.cardElement.remove();
//     this.cardElement = null;
//   }

//   _likeButton() {
//     this._cardElement
//       .querySelector(".card__like-button")
//       .classList.toggle("card__like-button_is-active");
//   }

//   getView() {
//     this.cardElement = document
//       .querySelector(this._cardSelector)
//       .cloneNode(true);

//     // get the card view
//     // set event listeners
//     this._setEventListeners();
//     // return the card
//   }
// }

// DONT USE JUST YET

// Card.js
export default class Card {
  constructor({ name, link }, cardSelector, handlePreviewPicture) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handlePreviewPicture = handlePreviewPicture;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        // Handle like button click
      });

    this._cardElement
      .querySelector(".card__trash")
      .addEventListener("click", () => {
        this._cardElement.remove();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handlePreviewPicture(this._link, this._name);
      });
  }

  getView() {
    const cardTemplate = document.querySelector(this._cardSelector);
    if (!cardTemplate)
      throw new Error(`Template ${this._cardSelector} not found.`);

    this._cardElement = cardTemplate.content.cloneNode(true);
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
