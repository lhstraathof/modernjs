import { html, css, LitElement } from "lit-element";

export class AddStory extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        margin: 5px;
        display: flex;
      }
      input {
          width: 70%;
          padding: 10px 6px;
          flex: 1;
          font-size: 1rem;
      }
      button {
        flex: 0 0 auto;
        width: 20%;
        display: inline-block;
        border: none;
        margin: 0;
        text-decoration: none;
        background: #BE2A21;
        color: #ffffff;
        font-family: sans-serif;
        font-size: 1rem;
        cursor: pointer;
        text-align: center;
        transition: background 250ms ease-in-out, 
                    transform 150ms ease;
        -webkit-appearance: none;
        -moz-appearance: none;
        text-align: center;
        display: flex;
        justify-content: center;
      }
    `;
  }

  static get properties() {
    return {
        value: { type: String },
        lane: { type: String },
        addStory: { type: Function },
    };
  }

  constructor() {
    super();
    this.value = "";
  }

  render() {
    return html`
      <input type="text" placeholder="New story" .value=${this.value} @change=${ e => this._updateValue(e)} /><button
        @click=${() => {
          this.addStory(this.value, this.lane);
          this.value = "";
        }}
      >+</button>
    `;
  }

  _updateValue(e) {
    this.value = e.target.value;
  }
}

customElements.define("component-add-story", AddStory);
