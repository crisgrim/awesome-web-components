const listItem = 'awesome-list-item';
const templateListItem = document.createElement("template");
templateListItem.innerHTML = `
    <style>
      li.item {
        font-size: 20px;
        display: block;
        position: relative;
        border-bottom: 1px solid #eee;
      }
      li.item:after {
        content: "";
        clear: both;
        display: block;
      }
      li.item .like {
        width: 15px;
        height: 15px;
        position: absolute;
        left: 14px;
        top: 12px;
        background: url('../src/img/checkbox.png') no-repeat center;
        background-size: 15px;
        cursor: pointer;
      }
      li.item .like:not(.active) {
        opacity: .5;
      }
      li.item label {
        white-space: pre;
        word-break: break-word;
        padding: 10px 10px 10px 40px;
        display: block;
        transition: .2s linear;
        font-size: 14px;
        color: #333333;
        letter-spacing: -0.34px;
      }
      li.item button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
        outline: none;
      }
      li.item .close {
        position: absolute;
        top: 15px;
        right: 10px;
        font-size: 20px;
        color: #000;
        opacity: .6;
        cursor: pointer;
        background: url(https://storage.googleapis.com/adaptiveyou/adaptiveu-v2/icons/close-icon.svg) no-repeat center;
        height: 15px;
        width: 15px;
      }
      li.item .close:hover {
        opacity: 1;
      }
    </style>
    <li class="item">
        <span class="like"></span>
        <label></label>
        <button class="close"></button>
    </li>
`;

window.ShadyCSS && window.ShadyCSS.prepareTemplate(templateListItem, listItem);

class AwesomeListItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(templateListItem.content.cloneNode(true));
    this._close = this.shadowRoot.querySelector(".close");
    this._like = this.shadowRoot.querySelector(".like");
  }

  connectedCallback() {
    this._closeItem = this._closeItem.bind(this);
    this._updateItem = this._updateItem.bind(this);
    this._close.addEventListener("click", this._closeItem);
    this._like.addEventListener("click", this._updateItem);

    this._render();
  }

  disconnectedCallback() {
    this._close.removeEventListener("click", this._closeItem);
    this._like.removeEventListener("click", this._updateItem);
  }

  static get observedAttributes() {
    return ["fav"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue && oldValue !== "") {
      this._render();
    }
  }

  _closeItem() {
    this.dispatchEvent(new CustomEvent("li-remove", {
      detail: this.getAttribute("id").replace("index-", "")
    }));
  }

  _updateItem() {
    this.dispatchEvent(new CustomEvent("li-update", {
      detail: this.getAttribute("id").replace("index-", "")
    }));
  }

  _render() {
    const label = this.shadowRoot.querySelector("label");
    const like = this.shadowRoot.querySelector(".like");

    label.textContent = this.getAttribute("name");

    if (this.getAttribute("fav") === "true") {
      like.classList.add("active");
    } else {
      like.classList.remove("active");
    }
  }

}

window.customElements.define(listItem, AwesomeListItem);
