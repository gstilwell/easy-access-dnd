import React, { Component } from 'react';
import Dice from './Dice.js';
import './Attack.css';

class Attack extends Component {
    constructor(props) {
        super(props);

        this.dice = new Dice();

        this.state = {
            ac : '-',
            damage : '-'
        }
    }

    doAttack = (e) => {
        let hitRoll = this.dice.roll("1d20"),
            toHit = hitRoll + this.props.toHitModifier,
            isCrit = hitRoll === 20 ? true : false,
            damageDice = isCrit ? [this.props.damageDice, this.props.damageDice] : [this.props.damageDice],
            damageRoll = this.dice.roll(...damageDice),
            totalDamage = damageRoll + this.props.damageModifier;

        console.log(this.props);

        this.setState( 
            {
                ac : toHit,
                crit : isCrit,
                damage : totalDamage,
            });
    }

    render() {
        let icon = null;
        
        if( this.props.attackIcon ) {
            icon = <img className="attackIcon" src={ this.props.attackIcon } alt='' />
        }

        return (
            <span>
                <button className="attackButton" onClick={ this.doAttack } >
                { icon }
                { this.props.name }
                </button>
                {' '}
                <img className="toHitIcon" src={ this.props.toHitIcon } alt='' />
                { this.state.crit ? "!!!" : this.state.ac }
                /
                { this.state.damage }
                <img className="damageIcon" src={ this.props.damageIcon } alt='' />
            </span>
        );
    }
}

export default Attack;