const image = 'awesome-image';
const imageTemplate = document.createElement('template');

window.ShadyCSS && window.ShadyCSS.prepareTemplate(imageTemplate, image);

class AwesomeImage extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({mode: 'open'});
    this._root.appendChild(imageTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this._render();
  }

  static get observedAttributes() {
    return ['query'];
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    const query = this.getAttribute("query");
    const queryParams = query ? `breed/${query}/images/random` : `breeds/image/random`;

    fetch(`https://dog.ceo/api/${queryParams}`).then((response) => {
      return response.json();
    }).then(({ message }) => {
      const title = query ? query : 'Random';

      return this._root.innerHTML = `
        <style>
          :host {
            display: block;
          }
          img {
            border-radius: 10px;
            display: block;
            margin: 20px auto;
            width: 80%;
          }
          figcaption {
            text-align: center;
            text-transform: capitalize;
          }
        </style>
        <figure>
          <img src="${message}"/>
          <figcaption>${title}</figcaption>
        </figure>`
    }
    );
  }
}

window.customElements.define(image, AwesomeImage);