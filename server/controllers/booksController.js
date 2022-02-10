const uuid = require('uuid')
const path = require('path');
const {books, booksInfo, Basketbooks, Type} = require('../models/models')
const ApiError = require('../error/ApiError');

class booksController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const book = await books.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    booksInfo.create({
                        title: i.title,
                        description: i.description,
                        booksId: book.id
                    })
                )
            }

            return res.json(book)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }


    async booksid(req, res, next) {
        try {
            let {basketId, booksId} = req.body

            const dev = await Basketbooks.create({basketId, booksId});

            return res.json(dev)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let bookss;
        if (!brandId && !typeId) {
            bookss = await books.findAndCountAll({})
        }
        if (brandId && !typeId) {
            bookss = await books.findAndCountAll({where: {brandId}})
        }
        if (!brandId && typeId) {
            bookss = await books.findAndCountAll({where: {typeId}})
        }
        if (brandId && typeId) {
            bookss = await books.findAndCountAll({where: {typeId, brandId}})
        }
        return res.json(bookss)
    }

    async getOne(req, res) {
        const {id} = req.params
        const book = await books.findOne(
            {
                where: {id},
                include: [{model: booksInfo, as: 'info'}]
            },
        )
        return res.json(book)
    }

    async delete(req, res) {
        try {
            const {id} = req.params

            await books.destroy({
                where: {
                    id: id
                }
            })
            // const post=await books.(id)
            return res.json({})
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async put(req, res) {
        try{
            const {bookId} = req.params
            const book =await books.findOne(
                {
                    where: {id: bookId}
                })
            await book.update({
                name: req.body.name,
                price: req.body.price,
                img: req.body.img,
                brandId: req.body.brandId,
                typeId: req.body.typeId

            })
            await book.save()
            res.json(book)

        }catch (e) {
            res.status(500).json(e)

        }

    };
}


module.exports = new booksController()
