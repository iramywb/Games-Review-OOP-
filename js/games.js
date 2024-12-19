export default class Games {
    // constructor which will take a parameter that is element of the whole game section
    constructor(element) {
        this.element = element;
    }
    // method to hide the games section
    hide() {
        this.element.classList.add('d-none');
    }
    // method to show the games section
    show() {
        this.element.classList.remove('d-none');
    }
    // isHidden method to check if the games section is hidden or not
    isHidden() {
        return this.element.classList.contains('d-none');
    }

}