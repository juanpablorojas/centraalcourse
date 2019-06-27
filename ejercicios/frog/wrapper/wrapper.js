// Agregar api de template y shadow DOM
class RockElement extends HTMLElement {

    static get observedAttributes() {
        return ['selected'];
    }

    rockWithFrog = `
    <div>
        <img style="margin: 0 auto; display: block;" width="70" height="50" src="./frog/assets/rana.png" />
        <img style="margin: 0 auto; display: block;" width="100" height="50" src="./rock/assets/rock.jpg" />
    </div>`;

    rockDefault = `
        <div>
            <div style="margin: 0 auto; display: block; width:70px; height:50px;" class="image__space"></div>
            <img style="margin: 0 auto;" width="100" height="50" src="./rock/assets/rock.jpg" />
        </div>`;

    constructor() {
        super();
    }

    connectedCallback() {
        if (this.hasAttribute('selected') && this.getAttribute('selected') === true) {
            this.innerHTML = this.rockWithFrog;
        } else {
            this.innerHTML = this.rockDefault;
        }
    }

    updateInnerHtml(status) {
        this.innerHTML = '';
        if (status === 'true') {
            this.innerHTML = this.rockWithFrog;
        } else {
            this.innerHTML = this.rockDefault;
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'selected') {
            this.updateInnerHtml(newValue);
        }
    }

}

window.customElements.define('rock-element', RockElement);


class WrapperElement extends HTMLElement {
    rocks = 0;
    initial = 0;
    rocksElements = [];
    actualActiveRock = 0;

    constructor() {
        super();
        if (this.hasAttribute('rocks')) {
            this.rocks = this.getAttribute('rocks');
        }
        if (this.hasAttribute('initial')) {
            this.initial = this.getAttribute('initial');
            this.actualActiveRock = this.initial;
        }
    }

    connectedCallback() {
        this.renderTemplate(this.initial);
        this.setTimer();
    }

    setTimer() {
        window.setInterval(() => {
            const random = this.randomNumber();
            this.changeRockStatus(this.actualActiveRock, false);
            this.changeRockStatus(random, true);
            this.actualActiveRock = random;
        }, 2000);
    }

    renderTemplate(selected) {
        for (let i = 0; i < this.rocks; i++) {
            let newElement = document.createElement('rock-element');
            newElement.setAttribute('id', i);
            if (parseInt(selected) === i) {
                newElement.setAttribute('selected', true);
            } else {
                newElement.setAttribute('selected', false);
            }
            this.rocksElements.push(newElement);
            this.appendChild(newElement);
        }
    }

    randomNumber() {
        return Math.floor(Math.random() * ((this.rocks) - 0)) + 0;
    }

    changeRockStatus(rockIndex, newValue) {
        this.rocksElements[parseInt(rockIndex)].setAttribute('selected', newValue);
    }
}
window.customElements.define('wrapper-element', WrapperElement);
