import { html, css, LitElement } from 'lit-element';

export class ComponentTwo extends LitElement {
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
      <h3>${this.count}</h3>
    `;
  }
}

customElements.define('component-two', ComponentTwo);
