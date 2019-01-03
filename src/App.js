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
      characters : {
        "Usor": { playername: "Nic", passivePerception: 1, hp: 2, ac: 3 },
        "Gun": { playername: "Drew", passivePerception: 1, hp: 2, ac: 3 },
        "Smog": { playername: "Mark", passivePerception: 1, hp: 2, ac: 3 },
        "Darvin": { playername: "Mike", passivePerception: 1, hp: 2, ac: 3 },
        "Kellen": { playername: "Chris", passivePerception: 1, hp: 2, ac: 3 },
        "Taklinn": { playername: "Sherry", passivePerception: 1, hp: 2, ac: 3 },
        "Draak": { playername: "Shelly", passivePerception: 1, hp: 2, ac: 3 },
      },
      //monsters: [],
      monsters : [
      //  { name: "VampireSpawn1" },
      //  { name: "VampireSpawn2" },
      //  { name: "VampireSpawn3" },
      //  { name: "VampireSpawn4" },
      //  { name: "Strahd" },
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

  componentDidMount() {
    document.getElementById('App').addEventListener('adjustValue', this.adjustValue, true);
  }

  // category is 'character' or 'monster'
  // name is character/monster name
  // type is type of the stat (hp, ac, etc)
  // value is the new value
  updateStat = (category, name, type, value) => {
  }

  adjustValue = (e) => {
    console.log(e);
    let details = e.detail;
    console.log(details);
    let beings = Object.assign({}, this.state[details.category]);
    
    beings[details.name][details.type] = beings[details.name][details.type] + details.change;
    this.setState( {[details.category]: beings} );
  }


  handleOption1 = () => {
    console.log("1");
  }

  handleNewMonster = () => {
    this.setState( {newMonsterModalOpen: true} );
  }

  createNewMonster = (newMonster) => {
    let monsters = Object.assign({}, this.state.monsters);
    monsters[newMonster.name] = newMonster;
    console.log(newMonster, monsters);
    this.setState( {newMonsterModalOpen: false, monsters: monsters} );
  }

  handleOption3 = () => {
    console.log("3");
  }

  characterTags() {
    let characters = [];

    for( let name in this.state.characters ) {
      let char = this.state.characters[name];
      characters.push( <CharacterBlock key={name} name={name} playername={char.playername}
                          passivePerception={char.passivePerception} hp={char.hp} ac={char.ac}
                          update={this.updateStat} /> );
    }

    return characters;
  }

  monsterTags() {
    let monsters = [];

    for( let index in this.state.monsters ) {
      let monster = this.state.monsters[index];
      monsters.push( <MonsterBlock key={index} name={monster.name} playername={monster.playername}
                        hp={monster.hp} ac={monster.ac} attacks={monster.attacks}
                        update={this.updateStat} /> );
    }

    return monsters;
  }

  render() {

    return (
      <div id="App">

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
