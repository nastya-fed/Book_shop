const {Basket, books, booksInfo} = require('../models/models')
const ApiError = require('../error/ApiError');
const sequelize = require("express");
const {QueryTypes} = require("sequelize");

class BasketdevController {
    async create(req, res) {
        //const user_id = req.query.userId;
      //  console.log(user_id);
        //const {basketId, booksId} = req.body
        let { bookId,userId} = req.body
        const BasketDev = await Basket.create({ bookId, userId})

        return res.json(BasketDev)

    }

    async getAll(req, res) {
       const user_id = req.query.userId;
        // let {user_id_from_frontend} = req.query.userId
        // console.log(user_id_from_frontend)
        //const {user_id} = req.params
        const basket_object = await Basket.findOne({where:{userId: user_id}});

        let BasketDev;

        if (basket_object) {
            BasketDev = await Basket.findAll(
                {
                    where:{userId: user_id },
                    //if (bookId='2') {bookId='1127735';},
                    include: {model: books, as: 'book'},
                    attributes: {exclude: ['basketId','id','createdAt','updatedAt', 'userId','bookId']}
                }
                )
        }

        return res.json(BasketDev)
    }



}

module.exports = new BasketdevController()
