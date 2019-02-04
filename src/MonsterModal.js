import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, Text, Scope } from 'informed';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import './MonsterModal.css';
import $ from 'jquery';

class MonsterModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            monsterList: [],
            name: '',
            type: '',
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

    getFormApi = (api) => {
        this.formApi = api;
    }

    sendMonsterInfo = () => {
        let form = this.formApi.getState(),
            info = {
                name: form.values.pcName,
                type: form.values.type,
                hp: parseInt(form.values.hp, 10),
                ac: parseInt(form.values.ac, 10),
                initModifier: parseInt(form.values.initModifier, 10),
                attacks: form.values.attacks,
                quantity: form.values.quantity,
            };
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

    getMonsterStats = (type) => {
        $.get(
            `http://localhost:3001/getmonster/${type}`,
            (monster, status) => {
                console.log(monster);
                this.props.createMonsterCallback(monster);
            }
        );
    }

    populateFromSelection = (e) => {
        let selectedMonsterType = e.params.data.text;
        console.log(selectedMonsterType);
        this.getMonsterStats(selectedMonsterType);
    }

    render() {
        const closeButton = <button className="close" onClick={this.props.closeModal}>&times;</button>;
        return(
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.sendMonsterInfo} className="newMonsterModal">
            <Form id="create-monster" getApi={this.getFormApi}>
                <ModalHeader toggle={this.sendMonsterInfo} close={closeButton}>Create new monster</ModalHeader>
                <ModalBody>
                        <Select2 data={this.state.monsterList} onOpen={this.getMonsterList} onSelect={this.populateFromSelection} options={ {placeholder: 'clickit'} } /><br />
                        Name: <Text field="pcName" id="pcName" placeholder="optional" /><br />
                        Type: <Text field="type" id="type" /><br />
                        HP: <Text field="hp" id="hp" /><br />
                        AC: <Text field="ac" id="ac" /><br />
                        Init modifier: <Text field="initModifier" id="initModifier" /><br />
                        <Scope scope="attacks[0]">
                            Attack: <Text field="name" id="name-0" size={12} placeholder="name" />
                                    <Text field="toHitModifier" id="toHitMod-0" size={6} placeholder="hit mod" />
                                    <Text field="damageDice" id="damageDice-0" size={12} placeholder="dmg dice" />
                                    <Text field="damageModifier" id="damageMod-0" size={6} placeholder="dmg mod" /><br />
                        </Scope>
                       Quantity: <Text field="quantity" id="quantity" size={4} /><br />
                </ModalBody>
                <ModalFooter>
                    <button onClick={this.sendMonsterInfo}>Create monster</button>{' '}
                </ModalFooter>
            </Form>
                </Modal>
            </div>
        );
    }
}

export default MonsterModal;