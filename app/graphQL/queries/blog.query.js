const graphql = require('graphql')
const { blogType } = require('../typeDefs/blog.type')
const { blogsModel } = require('../../models/blogs')


const blogResolver = {
    type : new graphql.GraphQLList(blogType) ,
    resolver : async()=>{
        return await blogsModel.find({}).populate('author')
    }
}

module.exports = {
    blogResolver
}