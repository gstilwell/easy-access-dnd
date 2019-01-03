import React, { Component } from 'react';
import { CharacterBlock, MonsterBlock } from './Block.js';
import { SlidingMenu } from './SlidingMenu.js';
import './App.css';
import MonsterModal from './MonsterModal.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMonsterModalOpen: false,
      characters : [
        { name: "Usor", playername: "Nic" },
        { name: "Gun", playername: "Drew" },
        { name: "Smog", playername: "Mark" },
        { name: "Darvin", playername: "Mike" },
        { name: "Kellen", playername: "Chris" },
        { name: "Taklinn", playername: "Sherry" },
        { name: "Draak", playername: "Shelly" },
      ],
      monsters : [
        { name: "VampireSpawn1" },
        { name: "VampireSpawn2" },
        { name: "VampireSpawn3" },
        { name: "VampireSpawn4" },
        { name: "Strahd" },
      ],
      options : [
        {
          display: "New character",
          displayType: "text",
          onClick: this.handleOption1
        },
        {
          display: "New monster",
          displayType: "text",
          onClick: this.handleNewMonster,
        },
        {
          display: "New NPC",
          displayType: "text",
          onClick: this.handleOption3
        },
      ]
    }
  }

  handleOption1 = () => {
    console.log("1");
  }

  handleNewMonster = () => {
    this.setState( {newMonsterModalOpen: true} );
  }

  createNewMonster = (monsterInfo) => {
    console.log(monsterInfo);
    this.setState( {newMonsterModalOpen: false} );
  }

  handleOption3 = () => {
    console.log("3");
  }

  characterTags() {
    let characters = [];

    for( let index in this.state.characters ) {
      let char = this.state.characters[index];
      characters.push( <CharacterBlock key={index} name={char.name} playername={char.playername} /> );
    }

    return characters;
  }

  monsterTags() {
    let monsters = [];

    for( let index in this.state.monsters ) {
      let monster = this.state.monsters[index];
      monsters.push( <MonsterBlock key={index} name={monster.name} playername={monster.playername} /> );
    }

    return monsters;
  }

  render() {

    return (
      <div>

        <SlidingMenu
          options={this.state.options}
        />
        <div id='mainapp' className="App">
          { this.characterTags() }
          { this.monsterTags() }
        </div>

        <MonsterModal isOpen={this.state.newMonsterModalOpen} createMonsterCallback={this.createNewMonster} />
      </div>
    );
  }
}

export default App;
