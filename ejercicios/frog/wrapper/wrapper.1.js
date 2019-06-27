
class RockElement extends HTMLElement {
    static get observedAttributes() {
        return ['selected'];
    }

    rockWithFrog  = `
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
        if (this.hasAttribute('selected')) {
            this.innerHTML = this.rockWithFrog;
        } else {
            this.innerHTML = this.rockDefault;
        }
    }

    updateInnerHtml(status) {
        if (status === false) {
            this.innerHTML = this.rockDefault;
        } else if (status) {
            this.innerHTML = this.rockWithFrog;
        }
    }

    attributeChangedCallback(name, odlValue, newValue) {
        if (name === 'selected') {
            this.updateInnerHtml(newValue);
        }
    }

}

window.customElements.define('rock-element', RockElement);


class WrapperElement extends HTMLElement {
    prefixHtml = '<div id="wrapper" class="wrapper__body">';
    rockElement = `<rock-element></rock-element>`;
    selectedRockElement = `<rock-element selected></rock-element>`;
    posFixHtml = '</div>';
    rocks = 0;
    initial = 0;
    constructor() {
        super();
        if (this.hasAttribute('rocks')) {
            this.rocks = this.getAttribute('rocks');
        }
        if (this.hasAttribute('initial')) {
            this.initial = this.getAttribute('initial');
        }
        this.innerHTML = this.renderTemplate(this.rocks, this.initial);
        this.setTimer();
    }

    setTimer() {
        window.setInterval(() => {
            this.innerHTML = this.renderTemplate(this.rocks, this.randomNumber());
        },2000);
    }

    renderTemplate(rocks, selected) {
        let template = '';
        template = template.concat(this.prefixHtml);
        this.innerHTML = '';
        for(let i = 0; i < this.rocks; i++) {
            if (parseInt(selected) === i) {
                template = template.concat(this.selectedRockElement);
            } else {
                template = template.concat(this.rockElement);
            }
        }
        template = template.concat(this.posFixHtml);
        return template;
    }

    randomNumber() {
        return Math.floor(Math.random() * ((this.rocks) - 0)) + 0;
    }
}
window.customElements.define('wrapper-element', WrapperElement);
