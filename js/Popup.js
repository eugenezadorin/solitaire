export class Popup {

    constructor() {
        this.el = document.querySelector('.popup-overlay');
        this.contentEl = this.el.querySelector('.popup-content');
    }

    open() {
        this.el.classList.add('is-inited');
    }

    close() {
        this.el.classList.remove('is-inited');
    }
}