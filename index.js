const express = require('express')
const routes = require('./routes')
const {Comments} = require('./models')
const app = express()
require("dotenv").config()


app.use('',routes)
app.use(express.json())
app.use(express.static('public'))
app.set('view engine','ejs')

Comments.sync()
app.get('/',function(req,res){
    res.render('./pages/index')
})

app.listen(process.env.NODE_PORT,() => {
    console.log(`Servidor online: http://${process.env.MYSQL_HOST}:${process.env.NODE_PORT}`)
})
