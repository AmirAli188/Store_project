const {episodeController} = require('../../http/controllers/admin/episode.controller')
const { videoUploadFile } = require('../../utils/multer')

const router = require('express').Router()
/**
 * @swagger
 *      components:
 *              schemas:
 *                  Types:
 *                      type: string
 *                      enum:
 *                         -    lock
 *                         -    unlock
 */

/**
 * @swagger
 *  components:
 *        schemas:
 *            AddEpisode:
 *                type: object
 *                properties:
 *                    title:
 *                        type: string
 *                        required: true
 *                    text:
 *                        type: string
 *                        required: true
 *                    video:
 *                        type: string
 *                        format: binary
 *                        required: true
 *                    type:
 *                        type: string
 *                        required: true
 *                        enum:
 *                            -   lock
 *                            -   unlock
 *                    chapterID:
 *                        type: string
 *                        required: true
 * 
 */

/**
 * @swagger
 * /admin/episode/add:
 *      post:
 *           summary: add an episode
 *           requestBody:
 *                  required: true
 *                  content:
 *                      multipart/form-data: 
 *                          schema:
 *                              $ref: '#/components/schemas/AddEpisode'
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: '#/components/schemas/AddEpisode'
 *           responses:
 *                  200:
 *                      description: success
 */
router.post('/add' , videoUploadFile.single("video") ,episodeController.addNewRequest)
/**
 * @swagger
 *  /admin/episode/remove/{EpisodeID}:
 *      delete:
 *             summary: removing an Episode
 *             parameters:
 *                  -   in: path
 *                      name: EpisodeID
 *                      type: string
 *                      required: true
 *             responses: 
 *                  201:
 *                      description: success
 */
router.delete('/remove/:EpisodeID' , episodeController.removeEpisode) 
/**
 * @swagger
 * /admin/episode/edit/{EpisodeID}:
 *      patch:
 *           summary: add an episode
 *           parameters : 
 *                  -   in: path
 *                      name: EpisodeID
 *                      type: string
 *                      required: true
 *           requestBody:
 *                  required: true
 *                  content:
 *                      multipart/form-data: 
 *                          schema:
 *                              $ref: '#/components/schemas/AddEpisode'
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: '#/components/schemas/AddEpisode'
 *           responses:
 *                  200:
 *                      description: success
 */
router.patch('/edit/:EpisodeID' , videoUploadFile.single("video") ,episodeController.editEpisode)



module.exports = {
    episodeRouter : router
}