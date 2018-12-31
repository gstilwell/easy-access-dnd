import React, { Component } from 'react';
import { CharacterBlock, MonsterBlock } from './Block.js';
import './App.css';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
