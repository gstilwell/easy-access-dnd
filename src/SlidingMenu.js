// Menu based off of:
// https://www.kirupa.com/react/smooth_sliding_menu_react_motion.htm

import React, { Component } from 'react';
import './SlidingMenu.css';
import hamburger from './img/hamburger.png';
import xicon from './img/xicon.png';

class SlidingMenuButton extends Component {
    render() {
        return (
            <img id="menuButton" src={this.props.icon} onClick={this.props.onClick} alt='' />
        );
    }
}

class SlidingMenu extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            visible: false
        };
 
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }
 
    openMenu(e) {
        this.setState({ visible: true });
        e.stopPropagation();
    }

    closeMenu(e) {
        this.setState({ visible: false });
        e.stopPropagation();
    }

    display(type, thing) {
        if( type === 'image' ) {
            return (
                <img src={thing} alt='' />
            );
        }
        else if( type === 'text' ) {
            return thing;
        }
        else {
            return "unknown";
        }
    }
 
    render() {
        let visibility = this.state.visible ? "show" : "hide",
            options = [];

        for( let option in this.props.options ) {
            let thisOption = this.props.options[option],
                entryDisplay = this.display(thisOption.displayType, thisOption.display);

            options.push(
                <h2 key={option}>
                    <button onClick={thisOption.target} key={option + 10000}> {entryDisplay} </button>
                </h2>
            );
        }

        return (
            <div>
            <SlidingMenuButton icon={hamburger} onClick={ this.openMenu }/>
            <div id="flyoutMenu" className={visibility} >
                <SlidingMenuButton icon={xicon} onClick={ this.closeMenu }/>
                { options }
            </div>
            </div>
        );
    }
}

export { SlidingMenuButton, SlidingMenu };