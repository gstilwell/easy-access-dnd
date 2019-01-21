const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

let DNDGLOBAL = {
    nodePort: 3001,
    mongohost: 'localhost',
    mongoport: 27017,
    mongodbname: 'dnd',
    get mongoserver() {
        return `mongodb://${this.mongohost}:${this.mongoport}/${this.mongodbname}`;
    }
};

db = mongoose.connect(DNDGLOBAL.mongoserver, {useNewUrlParser: true})
        .then(() => {
            console.log(`connected to ${DNDGLOBAL.mongoserver}`);
        })
        .catch((error) => {
            console.log(`failed to connect to ${DNDGLOBAL.mongoserver} with error ${error}`);
        });

let DBSCHEMAS = {
    monster: new mongoose.Schema({
                name: String,
                maxHP: Number,
                ac: Number,
                initMod: Number,
                attacks: Array,
            }),
    character: new mongoose.Schema({
                name: String,
                playerName: String,
                maxHP: Number,
                ac: Number,
                passivePerception: Number,
                initMod: Number,
            }),
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/createmonster', (req, res) => {
    let monster = mongoose.model('Monster', DBSCHEMAS.monster),
        newMonster = new monster({ name: req.body.name,
                                   maxHP: req.body.maxHP,
                                   ac: req.body.ac,
                                   initMod: req.body.initMod,
                                   attacks: req.body.attacks
                                });
    newMonster.save( (err, dude) => {
        if( err ) {
            console.log("error saving", dude);
        }

        console.log("saved", dude);
    });

    console.log(newMonster);
    res.json(req.body);
});

app.listen(DNDGLOBAL.nodePort, () => {
    console.log(`connected on port ${DNDGLOBAL.nodePort}`);
});