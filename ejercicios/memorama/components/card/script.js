"use strict";

const doc = (document.currentScript).ownerDocument;

/**
 * Clase que se encarga de instanciar el GameCard
 * @extends {HTMLElement}
 */
class GameCardComponent extends HTMLElement {

    templateDictionary = {
        'HIDDEN' : 'hiddenTemplate',
        'SHOW' : 'showTemplate',
        'OUT_GAME' : 'outGameTemplate',
    }

    /**
     * Creates an instance of GameCardComponent.
     * @memberof GameCardComponent
     */
    constructor() {
        super();
    }

    /**
     * @inheritdoc
     */
    connectedCallback() {
        if (this.hasAttribute('value')) {
            this.value = this.getAttribute('value');
        }
        if (this.hasAttribute('id')) {
            this.id = this.getAttribute('id');
        }
        this.attachShadow({mode: 'open'});
        this.flipToShow = new CustomEvent('flipToShow', {
            'detail': {
                'card': this,
                'flipCallback': this.setCardSide
            },
            'bubbles': true,
            composed: true,
        });
        this.flipToHide = new CustomEvent('flipToHide', {
            'detail': {
                'value': this.value,
                'id': this.id,
            },
            'bubbles': true,
            composed: true,
        });
        this.setUp();
    }

    /**
     * Método que inicializa y agrega el botón base al shadowRoot,
     * además de establecer el callback
     */
    setUp() {
        this.getTemplates();
        this.shadowRoot.appendChild(this.buttonClone);
        this.button = this.shadowRoot.getElementById('button');
        this.setCardTemplate(this.templateDictionary.HIDDEN);
        this.button.state = false;
        this.button.addEventListener('click', (event) => {
            if (this.button.state) {
                this.button.state = !this.button.state;
                this.setCardTemplate(this.templateDictionary.HIDDEN);
                this.dispatchEvent(this.flipToHide);
            } else {
                this.button.disabled = true;
                this.button.state = !this.button.state;
                this.setCardTemplate(this.templateDictionary.SHOW);
                this.dispatchEvent(this.flipToShow);
            }
            // this.setCardSide(!this.button.state);
        });
    }

    /**
     * Función encargada de eliminar el contenido hijo del botón principal
     */
    eraseActualChild() {
        let child = this.button.lastElementChild;
        while(child)  {
            this.button.removeChild(child)
            child = this.button.lastChild;
        }
    }

    /**
     * Función encargada de setear el lado de la carta con base en el argumento
     * de entrada state
     */
    setCardSide() {
        if (this.button.state) {
            this.button.state = !this.button.state;
            this.setCardTemplate(this.templateDictionary.HIDDEN);
            this.button.disabled = false;
        } else {
            this.button.state = true;
            this.setCardTemplate(this.templateDictionary.SHOW);
        }
    }

    setCompleteTemplate() {
        this.setCardTemplate(this.templateDictionary.OUT_GAME);
    }

    /// import node 
    setCardTemplate(templateId) {
        this.eraseActualChild();
        switch(templateId) {
            case this.templateDictionary.HIDDEN :
                this.button.appendChild(this.hiddenTemplate.cloneNode(true));
                break;
            case this.templateDictionary.SHOW :
                this.button.appendChild(this.showTemplate.cloneNode(true));
                this.shadowRoot.getElementById('anverse').textContent = this.value;
                break;
            case this.templateDictionary.OUT_GAME :
                this.button.appendChild(this.outGameTemplate.cloneNode(true));
                break;
        }
    }

    /**
     * Método que abstrae los templates necesarios para los 2 estados de la tarjeta,
     * + showClone clona el template de anverso o parte  visible.
     * + buttonClone es el template que contiene el botón principal y base.
     * + hiddenClone guarda el template que contiene el reverso o parte oculta de la tarjeta
     */
    getTemplates() {
        this.showTemplate = doc.getElementById('showTemplate').content;
        this.hiddenTemplate = doc.getElementById('hiddenTemplate').content;
        this.outGameTemplate = doc.getElementById('outGameTemplate').content;
        this.buttonTemplate = doc.getElementById('main');
        this.buttonClone = this.buttonTemplate.content.cloneNode(true);
    }

    cardBoardAction(event) {
    }

}
window.customElements.define('game-card', GameCardComponent);
