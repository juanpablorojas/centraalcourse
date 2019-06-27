const doc = (document.currentScript).ownerDocument;

/**
 * Componente que alberga la tarjeta para los usuarios
 * */
class CardComponent extends HTMLElement {
    template = doc.createElement('template');
    personData = '';
    template = doc.getElementById('card-template');
    clone = this.template.content.cloneNode(true);
    diag = this.clone.firstElementChild;

    /**
     * @inheritdoc
     **/
    constructor() {
        super();
    }

    /**
     * @inheritdoc
     */
    connectedCallback() {
        if (this.hasAttribute('person')) {
            this.personData = JSON.parse(this.getAttribute('person'));
        }
        this.attachShadow({mode: 'open'});
        this.generateTemplate();
        this.shadowRoot.appendChild(this.clone);
        this.shadowRoot.appendChild(this.clone);
    }

    generateTemplate() {
        const gender = `<span slot="gender"><p class="label">${this.personData.gender}</p></span>`;
        const image = `<span slot="profile_image"><img src="${this.personData.picture.medium}" /></span>`;
        const fullName = `<span slot="name"><p class="label">${this.personData.name.first+ ' '+this.personData.name.last}</p></span>`;
        this.innerHTML = `<style>.full__name { margin: 0; } .label { display: inline-block; margin:0; } img { border-radius: 10px; }</style>${gender}${image}${fullName}`;
    }
}

/** 
 * Definiendo o registrando el custom element.
 */
window.customElements.define('card-component', CardComponent);
