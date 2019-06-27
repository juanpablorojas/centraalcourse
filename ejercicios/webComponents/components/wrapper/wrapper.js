const wDoc = (document.currentScript).ownerDocument;

/**
 * Componente envolvente que contiene la lógica de obtención de datos
 * @class WrapperComponent
 * @extends {HTMLElement}
 */
class WrapperComponent extends HTMLElement {
    persons = 10;
    template = wDoc.getElementById('wrapper-template');

    /**
     * @inheritdoc
     */
    constructor() {
        super();
        if (this.hasAttribute('persons'))  {
            const attribute = parseInt(this.getAttribute('persons'));
            this.apiUrl = (!isNaN(attribute) ? `https://randomuser.me/api/?results=${attribute}`: `https://randomuser.me/api/?results=10`); 
        }
    }

    async getPersonsData() {
        return fetch(this.apiUrl).then(data => data.json()).then(final => final.results);
    }

    /**
     * @inheritdoc
     */
    async connectedCallback() {
        const clone = this.template.content.cloneNode(true);
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(clone);
        let personsData = await this.getPersonsData().then(res => res);
        this.render(personsData);
    }

    render(personsData) {
        personsData.forEach((person) => {
            const newCardComponent = document.createElement('card-component');
            newCardComponent.setAttribute('person', JSON.stringify(person));
            this.shadowRoot.appendChild(newCardComponent);
        });
    }
}
window.customElements.define('wrapper-component', WrapperComponent);
