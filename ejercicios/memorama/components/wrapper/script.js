"use strict";
// ver ejemplo de import node al atraér los templates
const xdoc = (document.currentScript).ownerDocument;

/**
 * Clase que crea el wrapper del juego memorama.
 */
class CardGameWrapper extends HTMLElement {
    /*
     * Variable que almacenará los eventos de las game cards.
     */
    flipCards = [];

    /**
     * Cartas creadas
     */
    onTableCards = [];

    /**
     * Número de grupos de tarjetas que tiene el mismo valor.
     */
    groups = 3;

    /**
     * Número de tarjetas iguales que se necesitan levantar para completar el grupo.
     */
    groupMembers = 2;

    /**
     * Número de grupos terminados
     */
    completedGroups = 0;

    /**
     * Nodos hijos de background
     */
    backgroundSiblings = [];

    /**
     * Creates an instance of CardGameWrapper.
     */
    constructor() {
        super();
        if (this.hasAttribute('groups')) {
            const groups = this.getAttribute('groups');
            if (!isNaN(groups)) {
                this.groups = Math.floor(groups);
            }
        }

        if (this.hasAttribute('groupMembers')) {
            const members = this.getAttribute('groupMembers');
            if (!isNaN(members)) {
                this.groupMembers = Math.floor(members);
            }
        }
        this.setUp();
    }

    /**
     * Método que se encarga de la inicialización de los templates necesarios.
     */
    setUp() {
        this.mainTemplate = xdoc.getElementById('background').content;
        this.gameCardTemplate = xdoc.getElementById('gameCard').content;
        this.greetingsTemplate = xdoc.getElementById('greetings').content;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.mainTemplate.cloneNode(true));
        this.gameBackground = this.shadowRoot.getElementById('gameBackground');
    }

    /**
     * @inheritdoc
     */
    connectedCallback() {
        this.createGameCards();
        this.drawGameCards();
        this.addEventListener('flipToShow', (event) => {
            if (this.addFlipEvent(event)) {
            } else {
                setTimeout(() => {
                    this.resetFlipCards();
                    this.resetFlipEvents();
                },1000);
            }
        });
        this.addEventListener('flipToHide', (event) => {
        });
        this.backgroundSiblings = this.gameBackground.childNodes;
    }

    resetFlipCards() {
        for (let card of this.flipCards)  {
            const flipF = card.setCardSide.bind(card);
            flipF(false);
        }
    }

    resetFlipEvents() {
        this.flipCards = [];
        this.flipCards.length = 0;
        this.terminatedGame();
    }

    terminatedGame() {
        if (this.completedGroups === this.groups) {
            let child = this.gameBackground.lastElementChild;
            while(child)  {
                this.gameBackground.removeChild(child)
                child = this.gameBackground.lastChild;
            }
            this.gameBackground.appendChild(this.greetingsTemplate);
        }
    }

    addFlipEvent(event) {
        this.flipCards.push(event.detail.card);
        if (this.verifyCards(event.detail.card.value)) {
            if (this.flipCards.length === this.groupMembers) {
                this.blockCards();
                setTimeout(() => {
                    this.completedGroups++;
                    this.removeCompletedGroup();
                },1000);
            }
            return  true;
        } else {
            return false;
        }
    }

    blockCards() {

    }

    removeCompletedGroup() {
        for (let card of this.flipCards) {
            const callBack = card.setCompleteTemplate.bind(card);
            callBack();
        }
        this.resetFlipEvents();
    }

    verifyCards(testValue) {
        for (let card of this.flipCards) {
            if (card.value !== testValue) {
                return false;
            }
        }
        return true;
    }

    /**
     * Método encargado de crear las tarjetas de juego con sus respectivos valores e ids
     * @todo crear soporte para que la tarjeta soporte valores proporcionados por el 
     * usuario
     */
    createGameCards() {
        for (let i = 0; i < (this.groups); i++) {
            for (let x = 0; x < this.groupMembers; x++) {
                const tmpCard = xdoc.createElement('game-card');
                // tmpCard.callback = 
                tmpCard.setAttribute('id', `${i}-${x}`);
                tmpCard.setAttribute('value', i);
                this.onTableCards.push(tmpCard);
            }
        }
    }

    /**
     * Función encargada de ingresar las cartas al shadowDom de manera aleatoria
     */
    drawGameCards() {
        let usedIndexes = [];
        do {
            const random =  Math.floor(Math.random() * ((this.onTableCards.length) - 0)) + 0;
            if (usedIndexes.indexOf(random) === -1) {
                this.gameBackground.appendChild(this.onTableCards[random]);
                usedIndexes.push(random);
            }
        } while(usedIndexes.length !== this.onTableCards.length);
    }

}

window.customElements.define('card-game', CardGameWrapper);
