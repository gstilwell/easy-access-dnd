import React, { Component } from 'react';
import './AdjustableValue.css';

class Arrow extends Component {
    handleClick = (e) => {
        console.log(this.props.category);
        let sign = this.props.direction === 'up' ? 1 : -1,
            event = new CustomEvent( 'adjustValue',
                {
                    detail: {
                        category: this.props.category,
                        name: this.props.name,
                        type: this.props.type,
                        change: sign * this.props.value
                    }
                });
                
        this.element().dispatchEvent( event );
    }

    imgId() {
        let id = this.props.name + this.props.direction + this.props.type + 'arrow';
        return id;
    }

    element() {
        return document.getElementById(this.imgId());
    }

    render() {
        return (
            <img
                src={ this.props.icon }
                onClick={ this.handleClick }
                direction={ this.props.direction }
                className={"arrow " + this.props.direction }
                id={ this.imgId() }
                alt=''
            />
        );
    }
}

class AdjustableValue extends Component {
    render() {
        return (
            <div className={"adjustableValue " + this.props.type}>
                <Arrow
                    icon={ this.props.doublearrow }
                    direction="down"
                    category={ this.props.category }
                    type={ this.props.type }
                    name={ this.props.blockname }
                    value={ 5 } />
                <Arrow
                    icon={ this.props.singlearrow }
                    direction="down"
                    category={ this.props.category }
                    type={ this.props.type }
                    name={ this.props.blockname }
                    value={ 1 } />
                <img src={ this.props.icon } className="valueIcon" alt='' />
                { this.props.value }
                <Arrow
                    icon={ this.props.singlearrow }
                    direction="up"
                    category={ this.props.category }
                    type={ this.props.type }
                    name={ this.props.blockname }
                    value={ 1 } />
                <Arrow
                    icon={ this.props.doublearrow }
                    direction="up"
                    category={ this.props.category }
                    type={ this.props.type }
                    name={ this.props.blockname }
                    value={ 5 } />
            </div>
        );
    }
}

export default AdjustableValue;