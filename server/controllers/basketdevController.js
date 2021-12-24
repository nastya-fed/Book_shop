const {Basketbooks, books, booksInfo, Basket} = require('../models/models')
const ApiError = require('../error/ApiError');
const sequelize = require("express");
const {QueryTypes} = require("sequelize");

class BasketdevController {
    async create(req, res) {
        //const {basketId, booksId} = req.body
        let {basketId, booksId} = req.body
        const BasketDev = await Basketbooks.create({basketId, booksId})

        return res.json(BasketDev)

    }
    async getAll(req, res) {
        const user_id = req.query.userId;
        // let {user_id_from_frontend} = req.query.userId
        // console.log(user_id_from_frontend)
        const basket_object = await Basket.findOne({where:{userId: user_id}});

        let BasketDev;



        if (basket_object) {
            BasketDev = await Basketbooks.findAll(
                {
                    where:{basketId: basket_object.id},
                    include: {model: books, as: 'books'},
                    attributes: {exclude: ['basketId','id','createdAt','updatedAt','booksId']}
                }
                )
        }
        return res.json(BasketDev)
    }



}

module.exports = new BasketdevController()
