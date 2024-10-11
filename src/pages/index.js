import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import { initialCards } from "../utils/constants.js"; // Import the initialCards array

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

// Form validation configurations
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
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Create and render cards using Section class
const section = new Section(
  {
    items: initialCards, // Use the imported initialCards
    renderer: (item) => {
      const card = new Card(item, "#card-template", (name, link) => {
        popupWithImage.open(name, link);
      });
      section.addItem(card.getView());
    },
  },
  ".cards__list"
);
section.renderItems();

// PopupWithForm for adding a new card
const popupWithAddCardForm = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (formData) => {
    console.log("Add Card Form Data:", formData); // Add this to inspect the form data

    const card = new Card(
      {
        name: formData.title, // Retrieve title correctly
        link: formData.url, // Retrieve URL correctly
      },
      "#card-template",
      (name, link) => {
        popupWithImage.open(name, link); // Show preview when clicked
      }
    );
    section.addItem(card.getView()); // Add the new card to the section
    popupWithAddCardForm.close(); // Close the modal after submission
  },
});

// Event listener to open the add card modal
document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  popupWithAddCardForm.open();
});

// PopupWithForm for editing the profile
const popupWithProfileEditForm = new PopupWithForm({
  popupSelector: "#edit-modal",
  handleFormSubmit: (formData) => {
    console.log("Form Data from Edit Profile:", formData); // Log form data

    // Ensure that the formData contains both name and job
    userInfo.setUserInfo({
      name: formData.title, // Ensure these keys match the form's input names
      job: formData.description, // If the form uses different names, adjust accordingly
    });
    popupWithProfileEditForm.close(); // Close the modal after submission
  },
});

// Event listener to open the profile edit modal
document.querySelector("#profile-edit-button").addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  document.querySelector("#profile-title-input").value = userData.name;
  document.querySelector("#profile-description-input").value = userData.job;
  profileFormValidator.resetValidation();
  popupWithProfileEditForm.open();
});
