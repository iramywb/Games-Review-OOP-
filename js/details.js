export default class Details {
    // constructor that take a parameter which is the element of the whole details section
    constructor(element) {
        this.element = element;
    }
    // method to hide and another method to show the details section
    hide() {
        this.element.classList.add('d-none');
    }
    show() {
        this.element.classList.remove('d-none');
    }
    // isHidden method to check if the details section is hidden or not
    isHidden() {
        return this.element.classList.contains('d-none');
    }
}