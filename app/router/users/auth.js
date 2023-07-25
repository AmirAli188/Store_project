const { authController } = require('../../http/controllers/users/auth/auth.controller')

const router = require('express').Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          getOTP:
 *              type: object
 *              properties:
 *                     mobile:
 *                           type: string
 *          checkOTP:
 *              type: object
 *              properties:
 *                     mobile:
 *                          type: string
 *                     code:
 *                          type: number
 *          refreshToken:
 *               type: object
 *               properties:
 *                  refreshToken:
 *                              type: string         
 */


/**
 * @swagger
 * /user/get-OTP:
 *     post:
 *          summary: login user in userpanel with phone number
 *          description: one time password (OTP) login
 *          requestBody:
 *                     content:
 *                             application/x-www-form-urlencoded:
 *                                                schema:
 *                                                       $ref: '#/components/schemas/getOTP'     
 *                             application/json:
 *                                              schema:
 *                                                     $ref: '#/components/schemas/getOTP'    
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorization
 *              500: 
 *                  description: server Error
 */
router.post('/get-OTP' , authController.getOTp)
/**
 * @swagger
 * /user/check-OTP:
 *     post:
 *          summary: login user in userpanel with phone number
 *          description: one time password (OTP) login
 *          requestBody:
 *                     content:
 *                             application/x-www-form-urlencoded:
 *                                                schema:
 *                                                       $ref: '#/components/schemas/checkOTP'     
 *                             application/json:
 *                                              schema:
 *                                                     $ref: '#/components/schemas/checkOTP'    
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorization
 *              500: 
 *                  description: server Error
 */
router.post('/check-OTP' , authController.checkOTP)
/**
 * @swagger
 * /user/refresh-token:
 *    post: 
 *         summary: send refresh token for get new token and refresh
 *         description: refresh token
 *         requestBody:
 *               content:
 *                      application/x-www-form-urlencoded:
 *                                     schema:
 *                                            $ref: '#/components/schemas/refreshToken'
 *                      multipart/form-data:
 *                          schema:
 *                              $ref: '#/components/schemas/refreshToken'
 *         responses: 
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorization
 *              500: 
 *                  description: server Error
 */


router.post('/refresh-token' , authController.refreshToken)

module.exports = {
    userAuthRouter : router
}