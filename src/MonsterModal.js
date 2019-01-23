import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import './MonsterModal.css';
import $ from 'jquery';

class MonsterModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            monsterList: [],
            name: '',
            hp: '',
            ac: '',
            attackName: '',
            toHitMod: '',
            damageDice: '',
            damageMod: '',
            initModifier: '',
            quantity: '',
        };
    }

    componentDidMount() {
        this.getMonsterList();
    }

    sendMonsterInfo = () => {
        let info = {
            name: this.state.name,
            hp: parseInt(this.state.hp, 10),
            ac: parseInt(this.state.ac, 10),
            initModifier: parseInt(this.state.initModifier, 10),
            attacks: [
                {
                    name: this.state.attackName,
                    toHitModifier: parseInt(this.state.toHitMod, 10),
                    damageDice: this.state.damageDice,
                    damageModifier: parseInt(this.state.damageMod, 10),
                },
            ],
            quantity: this.state.quantity,
        }
        this.props.createMonsterCallback(info);
    }

    changeField = (e) => {
        this.setState( {[e.target.name]: e.target.value} )
    }

    getMonsterList = (e) => {
        $.get(
            'http://localhost:3001/getmonsters/',
            (data, status) => {
                console.log(data);
                this.setState({monsterList: data});
            }
        );
    }

    getMonsterStats = (name) => {
        $.get(
            `http://localhost:3001/getmonster/${name}`,
            (monster, status) => {
                console.log(monster);
                this.props.createMonsterCallback(monster);
            }
        );
    }

    populateFromSelection = (e) => {
        let selectedMonsterName = e.params.data.text;
        console.log(selectedMonsterName);
        this.getMonsterStats(selectedMonsterName);
    }

    render() {
        return(
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.sendMonsterInfo} className="newMonsterModal">
                <ModalHeader toggle={this.sendMonsterInfo}>Create new monster</ModalHeader>
                <ModalBody>
                    <Select2 data={this.state.monsterList} onOpen={this.getMonsterList} onSelect={this.populateFromSelection} options={ {placeholder: 'clickit'} } /><br />
                    Name: <input type="text" name="name" value={this.state.name} onChange={this.changeField} /><br />
                    HP: <input type="text" name="hp" value={this.state.hp} onChange={this.changeField} /><br />
                    AC: <input type="text" name="ac" value={this.state.ac} onChange={this.changeField} /><br />
                    Init modifier: <input type="text" name="initModifier" value={this.state.initModifier} onChange={this.changeField} /><br />
                    Attack: <input type="text" name="attackName" value={this.state.attackName} size={12} placeholder="name" onChange={this.changeField} />
                            <input type="text" name="toHitMod" value={this.state.toHitMod} size={6} placeholder="hit mod" onChange={this.changeField} />
                            <input type="text" name="damageDice" value={this.state.damageDice} size={12} placeholder="dmg dice" onChange={this.changeField} />
                            <input type="text" name="damageMod" value={this.state.damageMod} size={6} placeholder="dmg mod" onChange={this.changeField} /><br />
                    Quantity: <input type="text" name="quantity" value={this.state.quantity} size={4} onChange={this.changeField} /><br />
                </ModalBody>
                <ModalFooter>
                    <button onClick={this.sendMonsterInfo}>Create monster</button>{' '}
                </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default MonsterModal;