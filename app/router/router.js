const { graphQLSchema } = require('../graphQL/index.resolver')
const { checkRole, verifyAccessToken } = require('../http/middlewares/verifyAccessToken')
const { AdminRoutes } = require('./admin/index.routes')
const { HomeRoutes } = require('./api')
const { userAuthRouter } = require('./users/auth')
const {graphqlHTTP} = require("express-graphql")


const router = require('express').Router()
router.use('/user' , userAuthRouter)
router.use('/admin' , verifyAccessToken,checkRole("ADMIN") , AdminRoutes)
router.use('/' , HomeRoutes )
router.use('/graphql' , graphqlHTTP(function(req , res){
    return {
        schema : graphQLSchema ,
        graphiql : true ,
        context : {req , res}
    }
}))


module.exports = {
    allRoutes : router
}
