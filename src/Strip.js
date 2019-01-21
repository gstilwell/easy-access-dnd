import React, { Component } from 'react';
import './Strip.css';

class Strip extends Component {
    elementsToSpans() {
        let spans = [],
            index = 0,
            active = '';

        for( let element in this.props.elements ) {
            active = this.props.activeIndex === index ? 'active' : '';
            spans.push( <span key={index} className={"stripElement " + active}>{this.props.elements[element]}</span> );
            index += 1;
        }

        return spans;
    }
    render() {
        return (
            <span className="strip">
                { this.elementsToSpans() }
            </span>
        );
    }
}

export default Strip;