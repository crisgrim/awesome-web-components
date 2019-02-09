const input = 'awesome-input';
const inputTemplate = document.createElement('template');
inputTemplate.innerHTML = `
    <style>
        input {
            position: relative;
            width: 100%;
            border: 0;
            outline: none;
            padding: 10px 15px;
            margin: 3px 0;
            font-weight: 300;
            box-sizing: border-box;
            border-radius: 4px;
            background: #FFFFFF;
            box-shadow: 0 2px 4px 0 #ff9800;
            font-family: AvenirNext-Regular;
            font-size: 14px;
            color: #333333;
        }
    </style>
    <input type="text" placeholder="Enter something" />`;

window.ShadyCSS && window.ShadyCSS.prepareTemplate(inputTemplate, input);

class AwesomeInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(inputTemplate.content.cloneNode(true));
    this._input = this.shadowRoot.querySelector("input");
  }

  connectedCallback() {
    this._sendOutput = this._sendOutput.bind(this);
    this._input.addEventListener("keypress", this._sendOutput);
  }

  disconnectedCallback() {
    this._input.removeEventListener("keypress", this._sendOutput);
  }

  _sendOutput(e) {
    if (e.keyCode === 13) {
      if (!e.target.value || e.target.value.trim() === "") return;
      this.dispatchEvent(new CustomEvent("input-output", {
        detail: e.target.value
      }));
      e.target.value = "";
    }
  }
}

window.customElements.define(input, AwesomeInput);
