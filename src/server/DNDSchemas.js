const mongoose = require('mongoose');

exports.monster = new mongoose.Schema({
            type: String,
            hp: Number,
            ac: Number,
            initModifier: Number,
            attacks: [],
        });

exports.character = new mongoose.Schema({
            name: String,
            playerName: String,
            hp: Number,
            ac: Number,
            passivePerception: Number,
            initModifier: Number,
        });

exports.initiative = new mongoose.Schema({
            order: [String],
            next: String,
        });

exports.game = new mongoose.Schema({
            gameId: Number,
            dmName: String,
            pcs: [exports.character],
            monsters: [{name: String, stats: exports.monster}],
            initiative: exports.initiative,
        });