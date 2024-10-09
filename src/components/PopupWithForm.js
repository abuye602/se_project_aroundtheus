import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    if (!this._popupForm) {
      throw new Error(
        `Popup form not found! Check if the form exists in the HTML for selector: ${popupSelector}`
      );
    }

    this._handleFormSubmit = handleFormSubmit;
    this.setEventListeners();
  }

  _getInputValues() {
    const inputs = this._popupForm.querySelectorAll("input");
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    // Call the parent class's setEventListeners method
    super.setEventListeners();

    // Add an event listener for the form submission
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const inputData = this._getInputValues();
      this._handleFormSubmit(inputData);
      this.close();
    });
  }
}
