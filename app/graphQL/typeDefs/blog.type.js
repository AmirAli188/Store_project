const graphql = require('graphql')

const blogType = new graphql.GraphQLObjectType({
    name : "blog" ,
    fields : {
        author : {type : graphql.GraphQLString } ,
        title : {type : graphql.GraphQLString } , 
        short_text : {type : graphql.GraphQLString } , 
        text : {type : graphql.GraphQLString},
        image : {type : graphql.GraphQLString },
        category : {type : graphql.GraphQLString},

    }
})

module.exports = {
    blogType
}