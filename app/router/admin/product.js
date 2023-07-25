const {productController} = require('../../http/controllers/admin/product.controller')
const { imageUploadFile } = require('../../utils/multer')

const router = require('express').Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          addProduct:
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
 *                  count:
 *                       type: number
 *                  images:
 *                        type: array
 *                        items:
 *                          type: string
 *                          format: binary
 *                  type:
 *                       type: string
 *          searchProduct:
 *                 type: object
 *                 properties:
 *                    search:
 *                           type: string
 */

/** 
 * @swagger
 * /admin/product/add:
 *      post:
 *           summary: create a product
 *           requestBody:
 *                  required: true
 *                  content:
 *                      multipart/form-data:
 *                          schema:
 *                              $ref: '#/components/schemas/addProduct'
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: '#/components/schemas/addProduct'
 *           responses:
 *                  200:
 *                      description: success
 */
router.post('/add' ,imageUploadFile.array("images" , 7), productController.addProduct)
/**
 * @swagger
 * /admin/product/list:
 *          get:
 *              summary: get all the products
 *              parameters:
 *                  -   in: query
 *                      name: search
 *                      type: string
 *              responses:
 *                  200:
 *                      description: success
 */
router.get('/list' , productController.getAllProducts)
/**
 * @swagger
 * /admin/product/{id}:
 *          get:
 *              summary: get one products by ID
 *              parameters:
 *                  -   in: path
 *                      name: id
 *                      type: string
 *                      required: true
 *              responses:
 *                  200:
 *                      description: success
 */
 router.get('/:id' , productController.getProductByID)
 /**
 * @swagger
 * /admin/product/edit/{id}:
 *      patch:
 *           summary: create a blog
 *           parameters:
 *                 -    in: path
 *                      name: id
 *                      required: true
 *                      type: string   
 *           requestBody:
 *                  required: true
 *                  content:
 *                      multipart/form-data:
 *                          schema:
 *                              $ref: '#/components/schemas/addProduct'
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref:'#/components/schemas/addProduct'
 *           responses:
 *                  200:
 *                      description: success
 */
router.patch('/edit/:id' ,imageUploadFile.array("images" , 7), productController.editProduct)
module.exports = {
    productRouter : router
} 