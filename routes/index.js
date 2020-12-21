const express = require('express')
const router = express.Router()
router.use(require('./Comments.route'))
module.exports = router