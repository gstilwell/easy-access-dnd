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
                hp: Number,
                ac: Number,
                initMod: Number,
                attacks: Array,
            }),
    character: new mongoose.Schema({
                name: String,
                playerName: String,
                hp: Number,
                ac: Number,
                passivePerception: Number,
                initMod: Number,
            }),
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/getmonsters', (req, res) => {
    let monsterModel = mongoose.model('Monster', DBSCHEMAS.monster);
    monsterModel.find({}, (err, monsters) => {
        let monsterNames = [];
        for( monster in monsters ) {
            monsterNames.push(monsters[monster].name);
        }
        console.log(monsterNames);
        res.json(monsterNames);
    }).select('name -_id');
});

app.get('/getmonster/:name', (req, res) => {
    let monsterModel = mongoose.model('Monster', DBSCHEMAS.monster);
    monsterModel.findOne({name: req.params.name}, (err, monster) => {
        console.log(monster);
        res.json(monster);
    }).select('-_id');
});

app.post('/createmonster', (req, res) => {
    let monsterModel = mongoose.model('Monster', DBSCHEMAS.monster),
        newMonster = new monsterModel({ name: req.body.name,
                                   hp: req.body.hp,
                                   ac: req.body.ac,
                                   initMod: req.body.initMod,
                                   attacks: req.body.attacks
                                });

    monsterModel.findOne({name: req.body.name}, (err, monster) => {
        if( monster ) {
            res.send(`monster named ${monster.name} already exists. not saving new monster`);
        }
        else {
            newMonster.save( (err, dude) => {
                if( err ) {
                    console.log("error saving", dude);
                }
                console.log("saved", dude);
            });
            res.json(req.body);
        }
    });
});

app.listen(DNDGLOBAL.nodePort, () => {
    console.log(`connected on port ${DNDGLOBAL.nodePort}`);
});