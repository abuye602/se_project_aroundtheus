import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

const popupWithImage = new PopupWithImage({
  popupSelector: "#img-preview-modal",
});

// Create an instance of UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__title", // Selector for the user's name
  jobSelector: ".profile__description", // Selector for the user's job
});

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

// Function to create card elements
function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView(); // Return the card element
}

// Renderer function for the Section class
const renderer = (item) => {
  const cardElement = createCard(item); // Create the card element
  section.addItem(cardElement); // Add it to the section
};

// Initialize Section AFTER defining initialCards
const section = new Section({ items: initialCards, renderer }, ".cards__list");

// Now, render the items
section.renderItems();

// Assuming `addCardModal` is the modal element for adding a new card
document.addEventListener("DOMContentLoaded", () => {
  const popupWithForms = new PopupWithForm( // Notice the corrected class name
    {
      popupSelector: "#add-card-modal", // Ensure the selector matches your HTML
    },
    handleAddCardSubmit
  );
});
// Wrappers
const cardsWrap = document.querySelector(".cards__list");

// Elements
const profileEditbutton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const previewImageModal = document.querySelector("#img-preview-modal");
const previewImageElement = previewImageModal.querySelector(
  ".modal__preview-img"
); // Selects the image
const previewImageCaption = previewImageModal.querySelector("#img-name");
const previewImageCloseButton =
  previewImageModal.querySelector(".modal__close");

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

// New function to handle image click
function handleImageClick(imageSrc, imageAlt) {
  popupWithImage.open(imageSrc, imageAlt);
}

previewImageCloseButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

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
    addCardFormValidator.disableSubmitButton(); // Reset validation (clear errors and deactivate button)
  }
}

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template", handleImageClick); // Use handleImageClick here
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

previewImageCloseButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

// Add new card button
addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
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
