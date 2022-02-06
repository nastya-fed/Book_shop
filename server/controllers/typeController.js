const {Type} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
    async delete(req, res) {
        try {
            const {id} = req.params

            await Type.destroy({
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

module.exports = new TypeController()
