import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit; // Assign the passed function here
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this.setEventListeners();
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value; // Collect input values by name
    });
    return formValues;
  }

  setEventListeners() {
    // Listen for form submission
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // Call the form submission handler with collected input values
      this._handleFormSubmit(this._getInputValues());
    });

    // Set other event listeners
    super.setEventListeners();
  }

  close() {
    // Reset the form and close the popup
    this._popupForm.reset();
    super.close();
  }
}
