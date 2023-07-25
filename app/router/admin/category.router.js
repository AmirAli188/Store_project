const {categoryController} = require('../../http/controllers/admin/category.controller')

const router = require('express').Router()
/**
 * @swagger
 *   /admin/category/add:
 *      post:
 *           summary: create new category
 *           parameters:
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: title    
 *              -   in: formData
 *                  type: string
 *                  required: false
 *                  name: parent   
 *           responses:
 *               201:
 *                  description: success
 */
router.post('/add' , categoryController.addCategory)
/**
 * @swagger
 *   /admin/category/parents:
 *          get:
 *              summary: get all the parents categories
 *              responses:
 *                  200:
 *                      description: success
 */
router.get('/parents' , categoryController.getAllParents)
/**
 * @swagger
 *   /admin/category/all:
 *          get:
 *              summary: get all categories
 *              responses:
 *                  200:
 *                      description: success
 */
router.get('/all' , categoryController.getAllCategory)
/**
 * @swagger
 *   /admin/category/child/{id}:
 *          get:
 *              summary: get all the child categories by id
 *              parameters:
 *                  -   in: path
 *                      name: id
 *                      
 *                      required: true
 *              responses:
 *                  200:
 *                      description: success
 */
router.get('/child/:id' , categoryController.getChildOfParents)
/**
 * @swagger
 *   /admin/category/remove/{id}:
 *          delete:
 *              summary: remove a category  by id
 *              parameters:
 *                  -   in: path
 *                      name: id
 *                      
 *                      required: true
 *              responses:
 *                  200:
 *                      description: success
 */
router.delete('/remove/:id' , categoryController.removeCategory)
/**
 * @swagger
 *   /admin/category/update/{id}:
 *          patch:
 *              summary: edit a category title
 *              parameters:
 *                  -   in: path
 *                      name: id
 *                      type: string
 *                      required: true
 *                  -   in: formData
 *                      name: title
 *                      type: string
 *                      required: true
 *              responses:
 *                  200:
 *                      description: success
 */
router.patch('/update/:id' , categoryController.editCategory)
 /**
 * @swagger
 *   /admin/category/{id}:
 *          get:
 *              summary: get one category by ID
 *              parameters:
 *                  -   in: path
 *                      name: id
 *              responses:
 *                  200:
 *                      description: success
 */
router.get('/:id' , categoryController.getCategoryById)


module.exports = {
    categoryRouter : router
}
