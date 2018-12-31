class Dice {
    roll(...dice) {
        let total = 0;
        dice.forEach( dieType => {
            let die = dieType.split('d'),
                num = die[0],
                size = die[1];

            for( let i = 0; i < num; i += 1 ) {
                total += Math.ceil(Math.random() * size);
            }
        });

        return total;
    }
}

export default Dice;