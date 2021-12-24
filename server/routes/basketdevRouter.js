const Router = require('express')
const router = new Router()
const BasketdevController = require('../controllers/BasketdevController')

router.post('/', BasketdevController.create)
router.get('/', BasketdevController.getAll)


module.exports = router
     