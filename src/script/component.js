// header-component.js
class HeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
            <header>
                <h1>All Note Cards</h1>
            </header>
        `;
  }
}

class FooterComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
            <footer>
                <h1>Note Apps by Ridhwan</h1>
            </footer>
        `;
  }
}

class AsideComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
            <aside>
                <div class="add-note">
                    <a href="#"><img src="img/add.png" alt="Add Note"></a>
                </div>
            </aside>
        `;
  }
}

customElements.define("add-note-component", AsideComponent);
customElements.define("header-component", HeaderComponent);
customElements.define("footer-component", FooterComponent);
