const graphql = require('graphql')
const { blogType } = require('./typeDefs/blog.type')
const { blogResolver } = require('./queries/blog.query')

const RootQuery = new graphql.GraphQLObjectType({
    name : "RootQuery" ,
    fields: {
        blogs : blogResolver
    }
})
const RootMutation = new graphql.GraphQLObjectType({
    name : "RootMutation" ,
    fields : {
        
    }
})
const graphQLSchema = new graphql.GraphQLSchema({
    query : RootQuery
    //mutation : RootMutation
})

module.exports = {
    graphQLSchema
}