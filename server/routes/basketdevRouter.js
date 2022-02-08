const Router = require('express')
const router = new Router()
const BasketdevController = require('../controllers/BasketdevController')
const checkRole = require("../middleware/checkRoleMiddleware");
const booksController = require("../controllers/booksController");

router.post('/', BasketdevController.create)
router.get('/', BasketdevController.getAll)
router.get('/r', BasketdevController.getAl)
//router.get('/', BasketdevController.getOne)
router.delete('/', BasketdevController.delete)


module.exports = router
     