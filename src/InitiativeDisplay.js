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

        const sock = openSocket('http://192.168.1.64:3003');
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
            'http://192.168.1.64:3001/getInitiative/' + this.props.gameid,
            (data, status) => {
                this.setState({order: data.initiative.order, next: data.initiative.next});
            }
        );
    }
    
    render() {
        if( !this.state.next ) {
            return null;
        }

        let spans = [],
            active,
            numSegments = 4,
            segmentLength = Math.ceil(this.state.order.length / numSegments);
            
        for( let combatant in this.state.order ) {
            active = this.state.order[combatant] === this.state.next ? 'active' : '';
            
            // add in a break to make it fit better on the screen. this needs to be done more intelligently
            if( (Number(combatant) % segmentLength) === 0 ) {
                spans.push(<br key={Number(combatant) + 10000} />);
                spans.push(<br key={Number(combatant) + 20000} />);
            }
            
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