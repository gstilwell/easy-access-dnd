import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class MonsterModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            name: '',
            hp: '',
            ac: '',
            attackName: '',
            toHitMod: '',
            damageDice: '',
            damageMod: '',
        };
    }

    sendMonsterInfo = () => {
        let info = {
            name: this.state.name,
            hp: parseInt(this.state.hp, 10),
            ac: parseInt(this.state.ac, 10),
            attacks: [
                {
                    name: this.state.attackName,
                    toHitModifier: parseInt(this.state.toHitMod, 10),
                    damageDice: this.state.damageDice,
                    damageModifier: parseInt(this.state.damageMod, 10),
                },
            ],
        }
        this.props.createMonsterCallback(info);
    }

    changeField = (e) => {
        this.setState( {[e.target.name]: e.target.value} )
    }

    render() {
        return(
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.sendMonsterInfo} className="newMonsterModal">
                <ModalHeader toggle={this.sendMonsterInfo}>Create new monster</ModalHeader>
                <ModalBody>
                    Name: <input type="text" name="name" value={this.state.name} onChange={this.changeField} /><br />
                    HP: <input type="text" name="hp" value={this.state.hp} onChange={this.changeField} /><br />
                    AC: <input type="text" name="ac" value={this.state.ac} onChange={this.changeField} /><br />
                    Attack: <input type="text" name="attackName" value={this.state.attackName} placeholder="name" onChange={this.changeField} />
                            <input type="text" name="toHitMod" value={this.state.toHidMod} placeholder="to hit mod" onChange={this.changeField} />
                            <input type="text" name="damageDice" value={this.state.damageDice} placeholder="damage dice" onChange={this.changeField} />
                            <input type="text" name="damageMod" value={this.state.damageMod} placeholder="damage mod" onChange={this.changeField} />
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