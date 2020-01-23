import { LitElement, html, css } from 'lit-element';
import './component-one';
import './component-two';

export class QualogyCalc extends LitElement {

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
      }

      :host > * {
        width: 100%;
      }
    `;
  }

  render() {
    return html`
      <component-one></component-one>
      <component-two></component-two>
    `;
  }

}
