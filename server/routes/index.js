const Router = require('express')
const router = new Router()
const booksRouter = require('./booksRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const BasketDevRouter = require('./BasketDevRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/books', booksRouter)
router.use('/booksid', BasketDevRouter)


module.exports = router
