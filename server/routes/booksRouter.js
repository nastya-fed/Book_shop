const Router = require('express')
const router = new Router()
const booksController = require('../controllers/booksController')
const userController = require("../controllers/userController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), booksController.create)
router.post('/', checkRole('ADMIN'), booksController.booksid)
router.get('/', booksController.getAll)
router.get('/:id', booksController.getOne)

router.delete('/:id',checkRole('ADMIN'), booksController.delete)

router.put('/:bookId', checkRole('ADMIN'), booksController.put)


module.exports = router