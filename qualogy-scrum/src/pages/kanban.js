import { html, css, LitElement } from "lit-element";
import "./../components/Lane";

export class KanbanBoard extends LitElement {
  static get styles() {
    return css`
      .board {
        display: flex;
        margin: 0 -2px;
        height: 700px;
      }
    `;
  }

  static get properties() {
    return {
      kanbanLanes: { type: Array },
      stories: { type: Array },
      setLaneBeingDragEntered: { type: Function },
      saveStoryBeingDropped: { type: Function },
      setStoryBeingDragged: { type: Function },
      orderOfStoryBeingDragged: { type: Object },
      setOrderOfStoryBeingDragged: { type: Function },
      addStory: { type: Function },
    };
  }

  constructor() {
      super();
      this.ondragleave = e => this._onDragLeave(e);
  }

  render() {
    return html`
      <section class="board">
        ${this.kanbanLanes.map(lane => this._renderLane(lane))}
      </section>
    `;
  }

  _renderLane(lane = "To Do") {
    const filterStories = this.stories.filter(story => story.state === lane);
    return html`
        <component-lane
        .stories=${filterStories}
        .lane=${lane}
        .setLaneBeingDragEntered=${this.setLaneBeingDragEntered}
        .saveStoryBeingDropped=${this.saveStoryBeingDropped}
        .setStoryBeingDragged=${this.setStoryBeingDragged}
        .orderOfStoryBeingDragged=${this.orderOfStoryBeingDragged}
        .setOrderOfStoryBeingDragged=${this.setOrderOfStoryBeingDragged}
        .addStory=${this.addStory}
        ></component-card>
        `;
  }

  _onDragLeave(event) {
    event.preventDefault();
    this.setLaneBeingDragEntered(undefined);
  }
}

customElements.define("page-kanban", KanbanBoard);
