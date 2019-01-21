import React, { Component } from 'react';
import { CharacterBlock, MonsterBlock } from './Block.js';
import { SlidingMenu } from './SlidingMenu.js';
import './App.css';
import MonsterModal from './MonsterModal.js';
import InitiativeStrip from './InitiativeStrip.js';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMonsterModalOpen: false,
      characters : {
        "Usor": { playername: "Nic", passivePerception: 12, hp: 36, hpMax: 36, ac: 10, initModifier: 0 },
        "Gunn": { playername: "Drew", passivePerception: 13, hp: 48, hpMax: 48, ac: 15, initModifier: 1 },
        "Smog": { playername: "Mark", passivePerception: 11, hp: 47, hpMax: 47, ac: 12, initModifier: 2 },
        "Darvin": { playername: "Mike", passivePerception: 15, hp: 38, hpMax: 38, ac: 18, initModifier: 1 },
        "Kellen": { playername: "Chris", passivePerception: 13, hp: 33, hpMax: 33, ac: 14, initModifier: 3 },
        "Taklinn": { playername: "Sherry", passivePerception: 13, hp: 44, hpMax: 44, ac: 14, initModifier: 3 },
        "Dra'ak": { playername: "Shelly", passivePerception: 15, hp: 44, hpMax: 44, ac: 17, initModifier: 5 },
      },
      monsters : {
        "Strahd": { name: "Strahd", hp: 144, ac: 16, initModifier: 2,
          attacks: [
            { name: 'unarmed strike', toHitModifier: 9, damageDice: "3d6", damageModifier: 4 },
            { name: 'Bite', toHitModifier: 9, damageDice: "3d6", damageModifier: 4 },
            { name: 'Charm (wis 17)', toHitModifier: 17, damageDice: "1d0", damageModifier: 0 },
          ]},
        "VampSpawn1": { name: "VampSpawn1", hp: 82, ac: 15, initModifier: 2,
          attacks: [
            { name: 'claws', toHitModifier: 6, damageDice: "2d4", damageModifier: 3 },
            { name: 'Bite', toHitModifier: 6, damageDice: "3d6", damageModifier: 3 },
          ]},
        "VampSpawn2": { name: "VampSpawn2", hp: 82, ac: 15, initModifier: 2,
          attacks: [
            { name: 'claws', toHitModifier: 6, damageDice: "2d4", damageModifier: 3 },
            { name: 'Bite', toHitModifier: 6, damageDice: "3d6", damageModifier: 3 },
          ]},
        "VampSpawn3": { name: "VampSpawn3", hp: 82, ac: 15, initModifier: 2,
          attacks: [
            { name: 'claws', toHitModifier: 6, damageDice: "2d4", damageModifier: 3 },
            { name: 'Bite', toHitModifier: 6, damageDice: "3d6", damageModifier: 3 },
          ]},
        "VampSpawn4": { name: "VampSpawn4", hp: 82, ac: 15, initModifier: 2,
          attacks: [
            { name: 'claws', toHitModifier: 6, damageDice: "2d4", damageModifier: 3 },
            { name: 'Bite', toHitModifier: 6, damageDice: "3d6", damageModifier: 3 },
          ]},
        //"BlackSkel": { name: "BlackSkel", hp: 71, ac: 17, initModifier: 2,
        //  attacks: [
        //    { name: 'Claw', toHitModifier: 6, damageDice: "1d8", damageModifier: 4 },
        //    { name: 'Shortsword', toHitModifier: 8, damageDice: "2d6", damageModifier: 4},
        //  ]},
        //"Skeleton": { name: "Skeleton", hp: 13, ac: 13, initModifier: 2,
        //  attacks: [
        //    { name: 'Shortsword', toHitModifier: 4, damageDice: "1d6", damageModifier: 2},
        //    { name: 'Shortbow', toHitModifier: 4, damageDice: "1d6", damageModifier: 2 },
        //  ]},
        //"Undead Ooze": { name: "Undead Ooze", hp: 67, ac: 5, initModifier: 2,
        //  attacks: [
        //    { name: 'Pseudopod 10ft', toHitModifier: 4, damageDice: "3d8", damageModifier: 1 },
        //  ]},
      },
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
    document.getElementById('App').addEventListener('killBlock', this.removeBlock, true);
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

  removeBlock = (e) => {
    let dudes = Object.assign({}, this.state[e.detail.type]);
    delete dudes[e.detail.name];
    this.setState( {[e.detail.type]: dudes} );
  }

  handleOption1 = () => {
    console.log("1");
  }

  handleNewMonster = () => {
    this.setState( {newMonsterModalOpen: true} );
  }

  createNewMonster = (newMonster) => {
    let monsters = Object.assign({}, this.state.monsters);
    if( newMonster.quantity ) {
      for( let i = 1; i <= newMonster.quantity; i += 1 ) {
        let thisMonster = Object.assign({}, newMonster);
        thisMonster.name = newMonster.name + i;
        monsters[thisMonster.name] = thisMonster;
      }
    }
    else {
      monsters[newMonster.name] = newMonster;
    }

    $.post(
      'http://localhost:3001/createmonster/',
      newMonster,
      (data, status) => {
        console.log("post reply", data, status);
      }
    );

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
          { this.monsterTags() }
          { this.characterTags() }
          <InitiativeStrip monsters={this.state.monsters} characters={this.state.characters} />
        </div>

        <MonsterModal isOpen={this.state.newMonsterModalOpen} createMonsterCallback={this.createNewMonster} />

      </div>
    );
  }
}

export default App;
