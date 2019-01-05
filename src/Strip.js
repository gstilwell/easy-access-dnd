import React, { Component } from 'react';
import './Strip.css';

class Strip extends Component {
    elementsToSpans() {
        let spans = [],
            key = 0;

        for( let element in this.props.elements ) {
            spans.push( <span key={key} className="stripElement">{this.props.elements[element]}</span> );
            key += 1;
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