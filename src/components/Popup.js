export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    console.log("Popup Element:", this._popupElement); // Log to check if modal is found
    this._handleEscClose = this._handleEscClose.bind(this);
    this.setEventListeners();
  }

  open() {
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
  }

  _handleEscClose() {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".modal__close")
      .addEventListener("click", () => this.close());
    this._popupElement.addEventListener("click", (event) => {
      if (event.target === this._popupElement) {
        this.close();
      }
    });

    document.addEventListener("keydown", this._handleEscClose);
  }
}
