import { html, css, LitElement } from "lit-element";
import "./pages/kanban";
import "./pages/backlog";
import Logo from "./assets/logo-small.png";

export class QualogyScrum extends LitElement {
  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        color: #1a2b42;
        width: 100%;
        margin: 0 auto;
      }
      h1 {
        color: green;
      }
      main {
        width: 960px;
        margin: 0 auto;
        flex-grow: 1;
      }
      header {
        width: 100%;
        padding: 15px 30px;
        border-bottom: 1px solid silver;
        margin-bottom: 60px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }

      .joke {
        font-size: 0.9rem;
        color: gray;
        text-align: center;
      }

      nav {
        margin-left: auto;
      }

      .menu li {
        display: inline-block;
        margin-left: 20px;
        cursor: pointer;
        color: blue;
      }

      .menu li:hover {
        color: green;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      storyBeingDragged: { type: Number },
      orderOfStoryBeingDragged: { type: Object },
      stories: { type: Array },
      joke: { type: String },
      page: { type: String }
    };
  }

  constructor() {
    super();
    this._saveStoryBeingDropped = this._saveStoryBeingDropped.bind(this);
    this._setStoryBeingDragged = this._setStoryBeingDragged.bind(this);
    this._setLaneBeingDragEntered = this._setLaneBeingDragEntered.bind(this);
    this._setOrderOfStoryBeingDragged = this._setOrderOfStoryBeingDragged.bind(
      this
    );
    this._addStory = this._addStory.bind(this);
    this.title = "Hey Qualogy";
    this.stories = [
      {
        id: 1,
        title: "Intro",
        assignedTo: undefined,
        state: "To Do",
        tags: [],
      },
      {
        id: 2,
        title: "Setup Tooling",
        assignedTo: "Lars Straathof",
        state: "To Do",
        tags: ["Presenting"],
      },
      {
        id: 3,
        title: "ES6 Features",
        assignedTo: "Lars Straathof",
        state: "To Do",
        tags: ["Presenting", "Develop"],
      }
    ];
    this.kanbanLanes = ["To Do", "Doing", "Done"];
    this.laneBeingDragEntered = undefined;
    this.storyBeingDragged = undefined;
    this.orderOfStoryBeingDragged = undefined;
    this.page = "kanban";
  }

  firstUpdated() {
    this._getJoke();
  }

  render() {
    return html`
      <header>
        <img src=${Logo} width="150px" />
        <nav>
          <ul class="menu">
            <li @click=${this._menuClick} name="kanban">Kanban</li>
            <li @click=${this._menuClick} name="backlog">Backlog</li>
          </ul>
        </nav>
      </header>
      <main>
        ${this._renderPage()}
      </main>
      <p class="joke">${this.joke}</p>
      <p class="app-footer">
        💒 Made with love by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://lars.amsterdam"
          >Lars Straathof</a
        >.
      </p>
    `;
  }

  _setLaneBeingDragEntered(id) {
    this.laneBeingDragEntered = id;
  }

  _setStoryBeingDragged(id) {
    this.storyBeingDragged = id;
  }

  _setOrderOfStoryBeingDragged(id) {
    this.orderOfStoryBeingDragged = id;
  }

  _saveStoryBeingDropped(lane) {
    if (this.storyBeingDragged && lane) {
      const indexOfDraggedStory = this.stories.findIndex(
        i => i.id === this.storyBeingDragged
      );
      let newStories = [...this.stories];
      newStories[indexOfDraggedStory].state = lane;
      
      const addStory = {...newStories[indexOfDraggedStory]};
      if(this.orderOfStoryBeingDragged !== undefined) {
        newStories.splice( indexOfDraggedStory, 1 );
        const indexOfTargetStory = newStories.findIndex(
          i => i.id === (this.orderOfStoryBeingDragged)
        );
        const reorderedItems = [
          ...newStories.slice(0, indexOfTargetStory),
          addStory,
          ...newStories.slice(indexOfTargetStory),
        ];
        newStories = reorderedItems;

      } else {
        newStories.splice( indexOfDraggedStory, 1 );
        newStories.push(addStory);
      }

      this.stories = newStories;
    }
  }

  _addStory(story, lane) {
    const newStories = [...this.stories];
    newStories.push({
      id: newStories.length + 1,
      title: story,
      assignedTo: undefined,
      state: lane,
      tags: []
    });
    this.stories = newStories;
  }

  _getJoke() {
    fetch("https://sv443.net/jokeapi/category/Programming?blacklistFlags=nsfw")
      .then(response => response.json())
      .then(json => {
        this.joke = json.joke || html`${json.setup} <br/> ${json.delivery}`;
        console.log(json);
      })
      .catch(err => console.warn(err));
  }

  _menuClick(e) {
    e.preventDefault();
    const page = e.target.getAttribute("name");
    this.page = page;
  }

  _renderPage() {
    const page = this.page;
    switch (page) {
      case "kanban":
        return html`
          <page-kanban
            .stories=${this.stories}
            .kanbanLanes=${this.kanbanLanes}
            .setLaneBeingDragEntered=${this._setLaneBeingDragEntered}
            .saveStoryBeingDropped=${this._saveStoryBeingDropped}
            .setStoryBeingDragged=${this._setStoryBeingDragged}
            .orderOfStoryBeingDragged=${this.orderOfStoryBeingDragged}
            .setOrderOfStoryBeingDragged=${this._setOrderOfStoryBeingDragged}
            .addStory=${this._addStory}
          ></page-kanban>
        `;

      case "backlog":
        return html`
          <page-backlog></page-backlog>
        `;

      default:
        return html`
          <div>
            <h2>404 - page not found</h2>
          </div>
        `;
    }
  }
}

customElements.define("qualogy-scrum", QualogyScrum);
