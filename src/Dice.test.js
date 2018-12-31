import React from 'react';
import Dice from './Dice.js';

// TODO need to put this back in once addEventListener is mocked
//it('renders without crashing', () => {
//  const div = document.createElement('div');
//  ReactDOM.render(<App />, div);
//  ReactDOM.unmountComponentAtNode(div);
//});

var __DiceTest = {
    numIterations: 1000
}

function checkRollIsInRange(roll, min, max) {
    expect(roll).toBeGreaterThanOrEqual(min)
    expect(roll).toBeLessThanOrEqual(max);
}

function checkLots(lots, min, max, ...dice) {
    let roller = new Dice(),
        roll;

    for( let i = 0; i < lots; i += 1 ) {
        roll = roller.roll(...dice);
        checkRollIsInRange(roll, min, max);
    }
}

it('rolls 20s', () => {
    // roll a thousand times and make sure everything is within 1-20
    // not a great test, but for now it will suffice (most of the time)
    let dice = new Dice();
    checkLots(__DiceTest.numIterations, 1, 20, "1d20");
});

it('rolls with multiple dice', () => {
    checkLots(__DiceTest.numIterations, 3, 18, "3d6");
});

it('rolls with multiple die types', () => {
    checkLots(__DiceTest.numIterations, 4, 24, "3d6", "1d6");
    checkLots(__DiceTest.numIterations, 2, 10, "1d4", "1d6");
});

it('rolls all values', () => {
    let dice = new Dice();
    let vals = {
    };
    for( let i = 0; i < __DiceTest.numIterations; i += 1 ) {
        let roll = dice.roll('1d10');
        vals[roll] = vals[roll] ? vals[roll] + 1 : 1;
    }
    console.log(vals);

    let valsRolled = Object.keys(vals);
    expect(valsRolled.length).toBe(10);
    expect(vals[1]).toBeDefined();
    expect(vals[2]).toBeDefined();
    expect(vals[3]).toBeDefined();
    expect(vals[4]).toBeDefined();
    expect(vals[5]).toBeDefined();
    expect(vals[6]).toBeDefined();
    expect(vals[7]).toBeDefined();
    expect(vals[8]).toBeDefined();
    expect(vals[9]).toBeDefined();
    expect(vals[10]).toBeDefined();
});