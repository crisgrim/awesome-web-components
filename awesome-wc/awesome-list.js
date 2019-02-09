const list = 'awesome-list';
const templateList = document.createElement("template");
templateList.innerHTML = `
    <style>
        section {
          margin: 60px auto;
          position: relative;
          width: 80%;
        }
        ul {
          background: #FFFFFF;
          border-radius: 4px;
          list-style: none;
          margin: 0;
          overflow: auto;
          padding: 0;
        }
    </style>
    <section>
        <awesome-input></awesome-input>
        <ul id="awesome-list"></ul>
    </section>`;

window.ShadyCSS && window.ShadyCSS.prepareTemplate(templateList, list);

class AwesomeList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(templateList.content.cloneNode(true));
    this._itemsList = [{
        name: "Learn Vue",
        fav: true
      },
      {
        name: "Learn React",
        fav: true
      },
      {
        name: "Learn Angular",
        fav: true
      },
      {
        name: "Learn VanillaJS",
        fav: true
      },
      {
        name: "Build Web Components",
        fav: false
      }
    ];
    this._mapRemove = new WeakMap();
    this._mapUpdate = new WeakMap();
  }

  // removes the selected item
  removeItem(e) {
    this._itemsList.splice(e.detail, 1);
    this._render();
  };

  // updates the selected item as favourite
  updateFav(e) {
    const item = Object.assign({}, this._itemsList[e.detail]);
    item["fav"] = item["fav"] ? false : true;
    this._itemsList[e.detail] = item;
    this.shadowRoot
      .querySelector("#index-" + e.detail)
      .setAttribute("fav", this._itemsList[e.detail]["fav"]);
  };

  // adds the item, received from the input, and calls render, so that it rerenders the data
  addItem(e, item){
    item = {};
    item["name"] = e.detail;
    item["fav"] = false;

    this.clearListeners();
    this._itemsList = [...this._itemsList, item];
    this._render();
  };

  connectedCallback() {
    this._render();
    this._element = this.shadowRoot.querySelector("awesome-input");
    this._element.addEventListener("input-output", this.addItem.bind(this));
  }

  disconnectedCallback() {
    const input = this._element;
    input.removeEventListener("input-output");

    this.clearListeners();
  }

  clearListeners() {
    this._itemsList.forEach((item, index) => {
      const listItem = this.shadowRoot.querySelector(`#index-${index}`);
      const removeItemBinded = this._mapRemove.get(listItem);
      const updateItemBinded = this._mapUpdate.get(listItem);
      listItem.removeEventListener("li-remove", removeItemBinded);
      listItem.removeEventListener("li-update", updateItemBinded);
    });
  }

  _render() {
    this.awesomeList = this.shadowRoot.querySelector("#awesome-list");
    this.awesomeList.innerHTML = "";

    this._itemsList.forEach((item, index) => {
      let listItem = document.createElement("awesome-list-item");
      listItem.setAttribute("name", item.name);
      listItem.setAttribute("fav", item.fav);
      listItem.setAttribute("id", "index-" + index);

      const removeItemBinded = this.removeItem.bind(this);
      const updateItemBinded = this.updateFav.bind(this);
      this._mapRemove.set(listItem, removeItemBinded);
      this._mapUpdate.set(listItem, updateItemBinded);

      listItem.addEventListener("li-remove", removeItemBinded);
      listItem.addEventListener("li-update", updateItemBinded);
      this.awesomeList.appendChild(listItem);
    });
  }
}

window.customElements.define(list, AwesomeList);