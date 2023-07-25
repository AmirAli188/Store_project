const express = require('express')
const path = require('path')
const http = require('http')
const mongoose = require('mongoose')
const { allRoutes } = require('./router/router')
const createError = require('http-errors')
const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')  
require('dotenv').config()
module.exports =  class Application {
    #express = require('express')
    #app = this.#express()
    #DB_URL
    #PORT
    constructor(DB_URL , PORT){
        this.#PORT = PORT
        this.#DB_URL = DB_URL
        this.configApplication()
        this.connectDB(this.#DB_URL)
        this.configServer(this.#PORT)
        this.createRoutes()
        this.errorHandeling()
       // this.init_redis()
    }
    configApplication(){
        this.#app.use(this.#express.json({limit : "300mb"}))
        this.#app.use(this.#express.urlencoded({extended : true , limit : "300mb" , parameterLimit : 1000000}))
        this.#app.use(this.#express.static(path.join(__dirname , ".." ,"public") ))
        this.#app.use("/api-doc" , swaggerUI.serve,swaggerUI.setup(swaggerJSDoc({
             swaggerDefinition :{
              openapi : "3.0.0" , 
                info : {
                    title : "boto start store",
                    version : "2.0.0" ,
                    description : "Hello programmers"
                } ,
                servers : [
                    {
                        url : "http://localhost:5000"
                    }
                ],
                components : {
                    securitySchemes : {
                        BearerAuth : {
                            type : "http" , 
                            scheme : "bearer" , 
                            bearerFormat : "JWT"
                        }
                    }
                } , 
                security : [{BearerAuth : []}]
             },
             apis :["./app/router/**/*.js"]
        }),
        {explorer : true}
      ))
    }   
    configServer(PORT){
        http.createServer(this.#app).listen(PORT , ()=>{
            console.log(`listenning on port ${PORT}`)
        })
        
    }
    //init_redis(){
      //  require('./utils/init-redis')
    //}
    connectDB(DB_URL){
        mongoose.connect(DB_URL).then(()=>{console.log("successfuly connected on mongoDB");})
        .catch(()=>{console.log("didnt connect to mongoDB");})
        process.on("SIGINT" , async()=>{
           await mongoose.connection.close()
            process.exit(0)
        })
    }
    createRoutes(){
        this.#app.use(allRoutes)
    }
    errorHandeling(){
        this.#app.use((req , res , next)=>{
            next(createError.NotFound("آدرس مورد نظر یافت نشد"))
        })
        this.#app.use((error , req , res , next)=>{
            const ServerError = createError.InternalServerError()
            const statusCode = error.status ||  ServerError.status
            const message = error.message || ServerError.message
            return res.status(500).json({
                errors:[
                    statusCode , 
                    message
                ]
            })
        })
    }
}
