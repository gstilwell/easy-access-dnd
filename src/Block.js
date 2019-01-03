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
        this.state = {};

        this.startDrag = this.startDrag.bind(this);
        this.drag = this.drag.bind(this);
        this.stopDrag = this.stopDrag.bind(this);

    }
    
    componentDidMount() {
        //this.element().addEventListener('adjustValue', this.adjustValue, true);
    }
    
    element() {
        let element = document.getElementById(this.blockId());
        return element;
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
        let attacks = this.props.attacks;
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
                    attackIcon={blood}
                    toHitIcon={shield}
                    damageIcon={blood}
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
                        category="monsters"
                        value={this.props.ac}
                        singlearrow={SingleArrow}
                        doublearrow={DoubleArrow}
                        icon={shield}
                        type="ac"
                        update={this.props.update} />
                    <AdjustableValue
                        blockname={this.props.name}
                        category="monsters"
                        value={this.props.hp}
                        singlearrow={SingleArrow}
                        doublearrow={DoubleArrow}
                        icon={blood}
                        type="hp"
                        update={this.props.update} />
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
                        category="characters"
                        value={this.props.passivePerception}
                        singlearrow={SingleArrow}
                        doublearrow={DoubleArrow}
                        icon={eye}
                        type="passivePerception"
                        update={this.props.update} />
                    <AdjustableValue
                        blockname={this.props.name}
                        category="characters"
                        value={this.props.ac}
                        singlearrow={SingleArrow}
                        doublearrow={DoubleArrow}
                        icon={shield}
                        type="ac"
                        update={this.props.update} />
                    <AdjustableValue
                        blockname={this.props.name}
                        category="characters"
                        value={this.props.hp}
                        singlearrow={SingleArrow}
                        doublearrow={DoubleArrow}
                        icon={blood}
                        type="hp"
                        update={this.props.update} />
            </div>
        );
    }
}

export { CharacterBlock, MonsterBlock };