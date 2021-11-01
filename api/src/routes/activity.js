const express = require('express');
const app = express();
const server = require('express').Router();
const {Country, Activities} = require('../db');

app.use(express.json());

server.post('', async(req, res) => {
    let {
        name,
        difficulty,
        duration,
        season
    } = req.body;
    await Activities.findOrCreate({
        where: { name: name },
  defaults: {
    name: name,
    difficulty: difficulty,
    duration: duration,
    season: season
  }
    })
    res.status(200).send('Actividad creada con éxito')
})

server.get('', (req, res, next)=>{
    Activities.findAll()
    .then(activities =>{
        if(activities.length > 0){
            res.status(200).json(activities)
        }
        else{
            res.status(404).send('No hay actividades')
        }
    })
})

module.exports = server