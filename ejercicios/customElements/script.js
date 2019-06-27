
class CustomFor extends HTMLElement {
    defaultHtmlTemplate = `<div><h1>Hola</h1></div>`;
    constructor() {
        super();
        let html = "";
        if (this.hasAttribute('times') && typeof(this.getAttribute('times') === 'number')) {
            const times =  parseInt(this.getAttribute('times'));
            for (let i = 0; i < times; i++) {
                html = html.concat(this.defaultHtmlTemplate);
            }
        }
        this.innerHTML = html;
    }
}

window.customElements.define('custom-for', CustomFor);
