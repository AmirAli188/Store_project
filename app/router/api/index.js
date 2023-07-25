const { HomeController } = require('../../http/controllers/api/home-controller')
const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken')

const router = require('express').Router()
/**
 * @swagger
 * /:
 *   get:
 *       summary: index of routes
 *       description: hello
 *       parameters:
 *            - in: header
 *              name: accesstoken
 *              
 *       responses: 
 *           200: 
 *               description: success
 *           400: 
 *               description: not Found    
 */

router.get('/' , HomeController.indexPage )


module.exports = {
    HomeRoutes : router
}