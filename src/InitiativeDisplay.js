import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import $ from 'jquery';
import './InitiativeDisplay.css';

class InitiativeDisplay extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            order: [],
            next: null,
        };

        const sock = openSocket('http://localhost:3003');
        sock.on('updated initiative', (data) => {
            console.log('received initiative update', data);
            this.setState({order: data.order, next: data.next});
        })
    }

    componentDidMount() {
        this.getInitiative();
    }

    getInitiative = () => {
        $.get(
            'http://localhost:3001/getInitiative/' + this.props.gameid,
            (data, status) => {
                this.setState({order: data.initiative.order, next: data.initiative.next});
            }
        );
    }
    
    render() {
        let spans = [],
            active;
        for( let combatant in this.state.order ) {
            active = this.state.order[combatant] === this.state.next ? 'active' : '';
            spans.push(
                <span className={"combatant " + active} key={combatant}>{this.state.order[combatant]}</span>
            );
        }
        return (
            <div>
                {spans}
            </div>
        );
    }
}

export default InitiativeDisplay;