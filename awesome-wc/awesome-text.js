const text = 'awesome-text';
const templateText = document.createElement("template");

class AwesomeText extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(templateText.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          text-align: center;
        }
        slot {
          margin: 0 auto 10px;
        }
      </style>
      <slot name="title"></slot>
      <slot name="subtitle"></slot>`;
  }
}

window.customElements.define(text, AwesomeText);