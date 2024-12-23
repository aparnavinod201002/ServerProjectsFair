//loads env file contents into process.env by default
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Router/router')
require('./DB/connection')
const pfServer  =  express()



pfServer.use(cors())


pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`Pf server started running at PORT :${PORT}`);
    
})

pfServer.get('/',(req,res)=>{
    res.send("<h1 style=color:red>Project-fair server started running and waiting for client request.....</h1>")
})
//requst and then response