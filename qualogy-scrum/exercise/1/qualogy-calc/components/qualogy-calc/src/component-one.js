import { html, css, LitElement } from 'lit-element';

export class ComponentOne extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
      }
    `;
  }

  static get properties() {
    return {
      count: { type: Number },
    };
  }

  constructor() {
    super();
    this.count = 0;
  }

  render() {
    return html`
      <button @click=${this.add}>Add</button>
      <button @click=${this.subtract}>Subtract</button>
    `;
  }

  add() {
    this.count = this.count+1;
  }

  subtract() {
    this.count = this.count-1 >= 0 ? this.count-1 : 0;
  }
}

customElements.define('component-one', ComponentOne);
