import React, { Component } from 'react';
import { CharacterBlock, MonsterBlock } from './Block.js';
import { SlidingMenu } from './SlidingMenu.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options : [
        {
          display: "Option 1",
          displayType: "text",
          target: this.handleOption1
        },
        {
          display: "Option 2",
          displayType: "text",
          target: this.handleOption2,
        },
        {
          display: "Option 3",
          displayType: "text",
          target: this.handleOption3
        },
      ]
    }
  
    this.handleOption1 = this.handleOption1.bind(this);
    this.handleOption2 = this.handleOption2.bind(this);
    this.handleOption3 = this.handleOption3.bind(this);
  }

  handleOption1() {
    console.log("1");
  }

  handleOption2() {
    console.log("2");
  }

  handleOption3() {
    console.log("3");
  }

  render() {
    return (
      <div>
        <SlidingMenu
          options={this.state.options}
        />
        <div id='mainapp' className="App">
          <CharacterBlock name="Gun" playername="Drew" />
          <CharacterBlock name="Smog" playername="Mark" />
          <CharacterBlock name="Darvin" playername="Mike" />
          <CharacterBlock name="Kellen" playername="Chris" />
          <CharacterBlock name="Usor" playername="Nic" />
          <CharacterBlock name="Taklinn" playername="Sherry" />
          <CharacterBlock name="Draak" playername="Shelly" />
          <MonsterBlock name="VampSpawn1" />
          <MonsterBlock name="VampSpawn2" />
          <MonsterBlock name="VampSpawn3" />
          <MonsterBlock name="VampSpawn4" />
          <MonsterBlock name="Strahd" />
        </div>
      </div>
    );
  }
}

export default App;
