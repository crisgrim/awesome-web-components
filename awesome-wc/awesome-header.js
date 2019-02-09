const header = 'awesome-header';
const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `
    <style>
        header {
          background-color: #000000;
          padding: 20px;
        }
        ul {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          padding: 0 15px;
        }
        a {
          color: #ffffff;
          text-decoration: none;
        }
    </style>
    <header>
        <ul id="awesome-header"></ul>
    </header>`;

window.ShadyCSS && window.ShadyCSS.prepareTemplate(headerTemplate, header);

class AwesomeHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
    this._itemsList = [
      {
        name: 'Input',
        url: 'index_input.html'
      },
      {
        name: 'ToDo',
        url: 'index_todo.html'
      },
      {
        name: 'Dogs',
        url: 'index_dogs.html'
      }
    ]
  }

  connectedCallback() {
    this.awesomeList = this.shadowRoot.querySelector("#awesome-header");
    this._itemsList.forEach((item, index) => {
      let listItem = document.createElement("li");
      listItem.innerHTML = `<a id="link-${index}" href="${item.url}">${item.name}</a>`;
      this.awesomeList.appendChild(listItem);
    });
  }
}

window.customElements.define(header, AwesomeHeader);
