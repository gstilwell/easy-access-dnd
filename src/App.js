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
