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
        if( this.props !== prevProps ) {
            this.sortCombatants();
        }
    }

    resetActive() {
        // if we don't have an active combatant, we should be starting at the beginning.
        // if we've rolled off the end of the combatant list, start over at the beginning.
        console.log(this.state.active, this.state.sortedCombatants, this.state.sortedCombatants.length);
        if( this.state.active === null || this.state.active >= this.state.sortedCombatants.length ) {
            this.setState({active: 0});
        }
    }

    sortCombatants() {
        let combatants = Object.assign({}, this.props.characters, this.props.monsters, this.props.npcs),
            binnedCombatants = {},
            sortedCombatants = [];

            console.log(combatants);
        
        // per combatant, bin them according to init roll.
        // each bin will be indexed by the roll value,
        // and multiple combatants in a bin will be pushed into an array for sorting later
        for( let combatant in combatants ) {
            let thisCombatant = combatants[combatant];
            if( !(thisCombatant.initRoll in binnedCombatants) ) {
                binnedCombatants[thisCombatant.initRoll] = [];
            }
            binnedCombatants[thisCombatant.initRoll].push(thisCombatant);
        }

        // now that we're binned, sort combatants into list of names
        for( let initRoll in binnedCombatants ) {
            // TODO break ties in bins in reverse dexterity order
            binnedCombatants[initRoll].forEach(el => {
                sortedCombatants.push(el.name);
            });
        }

        // reverse the list, since we are in reverse initiative order right now
        sortedCombatants.reverse();

        // after the state has settled down, reset the active combatant
        this.setState({sortedCombatants: sortedCombatants}, this.resetActive);
    }

    advance = () => {
        let newActive = (this.state.active + 1) % this.state.sortedCombatants.length;
        this.setState( {active: newActive} );
    }

    resetCombat = () => {
        this.setState({active: null});
        this.props.endCombat();
    }

    render() {
        let strip, startstop;

        if( this.props.inCombat ) {
            startstop = <button onClick={this.resetCombat}>Exit combat</button>;
            strip = <span>
                        <Strip elements={this.state.sortedCombatants} activeIndex={this.state.active} />
                        <button onClick={this.advance}>Next</button>
                    </span>;
        }
        else {
            startstop = <button onClick={this.props.rollInitiative}>Roll initiative</button>;
        }

        return (
            // TODO there probably shouldn't be a hard coded ID in here, but I need something
            //      to add an eventlistener to
            <div id="initstrip">
                {startstop}
                {strip}
            </div>
        );
    }
}

export default InitiativeStrip;