const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')
const booksController = require("../controllers/booksController");

router.post('/', checkRole('ADMIN'), typeController.create)
//router.post('/', typeController.create)
router.get('/', typeController.getAll)
router.delete('/:id',checkRole('ADMIN'), typeController.delete)

module.exports = router
