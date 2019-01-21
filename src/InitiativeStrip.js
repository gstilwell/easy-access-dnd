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
            active: null,
        }
    }

    componentDidUpdate(prevProps) {
        console.log("cougars", prevProps);
    }

    doRolls() {
        let combatants = {},
            combatantsIn = Object.assign({}, this.props.monsters, this.props.characters);

        // roll initiative for each combatant.
        // the initiatives are stored in a dict by initiative number.
        // this is because they need to be sorted, and that will be much easier with an array of keys
        // than with an array of dict elements
        for( let combatant in combatantsIn ) {
            let thisCombatant = combatantsIn[combatant],
                initRoll = this.dice.roll("1d20") + thisCombatant.initModifier;

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
            }
        }

        this.setState( {sortedCombatants: sortedCombatants, active: 0} );
    }

    advance = () => {
        let newActive = (this.state.active + 1) % this.state.sortedCombatants.length;
        this.setState( {active: newActive} );
    }

    render() {
        return (
            // TODO there probably shouldn't be a hard coded ID in here, but I need something
            //      to add an eventlistener to
            <div id="initstrip">
                <button onClick={this.rollInitiative}>Roll initiative</button>
                <Strip elements={this.state.sortedCombatants} activeIndex={this.state.active} />
                <button onClick={this.advance}>Next</button>
            </div>
        );
    }
}

export default InitiativeStrip;