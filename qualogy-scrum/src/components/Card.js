import { html, css, LitElement } from "lit-element";

export class Card extends LitElement {
  static get styles() {
    return css`
      .card {
        border: 1px solid gray;
        background: white;
        margin: 5px;
        padding: 5px;
        color: black;
      }
      .card--dragged {
        visibility: hidden;
      }
      .card > * {
        margin: 5px 0;
      }
      .user {
        color: gray;
      }
      .icon {
        width: 10px;
        height: 10px;
        border-radius: 10px;
        background: green;
        display: inline-block;
        margin-right: 5px;
      }
      .status {
        display: flex;
      }

      .status div {
        flex: 1;
        width: 50%;
      }

      .tag {
        display: inline-block;
        margin-bottom: 3px;
        padding: 2px 6px;
        border-radius: 3px;
        background: lightBlue;
        color: blue;
        font-size: 0.8em;
      }
    `;
  }

  static get properties() {
    return {
      story: { type: Object },
      beingDragged: { type: Boolean },
      setStoryBeingDragged: { type: Function },
      orderOfStoryBeingDragged: { type: Number },
      setOrderOfStoryBeingDragged: { type: Function },
    };
  }

  constructor() {
    super();
    this.ondragstart = e => this._dragStart(e);
    this.ondragend = e => this._dragEnd(e);
    this.ondragover = e => this._onDragOver(e);
    this.ondragleave = e => this._onDragLeave(e);
  }

  render() {
    return this.story.title
      ? html`
          <div
            class="card ${this.beingDragged ? "card--dragged" : ""}"
            draggable="true"
            id=${this.story.id}
          >
            <p>${this.story.title}</p>
            ${this.story.assignedTo
              ? html`
                  <div class="user">
                    <span class="icon"></span
                    ><small>${this.story.assignedTo}</small>
                  </div>
                `
              : ""}
            <div class="status">
              <div>Status:</div>
              <div>${this.story.state}</div>
            </div>
            ${this.story.tags && this.story.tags.length > 0
              ? html`
                  <div class="tags">
                    ${this.story.tags.map(
                      tag =>
                        html`
                          <span class="tag">${tag}</span>
                        `
                    )}
                  </div>
                `
              : ""}
          </div>
        `
      : "";
  }

  _dragStart(event) {
    event.preventDefault;
    window.requestAnimationFrame(() => { this.beingDragged = true });
    this.setStoryBeingDragged(this.story.id);
  }

  _dragEnd(event) {
    event.preventDefault;
    this.beingDragged = false;
  }

  _onDragOver(event) {
    event.preventDefault();
    if(!this.beingDragged) {
      this.setOrderOfStoryBeingDragged(this.story.id);
    }
  }

  _onDragLeave(event) {
    event.preventDefault();
    this.setOrderOfStoryBeingDragged();
  }
}

customElements.define("component-card", Card);
