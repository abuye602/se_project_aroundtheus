import { profileEditForm, addCardFormElement } from "./index.js";
import FormValidator from "../components/FormValidator.js";

// Configuration object for validation
const formValidatorConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__error",
};

// Create FormValidator instances for each form
const profileFormValidator = new FormValidator(
  formValidatorConfig,
  profileEditForm
);
const addCardFormValidator = new FormValidator(
  formValidatorConfig,
  addCardFormElement
);

// Enable validation for each form
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
