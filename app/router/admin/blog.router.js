const {blogController} = require("../../http/controllers/admin/blog.controller")
const { StringToArray } = require("../../http/middlewares/StringToArray")
const { imageUploadFile } = require("../../utils/multer")

const router = require("express").Router()
 
/**
 * @swagger
 * /admin/blog/:
 *      get:
 *          summary: get all blogs
 *          parameters:
 *              -   in: header
 *                  name: token
 *                  required: true
 *                  type: string
 *          responses: 
 *                200:
 *                    description: success 
 */
router.get('/'  ,blogController.getListOfBlogs)
/**
 * @swagger
 * /admin/blog/add:
 *      post:
 *           summary: create a blog
 *           parameters:
 *              -   in: header
 *                  name: token
 *                  type: string
 *                  required: true
 *                  value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE1MjE3OTEyOSIsImlhdCI6MTY2MzE3OTQ1MSwiZXhwIjoxNjYzMTgzMDUxfQ.anZ6n0cIZWbKmHXW0qKWEdh3urTObriBwd5wU2j-yIA
 *              -   in: formData
 *                  name: title
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  required: true
 *                  type: file
 *              -   in: formData
 *                  name: category
 *                  required: true
 *                  type: string
 *           responses:
 *                  200:
 *                      description: success
 */
router.post('/add' ,imageUploadFile.single("image"),StringToArray("tags"), blogController.createBlog)
/**
 * @swagger
 * /admin/blog/{id}:
 *      get:
 *          summary: get one blog by ID
 *          parameters:
 *              -   in: header
 *                  name: token
 *                  value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE1MjE3OTEyOSIsImlhdCI6MTY2MzE3OTQ1MSwiZXhwIjoxNjYzMTgzMDUxfQ.anZ6n0cIZWbKmHXW0qKWEdh3urTObriBwd5wU2j-yIA
 *                  required: true
 *                  type: string
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *          responses: 
 *                200:
 *                    description: success 
 */
router.get('/:id' ,blogController.getOneBlogByID)
/**
 * @swagger
 * /admin/blog/remove/{id}:
 *      delete:
 *          summary: delete one blog by ID
 *          parameters:
 *              -   in: header
 *                  name: token
 *                  value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE1MjE3OTEyOSIsImlhdCI6MTY2MzE3OTQ1MSwiZXhwIjoxNjYzMTgzMDUxfQ.anZ6n0cIZWbKmHXW0qKWEdh3urTObriBwd5wU2j-yIA
 *                  required: true
 *                  type: string
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *          responses: 
 *                200:
 *                    description: success 
 */
 router.delete('/remove/:id'  ,blogController.deleteBlogByID)
 /**
 * @swagger
 * /admin/blog/update/{id}:
 *      patch:
 *           summary: create a blog
 *           parameters:
 *              -   in: header
 *                  name: token
 *                  type: string
 *                  required: true
 *                  value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE1MjE3OTEyOSIsImlhdCI6MTY2MzE3OTQ1MSwiZXhwIjoxNjYzMTgzMDUxfQ.anZ6n0cIZWbKmHXW0qKWEdh3urTObriBwd5wU2j-yIA
 *              -   in: formData
 *                  name: title
 *                  
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  
 *                  type: file
 *              -   in: formData
 *                  name: category
 *                  
 *                  type: string
 *              -   in: formData
 *                  name: blabla
 *                  
 *                  type: string
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *           responses:
 *                  200:
 *                      description: success
 */
router.patch('/update/:id' ,imageUploadFile.single("image"),StringToArray("tags"), blogController.updateBlogByID)

module.exports = {
    BlogRouter : router
}  