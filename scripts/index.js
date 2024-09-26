import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

// Wrappers
const profileEditModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");

// Elements
export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const addCardFormElement = addCardModal.querySelector(".modal__form");

// Form Validation Configuration
const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Initialize form validators
const profileFormValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
const addCardFormValidator = new FormValidator(
  validationConfig,
  addCardFormElement
);

// Enable validation
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Wrappers
const cardsWrap = document.querySelector(".cards__list");

// Elements
const profileEditbutton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");

// Form data
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

// Functions
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;

  if (name && link) {
    renderCard({ name, link }, cardsWrap);
    closeModal(addCardModal);

    // Reset form fields and disable submit button
    addCardFormElement.reset(); // Reset form fields
    addCardFormValidator.resetValidation(); // Reset validation (clear errors and deactivate button)
  }
}

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template", openModal);
  const cardElement = card.getView();
  wrapper.prepend(cardElement);
}

// Event listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

profileEditbutton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
  profileFormValidator.resetValidation(); // Reset validation state when the modal opens
});
profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

// Add new card button
addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);

  // Reset form and deactivate submit button
  addCardFormElement.reset(); // Reset form fields when modal opens
  addCardFormValidator.resetValidation(); // Reset validation state when the modal opens
});

addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

// Initial cards
initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function closeModalOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

// Overlay event listeners
profileEditModal.addEventListener("click", closeModalOverlayClick);
addCardModal.addEventListener("click", closeModalOverlayClick);
previewImageModal.addEventListener("click", closeModalOverlayClick);
