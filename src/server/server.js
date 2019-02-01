const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const schemas = require('./DNDSchemas.js');

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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/getgame/:gameId', (req, res) => {
    let gameModel = mongoose.model('Game', schemas.game);
    gameModel.findOne({gameId: req.params.gameId}, (err, game) => {
        if(err) {
            res.error("error: " + err);
        }

        console.log(game);
        res.json(game);
    });
});

app.get('/getmonsters', (req, res) => {
    let monsterModel = mongoose.model('Monster', schemas.monster);
    monsterModel.find({}, (err, monsters) => {
        let monsterTypes = [];
        for( monster in monsters ) {
            monsterTypes.push(monsters[monster].type);
        }
        console.log(monsterTypes);
        res.json(monsterTypes);
    }).select('type -_id');
});

app.get('/getmonster/:type', (req, res) => {
    let monsterModel = mongoose.model('Monster', schemas.monster);
    monsterModel.findOne({type: req.params.type}, (err, monster) => {
        console.log(monster);
        res.json(monster);
    }).select('-_id');
});

app.post('/createcharacter', (req, res) => {
    let characterModel = mongoose.model('Character', schemas.character),
        newCharacter = new characterModel({
                              name: req.body.name,
                              playerName: req.body.playerName,
                              hp: req.body.hp,
                              ac: req.body.ac,
                              passivePerception: req.body.passivePerception,
                              initModifier: req.body.initModifier,
                           });

    characterModel.findOne({name: req.body.name}, (err, character) => {
        if( character ) {
            res.send(`character named ${character.name} already exists. not saving new character`);
        }
        else {
            newCharacter.save( (err, dude) => {
                if( err ) {
                    console.log("error saving", dude);
                }
                console.log("saved", dude);
            });
            res.json(req.body);
        }
    });
});

app.post('/updateInitiative', (req, res) => {
    let gameModel = mongoose.model('Game', schemas.game);
    gameModel.findOneAndUpdate(
        {gameId: req.body.gameId},
        {initiative: {order: req.body.order, next: req.body.next}},
        (err, data) => {
            if(err) {
                res.send("error updating initiative:", err);
            }
            res.send(data);
        });
});

app.post('/createmonster', (req, res) => {
    let monsterModel = mongoose.model('Monster', schemas.monster),
        newMonster = new monsterModel({
                              type: req.body.type,
                              hp: req.body.hp,
                              ac: req.body.ac,
                              initModifier: req.body.initModifier,
                              attacks: req.body.attacks
                           });

    monsterModel.findOne({type: req.body.type}, (err, monster) => {
        if( monster ) {
            res.send(`monster named ${monster.type} already exists. not saving new monster`);
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