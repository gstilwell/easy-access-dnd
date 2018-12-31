import React, { Component } from 'react';
import './Bit.css';

class Bit extends Component {
    bitId() {
        return "bit" + this.props.text;
    }

    render() {
        var playername;
        if( this.props.playername ) {
            playername = <div className="playername">({ this.props.playername })</div>;
        }
        else {
            playername = '';
        }
        return (
            <div id={this.bitId()} className={"bit " + this.props.type} >
                <div>
                    <div className="charname">
                        <img src={ this.props.img } alt='' />
                        { this.props.text }
                        { playername }
                    </div>
                </div>
            </div>
        );
    }
}

class DraggableBit extends Bit {
    componentDidMount() {
        this.element().addEventListener('dragstart', this.props.handleDragStart);
        this.element().addEventListener('drag', this.props.handleDrag);
        this.element().addEventListener('dragend', this.props.handleDragStop);

        this.element().classList.add('draggable');
        this.element().setAttribute('draggable', true);
    }

    element() {
        return document.getElementById(this.bitId());
    }

}

export default DraggableBit;