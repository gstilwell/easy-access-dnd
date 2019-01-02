import React, { Component } from 'react';
import { CharacterBlock, MonsterBlock } from './Block.js';
import { SlidingMenu } from './SlidingMenu.js';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './App.css';

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

  toggleNewMonsterModal = () => {
    this.setState( {newMonsterModalOpen: !this.state.newMonsterModalOpen} );
  }

  handleOption1 = () => {
    console.log("1");
  }

  handleNewMonster = () => {
    this.toggleNewMonsterModal();
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

        <div>
          <Modal isOpen={this.state.newMonsterModalOpen} toggle={this.toggleNewMonsterModal} className="newMonsterModal">
            <ModalHeader toggle={this.toggleNewMonsterModal}>Modal title</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <button onClick={this.toggleNewMonsterModal}>Do Something</button>{' '}
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default App;
