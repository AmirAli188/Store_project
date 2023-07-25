const {chapterController} = require('../../http/controllers/admin/chapter.controller')

const router = require('express').Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *           addChapter:
 *                  type: object
 *                  properties:
 *                      title:
 *                            type: string
 *                      text:
 *                            type: string
 *                      id:
 *                            type: string
 *           editChapter:
 *                    type: object
 *                    properties:
 *                      title:
 *                            type: string
 *                      text:
 *                           type: string
 */


/**
 * @swagger
 * /admin/chapter/add:
 *      put:
 *          summary: add a chapter to course
 *          requestBody:
 *                   required: true
 *                   content:
 *                       multipart/form-data:
 *                           schema:
 *                               $ref: '#/components/schemas/addChapter'
 *                       application/x-www-form-urlencoded:
 *                           schema:
 *                               $ref: '#/components/schemas/addChapter'
 *          responses:
 *                  200:
 *                      description: success
 */
router.put('/add' , chapterController.addChapter)
/**
 * @swagger
 * /admin/chapter/list/{id}:
 *      get: 
 *          parameters:
 *                 -    in: path
 *                      name: id
 *                      type: string
 *                      requireD: true
 *          responses:
 *                  200:
 *                      descriptin: success
 *                 
 *
 */
router.get('/list/:id' , chapterController.getChapters)
/**
 * @swagger
 *   /admin/chapter/delete/{id}:
 *          delete:
 *                 summary: delete one chapter from the course
 *                 parameters:
 *                      -   in: path
 *                          name : id
 *                          required: true
 *                          type: string
 *                 responses:
 *                      200:
 *                         descriptin: success                     
 */
router.delete('/delete/:id' , chapterController.deleteChaptersOfCourse)
/**
 * @swagger
 *  /admin/chapter/update/{id}:
 *         patch:
 *             summary: edit one chapter by id
 *             parameters:
 *                 -   in: path
 *                     name: id
 *                     type: string
 *                     required: true
 *             requestBody:
 *                      required: true
 *                      content:
 *                          multipart/form-data:
 *                              schema:
 *                                  $ref: '#/components/schemas/editChapter'
 *                          application/x-www-form-urlencoded:
 *                              schema:
 *                                  $ref: '#/components/schemas/editChapter'
 *             responses:
 *              201:
 *                  description: success
 */
router.patch('/update/:id' , chapterController.updateOneChapter)



module.exports = {
    ChapterRouter : router
} 