const { BlogRouter } = require('./blog.router')
const {categoryRouter} = require('./category.router')
const { ChapterRouter } = require('./chapter.router')
const {courseRouter} = require('./course.router')
const {episodeRouter} = require('./episode.router')
const { productRouter } = require('./product')

const router = require('express').Router()

router.use("/category" ,categoryRouter)
router.use("/blog" ,BlogRouter)
router.use("/product" ,productRouter)
router.use("/course" ,courseRouter)
router.use('/chapter' , ChapterRouter)
router.use('/episode' , episodeRouter)


module.exports = {
    AdminRoutes : router
}