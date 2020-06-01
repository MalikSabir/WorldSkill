const db = require('../models');
const express = require('express');
const app = express();

app.post('/postskill',(req,res)=>{
    return db.skilltype.create({where:{skillname:req.body.skillname}})
    .then(value=>{
        console.log(value);
    })
})

