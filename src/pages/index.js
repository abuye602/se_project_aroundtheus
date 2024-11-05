import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import { initialCards, validationConfig } from "../utils/constants.js"; // Import initialCards and validationConfig
import Api from "../components/Api.js";

// Api instance
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "487e10dc-487f-4f75-babd-ae7374690eab", // Replace with your token
    "Content-Type": "application/json",
  },
});

// Fetch and render user info and initial cards
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    console.log("API Cards Data:", cards);
    console.log("User Data:", userData); // Debug log for user data
    console.log("Cards Data:", cards); // Debug log for cards data
    // Set user info on the page
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      id: userData._id,
    });
    // Render the cards from the server
    userInfo.setUserAvatar(userData.avatar);
    section.renderItems(cards); // Check if this works
  })
  .catch((err) => {
    console.error(`Error: ${err}`); // Log any errors
  });

// PopupWithForm for adding a new card
const popupWithAddCardForm = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (formData) => {
    const saveButton = addCardModal.querySelector(".modal__button");
    const originalText = saveButton.textContent;

    saveButton.textContent = "Creating...";

    // Ensure formData contains 'title' and 'url'
    api
      .addCard(formData.title, formData.url) // Make sure these keys match your form input names
      .then((newCardData) => {
        console.log("New Card Data:", newCardData); // Debug log to check the response
        const cardElement = createCard(newCardData);
        section.addItem(cardElement); // Add the new card to the section
        popupWithAddCardForm.close(); // Close the modal
        addCardFormElement.reset(); // Reset the form fields
        addCardFormValidator.disableSubmitButton(); // Disable the submit button
      })
      .catch((err) => {
        console.error(`Error adding card: ${err}`);
      })
      .finally(() => {
        saveButton.textContent = originalText;
      });
  },
});

// Create an instance of PopupWithImage for handling image preview
const popupWithImage = new PopupWithImage({
  popupSelector: "#img-preview-modal",
});
popupWithImage.setEventListeners();

// Create an instance of UserInfo for managing profile information
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
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
  console.log("Card data:", item); // Add this debug log
  const card = new Card(
    item, // Pass the complete item data
    "#card-template",
    (name, link) => popupWithImage.open(name, link),
    (cardId) => api.deleteCard(cardId),
    (cardId, isLiked) =>
      isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId)
  );
  return card.getView();
}

// Initialize Section to render initial cards
const section = new Section(
  {
    items: [], // No need for initialCards, we use cards from the API
    renderer: (item) => {
      const cardElement = createCard(item);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);

// Event listener to open the add card modal
document.querySelector(".profile__add-button").addEventListener("click", () => {
  popupWithAddCardForm.open();
});

// PopupWithForm for editing the profile
const popupWithProfileEditForm = new PopupWithForm({
  popupSelector: "#edit-modal",
  handleFormSubmit: (formData) => {
    // Select the save button
    const saveButton = profileEditModal.querySelector(".modal__button");
    const originalText = saveButton.textContent; // Save the original text

    // Update the button text to "Saving..."
    saveButton.textContent = "Saving...";

    api
      .updateUserInfo(formData.title, formData.description)
      .then((updatedUserData) => {
        userInfo.setUserInfo({
          name: updatedUserData.name,
          job: updatedUserData.about,
        });
        popupWithProfileEditForm.close(); // Close the modal
      })
      .catch((err) => {
        console.error(`Error updating profile: ${err}`);
      })
      .finally(() => {
        // Revert the button text back to the original text
        saveButton.textContent = originalText;
      });
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

// Select the avatar change modal and form elements
const avatarEditButton = document.querySelector(".profile__image-edit-button");
const changeAvatarModal = document.querySelector("#change-avatar-modal");
const changeAvatarFormElement = changeAvatarModal.querySelector(".modal__form");

// Initialize the form validator for the avatar form
const avatarFormValidator = new FormValidator(
  validationConfig,
  changeAvatarFormElement
);
avatarFormValidator.enableValidation();

const avatarEditModal = document.querySelector("#change-avatar-modal");

// Initialize the PopupWithForm instance for the avatar change
const popupWithChangeAvatarForm = new PopupWithForm({
  popupSelector: "#change-avatar-modal",
  handleFormSubmit: (formData) => {
    const saveButton = avatarEditModal.querySelector(".modal__button");
    const originalText = saveButton.textContent; // Save the original button text

    // Update the button text to "Saving..."
    saveButton.textContent = "Saving...";

    api
      .updateUserAvatar(formData.avatar) // Make the API call
      .then((updatedUserData) => {
        userInfo.setUserAvatar(updatedUserData.avatar); // Update the avatar image
        popupWithChangeAvatarForm.close(); // Close the modal
      })
      .catch((err) => {
        console.error(`Error updating avatar: ${err}`); // Log any error
      })
      .finally(() => {
        // Always reset the button text back to the original text
        saveButton.textContent = originalText;
      });
  },
});

// Event listener to open the avatar change modal
avatarEditButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation(); // Reset validation errors and button state
  popupWithChangeAvatarForm.open(); // Open the modal
});
