import { html, css, LitElement } from 'lit-element';

export class HelloWorld extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
      }
      h1 {
        color: green;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.title = 'Hey there';
  }

  render() {
    return html`
      <h1>${this.title}</h1>
    `;
  }
}

customElements.define("hello-world", HelloWorld);