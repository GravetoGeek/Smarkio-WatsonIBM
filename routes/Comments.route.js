const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/Comments.controller')

router.post('/comments',CommentController.set)
router.get('/comments',CommentController.get)
module.exports = router