
class FrogElement extends HTMLElement {
    constructor() {
        super();
        this.innerHTML= `
        <div style="display: flex; justify-content: center; align-items: center;" class="frog">
            <img width="70" height="50" src="./frog/assets/rana.png" />
        </div>
        `;
    }
}
window.customElements.define('frog-element', FrogElement);
