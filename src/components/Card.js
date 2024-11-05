export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikeCard
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;

    // Updated line to handle missing owner._id
    this._ownerId = data.owner && data.owner._id ? data.owner._id : null;
    this._currentUserId = data.currentUserId || null; // Logged-in user ID

    this._likes = Array.isArray(data.likes) ? data.likes : [];
    this._isLiked = this._likes.some(
      (user) => user._id === this._currentUserId
    );

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector);
    if (!cardTemplate) {
      console.error(
        `Template with selector "${this._cardSelector}" not found.`
      );
      return null;
    }
    return cardTemplate.content.querySelector(".card").cloneNode(true);
  }

  // Inside your Card class
  _toggleLike() {
    this._handleLikeCard(this._cardId, this._isLiked)
      .then((updatedCardData) => {
        // Use a fallback if `likes` is missing
        const likes = updatedCardData.likes ? updatedCardData.likes : [];

        // Update like status
        this._isLiked = !this._isLiked;
        const likeButton = this._element.querySelector(".card__like-button");
        const likeCount = this._element.querySelector(".card__like-count");

        // Update the like button class and count
        if (this._isLiked) {
          likeButton.classList.add("card__like-button_active");
        } else {
          likeButton.classList.remove("card__like-button_active");
        }

        likeCount.textContent = likes.length;
      })
      .catch((err) => {
        console.error(`Error updating like: ${err}`);
      });
  }

  _setEventListeners() {
    if (!this._element) return; // Safety check

    const likeButton = this._element.querySelector(".card__like-button");
    const deleteButton = this._element.querySelector(".card__trash");
    const imageElement = this._element.querySelector(".card__image");

    // Add the event listener for the like button
    if (likeButton) {
      likeButton.addEventListener("click", () => {
        this._toggleLike();
      });
    }

    // Add the event listener for the delete button
    if (deleteButton) {
      if (this._ownerId === this._currentUserId) {
        deleteButton.style.display = "block"; // Make sure the button is visible
        deleteButton.addEventListener("click", () => {
          this._handleDeleteCard(this._cardId)
            .then(() => {
              this._element.remove();
              this._element = null;
            })
            .catch((err) => {
              console.error(`Error deleting card: ${err}`);
            });
        });
      } else {
        deleteButton.style.display = "none"; // Hide the delete button if not the owner
      }
    }

    // Add the event listener for the image click
    if (imageElement) {
      imageElement.addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
    }
  }

  getView() {
    this._element = this._getTemplate();
    if (!this._element) return null; // Safety check

    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");
    const likeCount = this._element.querySelector(".card__like-count");

    if (cardImage) {
      cardImage.src = this._link;
      cardImage.alt = this._name;
    } else {
      console.error("Card image element not found.");
    }

    if (cardTitle) {
      cardTitle.textContent = this._name;
    } else {
      console.error("Card title element not found.");
    }

    if (likeCount) {
      likeCount.textContent = this._likes.length;
    } else {
      console.error("Card like count element not found.");
    }

    this._setEventListeners();
    return this._element;
  }
}
