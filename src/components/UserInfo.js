export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // Method to set user info in the DOM
  setUserInfo({ name, job }) {
    if (this._nameElement) this._nameElement.textContent = name;
    if (this._jobElement) this._jobElement.textContent = job;
  }

  // Method to set the user avatar in the DOM
  setUserAvatar(avatarUrl) {
    if (this._avatarElement) this._avatarElement.src = avatarUrl;
  }

  // Method to get user info
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }
}
