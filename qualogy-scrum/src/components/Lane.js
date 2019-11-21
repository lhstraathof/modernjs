import { html, css, LitElement } from "lit-element";
import "./Card";
import "./AddStory";

export class Lane extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        flex: 1;
        width: 100%;
        height: 100%;
        margin: 0 2px;
        display: flex;
      }
      .lane {
        background: #f2f2f2;
        flex: 1;
        width: 100%;
        height: 100%;
      }
      .lane--drag-over {
        background: #e0e0e0;
      }
      h3 {
        padding: 10px 20px;
        border-bottom: solid gray 2px;
        background: white;
        margin: 0;
      }
    `;
  }

  static get properties() {
    return {
      lane: { type: String },
      stories: { type: Array },
      saveStoryBeingDropped: { type: Function },
      setStoryBeingDragged: { type: Function },
      addStory: { type: Function },
      dragOver: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.ondragenter = e => this._onDragEnter(e);
    this.ondragleave = e => this._onDragLeave(e);
    this.ondragover = e => this._onDragOver(e);
    this.ondrop = e => this._onDrop(e);
    this.dragOver = false;
  }

  render() {
    return html`
      <div class=${this.dragOver ? "lane lane--drag-over" : "lane"}>
        <h3>${this.lane}</h3>
        ${this.lane === "To Do"
          ? html`
              <component-add-story
                .addStory=${this.addStory}
                .lane=${this.lane}
              ></component-add-story>
            `
          : ""}
        ${this.stories.map(
          story => html`
            <component-card
              .story=${story}
              .setStoryBeingDragged=${this.setStoryBeingDragged}
            ></component-card>
          `
        )}
      </div>
    `;
  }

  _onDragEnter(event) {
    event.preventDefault();
    this.dragOver = true;
  }

  _onDragLeave(event) {
    event.preventDefault();
    this.dragOver = false;
  }

  _onDragOver(event) {
    event.preventDefault();
  }

  _onDrop(event) {
    event.preventDefault();
    this.saveStoryBeingDropped(this.lane);
    this._onDragLeave(event);
  }
}

customElements.define("component-lane", Lane);
