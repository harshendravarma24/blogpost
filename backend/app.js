const express = require('express')
var cors = require('cors')
const app = express()
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./config/keys')
// const url = 'mongodb://localhost:27017/ImageDb'
const url = 'mongodb://localhost:27017/Blogpost'


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const conn = mongoose.connection

conn.on('open', () => {
    console.log('connected...')
})
conn.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./models/user')
require('./models/post')
app.use(cors())

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})

