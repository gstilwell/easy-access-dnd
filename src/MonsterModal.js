import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class MonsterModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    toggleNewMonsterModal = () => {
        this.setState( {newMonsterModalOpen: !this.state.newMonsterModalOpen} );
    }

    sendMonsterInfo = () => {
        this.props.createMonsterCallback(12);
    }

    render() {
        return(
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.sendMonsterInfo} className="newMonsterModal">
                <ModalHeader toggle={this.sendMonsterInfo}>Create new monster</ModalHeader>
                <ModalBody>
                </ModalBody>
                <ModalFooter>
                    <button onClick={this.sendMonsterInfo}>Do Something</button>{' '}
                </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default MonsterModal;