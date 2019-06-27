
class RockElement extends HTMLElement {
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

}
window.customElements.define('rock-element', RockElement);
