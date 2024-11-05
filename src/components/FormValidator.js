// FormValidator.js
export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    console.log("Input Element:", inputElement); // Debug log
    console.log("Error Element:", errorElement); // Debug log

    if (errorElement) {
      // Check if errorElement exists
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._settings.errorClass);
    } else {
      console.warn(`Error element for ${inputElement.id} not found!`);
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton(); // Call disableSubmitButton here
    } else {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  // Rest form validation state (clear errors  and disable suybmit button if needed)
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}
