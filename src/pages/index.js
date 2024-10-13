import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import { initialCards, validationConfig } from "../utils/constants.js"; // Import initialCards and validationConfig

// Create an instance of PopupWithImage for handling image preview
const popupWithImage = new PopupWithImage({
  popupSelector: "#img-preview-modal",
});
popupWithImage.setEventListeners();

// Create an instance of UserInfo for managing profile information
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// Wrappers for modals
const profileEditModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");

// Elements
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");

// Initialize form validators
const profileFormValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
const addCardFormValidator = new FormValidator(
  validationConfig,
  addCardFormElement
);
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Function to create a card
function createCard(item) {
  const card = new Card(item, "#card-template", (name, link) => {
    popupWithImage.open(name, link); // Open image preview when clicked
  });
  return card.getView(); // Return the card element
}

// Initialize Section to render initial cards
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item); // Use createCard function
      section.addItem(cardElement); // Add the card element to the section
    },
  },
  ".cards__list"
);
section.renderItems(); // Render initial cards

// PopupWithForm for adding a new card
const popupWithAddCardForm = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (formData) => {
    const cardElement = createCard({
      name: formData.title, // Retrieve title from form
      link: formData.url, // Retrieve URL from form
    });
    section.addItem(cardElement); // Add the new card to the section
    popupWithAddCardForm.close(); // Close the modal after submission

    // After submitting, reset form fields and disable the submit button
    addCardFormElement.reset(); // Reset the form fields
    addCardFormValidator.disableSubmitButton(); // Disable submit button after form reset
  },
});

// Event listener to open the add card modal
document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardFormValidator.resetValidation(); // Reset validation errors but don’t disable the button
  popupWithAddCardForm.open();
});

// PopupWithForm for editing the profile
const popupWithProfileEditForm = new PopupWithForm({
  popupSelector: "#edit-modal",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo({
      name: formData.title, // Retrieve title (name) from the form
      job: formData.description, // Retrieve description (job) from the form
    });
    popupWithProfileEditForm.close(); // Close the modal after submission
  },
});

// Event listener to open the profile edit modal
document.querySelector("#profile-edit-button").addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  document.querySelector("#profile-title-input").value = userData.name;
  document.querySelector("#profile-description-input").value = userData.job;
  profileFormValidator.resetValidation(); // Reset validation errors
  popupWithProfileEditForm.open();
});
