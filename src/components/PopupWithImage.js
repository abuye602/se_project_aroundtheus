// PopupWithImage.js
import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(
      ".modal__preview-img"
    );
    this._captionElement = this._popupElement.querySelector("#img-name");
  }

  open(imageSrc, imageAlt) {
    this._imageElement.src = imageSrc;
    this._imageElement.alt = imageAlt;
    this._captionElement.textContent = imageAlt;
    super.open(); // Ensure modal is shown
  }
}
