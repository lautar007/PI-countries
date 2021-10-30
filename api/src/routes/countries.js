const server = require('express').Router();
const {Country, Activities} = require('../db');
const axios = require('axios');
//const Sequelize = require('sequelize');

const getDbInfo =  async() =>{
    return await Country.findAll({
        include:{
            model: Activities,
            attributes: ['name', "difficulty","duration", "season"],
            through:{
                attributes: []
            }
        }
    })
}


server.get('', async(req, res, next)=>{
    const {name} = req.query;
    if(name){
        const countriesTotal = await getDbInfo();
        const country = countriesTotal.filter(el=> el.Name.toUpperCase().includes(name.toUpperCase()));
        country.length > 0 ?
        res.status(200).json(country[0].dataValues) :
        res.status(404).send('El país buscado no existe')
    }
    Country.findAll({
        include:{
            model: Activities,
            attributes: ['name', "difficulty","duration", "season"],
            through:{
                attributes: []
            }
        }
    })
    .then (countrys =>{
        countrys.length > 0 ? res.status(200).json(countrys) 
        : 
        axios.get('https://restcountries.com/v3/all')
        .then(countrys =>{
            return Promise.all(
                countrys.data.map(country =>{
                    if(country.capital){
                    return Country.create({
                        id: country.cca3,
                        Name: country.translations.spa.common,
                        flag: country.flags[0],
                        continent: country.region,
                        capital: country.capital[0],
                        subregion: country.subregion,
                        area: country.area,
                        population: country.population
                    })
                    }
                })
            ).then (respuesta =>{
                res.json(respuesta)
            })
        })
    }).catch(next)
})

server.get('/:idPais', async(req, res, next)=>{
    const {idPais} = req.params;
    const countriesTotal = await getDbInfo();
    const country = countriesTotal.filter(el=> el.id.includes(idPais));
    res.json(country[0].dataValues)
})

//RUTA PARA UNIR UNA ACTIVIDAD CON UN PAÍS:
//necesitamos tener el ID del país y el ID de la actividad por BODY!!!
//Y realizar este PUT
server.put('', async (req, res)=>{
const {countryId, activityId} = req.body;
const country = await Country.findOne({
    where:{
        id:countryId
    }
})
const activity = await Activities.findOne({
    where:{
        id: activityId
    }
})
res.json(await activity.addCountry(country))
})
module.exports = server