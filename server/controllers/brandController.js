const {Brand, books} = require('../models/models')
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
    async delete(req, res) {
        try {
            const {id} = req.params

            await Brand.destroy({
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
}

module.exports = new BrandController()
