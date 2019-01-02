import React, { Component } from 'react';
import DraggableBit from './Bit.js';
import AdjustableValue from './AdjustableValue.js';
import Attack from './Attack.js';
import './Block.css';

import SingleArrow from './img/singlearrow.png';
import DoubleArrow from './img/doublearrow.png';
import eye from './img/eye.png';
import shield from './img/shield.png';
import blood from './img/blood.png';

class Block extends Component {
    constructor(props) {
        super(props);
        this.state = this.getStats();

        this.startDrag = this.startDrag.bind(this);
        this.drag = this.drag.bind(this);
        this.stopDrag = this.stopDrag.bind(this);

    }
    
    componentDidMount() {
        this.element().addEventListener('adjustValue', this.adjustValue, true);
    }
    
    element() {
        let element = document.getElementById(this.blockId());
        return element;
    }

    getStats() {
        if( this.props.name === 'Gun' ) {
            return {
                passivePerception: 12,
                ac: 15,
                hp: 33,
            }
        }
        else if( this.props.name === 'Smog' ) {
            return {
                passivePerception: 12,
                ac: 15,
                hp: 33,
            }
        }
        else if( this.props.name === 'Darvin' ) {
            return {
                passivePerception: 12,
                ac: 15,
                hp: 33,
            }
        }
        else if( this.props.name === 'Kellen' ) {
            return {
                passivePerception: 12,
                ac: 15,
                hp: 33,
            }
        }
        else if( this.props.name === 'Taklinn' ) {
            return {
                passivePerception: 12,
                ac: 15,
                hp: 33,
            }
        }
        else if( this.props.name === 'Draak' ) {
            return {
                passivePerception: 12,
                ac: 15,
                hp: 33,
            }
        }
        else if( this.props.name === 'Usor' ) {
            return {
                passivePerception: 12,
                ac: 15,
                hp: 33,
            }
        }
        else if( this.props.name.includes('VampireSpawn') ) {
            return {
                ac: 15,
                hp: 82,
                attacks: [
                    {
                        name: "bite",
                        toHitModifier: 6,
                        damageDice: "3d6",
                        damageModifier: 3,
                        attackIcon: blood,
                        toHitIcon: shield,
                        damageIcon: blood
                    },
                    {
                        name: "claws",
                        toHitModifier: 6,
                        damageDice: "2d4",
                        damageModifier: 3,
                        attackIcon: blood,
                        toHitIcon: shield,
                        damageIcon: blood
                    },
                ]
            }
        }
        else if( this.props.name.includes('Strahd') ) {
            return {
                ac: 23,
                hp: 999,
                attacks: [
                    {
                        name: "slice",
                        toHitModifier: 5,
                        damageDice: "3d6",
                        damageModifier: 3,
                        attackIcon: blood,
                        toHitIcon: shield,
                        damageIcon: blood
                    },
                    {
                        name: "dice",
                        toHitModifier: 2,
                        damageDice: "1d4",
                        damageModifier: 1,
                        attackIcon: blood,
                        toHitIcon: shield,
                        damageIcon: blood
                    },
                ]
            }
        }
        else {
            return {
                passivePerception: 0,
                ac: 0,
                hp: 0,
            }
        }
    }

    placeElement(x,y) {
        this.element().style.left = (x - this.state.dragOffset.x) + 'px';
        this.element().style.top = (y - this.state.dragOffset.y) + 'px';
    }

    startDrag(e) {
        let rect = this.element().getBoundingClientRect(),
            dragStart = { x: rect.left, y: rect.top },
            dragOffset = { x: e.clientX - dragStart.x, y: e.clientY - dragStart.y };
            
        this.setState( { dragOffset: dragOffset } );
        //setTimeout( () => this.element().style.visibility = "hidden", 1 );
    }

    drag(e) {
        e.preventDefault();

        // the last drag will set this to 0,0
        // https://stackoverflow.com/questions/36308460/why-is-clientx-reset-to-0-on-last-drag-event
        // claims that preventing default on dragover will prevent this, but I didn't see that.
        // to prevent that last 0, 0 from sticking us in the corner, I simply ignore moves at 0,0.
        // if this becomes an issue with docking things to the corner, I will have to refigger this
        if( e.clientX !== 0 && e.clientY !== 0 ) {
            this.placeElement( e.clientX, e.clientY );
        }
    }

    stopDrag(e) {
        e.preventDefault();
        //this.placeElement( e.clientX, e.clientY );
        //setTimeout( () => this.element().style.visibility = "visible", 1 );
    }

    adjustValue = (e) => {
        if( e.detail.name === this.props.name ) {
            this.setState( { [e.detail.type]: this.state[e.detail.type] + e.detail.change } );
        }
    }

    // This render should never be called. This is only meant to be a base class
    render() {
        return;
    }
};

class MonsterBlock extends Block {
    blockId() {
        let id = "monsterBlock" + this.props.name;
        return id;
    }

    attacks() {
        let attacks = this.state.attacks;
        let tags = [];

        for( let attack in attacks ) {
            let attackInfo = attacks[attack];
            tags.push(
                <Attack
                    key={attack}
                    name={attackInfo.name}
                    toHitModifier={attackInfo.toHitModifier}
                    damageDice={attackInfo.damageDice}
                    damageModifier={attackInfo.damageModifier}
                    attackIcon={attackInfo.attackIcon}
                    toHitIcon={attackInfo.toHitIcon}
                    damageIcon={attackInfo.damageIcon}
                    />
            );
            tags.push(<br key={attack + 'br'} />);
        }
        return tags;
    }

    render() {
        return (
            <div id={this.blockId()} className="block monster">
                    <DraggableBit
                        text={this.props.name}
                        handleDragStart={this.startDrag}
                        handleDragStop={this.stopDrag}
                        handleDrag={this.drag}
                        type="monsterName" />
                    <AdjustableValue
                        blockname={this.props.name}
                        value={this.state.ac}
                        singlearrow={SingleArrow}
                        doublearrow={DoubleArrow}
                        icon={shield}
                        type="ac" />
                    <AdjustableValue
                        blockname={this.props.name}
                        value={this.state.hp}
                        singlearrow={SingleArrow}
                        doublearrow={DoubleArrow}
                        icon={blood}
                        type="hp" />
                    { this.attacks() }
            </div>
        );
    }
}

class CharacterBlock extends Block {
    blockId() {
        let id = "characterBlock" + this.props.name;
        return id;
    }

    render() {
        return (
            <div id={this.blockId()} className="block character">
                    <DraggableBit
                        text={this.props.name}
                        playername={this.props.playername}
                        handleDragStart={this.startDrag}
                        handleDragStop={this.stopDrag}
                        handleDrag={this.drag}
                        type="characterName" />
                    <AdjustableValue
                        blockname={this.props.name}
                        value={this.state.passivePerception}
                        singlearrow={SingleArrow}
                        doublearrow={DoubleArrow}
                        icon={eye}
                        type="passivePerception" />
                    <AdjustableValue
                        blockname={this.props.name}
                        value={this.state.ac}
                        singlearrow={SingleArrow}
                        doublearrow={DoubleArrow}
                        icon={shield}
                        type="ac" />
                    <AdjustableValue
                        blockname={this.props.name}
                        value={this.state.hp}
                        singlearrow={SingleArrow}
                        doublearrow={DoubleArrow}
                        icon={blood}
                        type="hp" />
            </div>
        );
    }
}

export { CharacterBlock, MonsterBlock };