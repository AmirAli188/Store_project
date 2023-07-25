const {courseController} = require('../../http/controllers/admin/course.controller')
const { imageUploadFile } = require('../../utils/multer')

const router = require('express').Router()
/**
 * @swagger
 *  components:
 *      schemas:
 *          Types:
 *              type: string
 *              enum:
 *                   -   free
 *                   -   cash
 *                   -   special  
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          addCourse:
 *              type: object
 *              properties:
 *                  title:
 *                       type: string
 *                  text:
 *                       type: string
 *                  short_text:
 *                       type: string
 *                  price:
 *                       type: number
 *                  category:
 *                       type: string
 *                  discount:
 *                       type: number
 *                  image:
 *                        type: string
 *                        format: binary
 *                  type:
 *                      $ref: '#/components/schemas/Types'
 */

 
/**
 * @swagger
 * /admin/course/add:
 *      post:
 *           summary: add a course
 *           requestBody:
 *                  required: true
 *                  content:
 *                      multipart/form-data:
 *                          schema:
 *                              $ref: '#/components/schemas/addCourse'
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref:'#/components/schemas/addCourse'
 *           responses:
 *                  200:
 *                      description: success
 */
router.post('/add' ,imageUploadFile.single("image"), courseController.addCourses)
/**
 * @swagger
 *  /admin/course/list:
 *          get:
 *              summary: get all courses
 *              parameters: 
 *                  -   in: query
 *                      name: search
 *                      type: string
 *              responses:
 *                      200:
 *                          description: success
 */
router.get('/list' , courseController.getListOfCourses)
/**
 * @swagger
 *  /admin/course/{id}:
 *          get:
 *              summary: get ope course
 *              parameters: 
 *                  -   in: path
 *                      name: id
 *                      type: string
 *              responses:
 *                      200:
 *                          description: success
 */
router.get('/:id' , courseController.getOneCourse)


module.exports = {
    courseRouter : router
}