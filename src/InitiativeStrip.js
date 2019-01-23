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
            activeName: '',
        }
    }

    componentDidUpdate(prevProps) {
        if( this.props !== prevProps ) {
            this.sortCombatants();
        }
    }

    resetActive() {
        let activeIndex = this.state.sortedCombatants.findIndex(el => el === this.state.activeName);
        // no combat, no active
        if( !this.props.inCombat ) {
            this.setState({active: null, activeName: ''});
        }
        // no combatants, no active
        else if( this.state.sortedCombatants.length === 0 ) {
            this.setState({active: null, activeName: ''});
        }
        // if we don't have an active combatant, we should be starting at the beginning.
        // if we've rolled off the end of the combatant list, start over at the beginning.
        else if( this.state.active === null || this.state.active >= this.state.sortedCombatants.length ) {
            this.setState({active: 0, activeName: this.state.sortedCombatants[0]});
        }
        // active combatant is still in the list. force us to stay on that actor.
        // this prevents the index from getting messed up in the event that the change
        // to which we are responding includes adding an actor before the active player
        else if( activeIndex >= 0 ) {
            // we don't have to set activeName again
            this.setState({active: activeIndex});
        }
        else if( activeIndex === -1 ) {
            this.setState({activeName: this.state.sortedCombatants[this.state.active]});
        }
    }

    sortCombatants(activeName) {
        let combatants = Object.assign({}, this.props.characters, this.props.monsters, this.props.npcs),
            binnedCombatants = {},
            sortedCombatants = [];

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
        this.setState( {active: newActive, activeName: this.state.sortedCombatants[newActive]} );
    }

    resetCombat = () => {
        this.setState({active: null, activeName: ''});
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