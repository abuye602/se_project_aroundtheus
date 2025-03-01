// PopupWithImage.js
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._imageElement = this._popupElement.querySelector(
      ".modal__preview-img"
    ); // Image in the modal
    this._captionElement = this._popupElement.querySelector("#img-name"); // Caption in the modal
  }

  open(name, link) {
    // Ensure the image source (src) and alt are set correctly
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open(); // Call parent open() to display the modal
  }
}
