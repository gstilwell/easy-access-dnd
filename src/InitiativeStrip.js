import React, { Component } from 'react';
import Strip from './Strip.js';
import Dice from './Dice.js';
import './InitiativeStrip.css';

class InitiativeStrip extends Component {
    constructor(props) {
        super(props);

        this.dice = new Dice();

        this.state = {
            sortedCombatants: [],
        }
    }

    //TODO move this to a generic utility place
    statScoreToModifier(score) {
        return Math.floor((score-10) / 2);
    }

    doRolls() {
        let combatants = {};

        // roll initiative for each combatant.
        // the initiatives are stored in a dict by initiative number.
        // this is because they need to be sorted, and that will be much easier with an array of keys
        // than with an array of dict elements
        for( let combatant in this.props.combatants ) {
            let thisCombatant = this.props.combatants[combatant],
                initRoll = this.dice.roll("1d20") + (this.statScoreToModifier(thisCombatant.dex));

            if( !(initRoll in combatants) ) {
                combatants[initRoll] = {};
            }
            combatants[initRoll][combatant] = thisCombatant;
        }

        return combatants;
    }

    //TODO make a linked list (?) that keeps players sorted by their roll/dex
    rollInitiative = () => {
        let combatants = this.doRolls();

        let sortedCombatants = [];
        for( let initiative in combatants ) {
            for( let combatant in combatants[initiative] ) {
                sortedCombatants.push(combatant);
                console.log(initiative, combatant);
            }
        }

        this.setState( {sortedCombatants: sortedCombatants} );
    }

    advance = () => {

    }

    render() {
        return (
            <div>
                <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
                <button onClick={this.rollInitiative}>Roll initiative</button>
                <Strip elements={this.state.sortedCombatants} />
                <button onClick={this.advance}>Next</button>
            </div>
        );
    }
}

export default InitiativeStrip;