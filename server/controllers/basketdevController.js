const {Basket, books, booksInfo} = require('../models/models')
const ApiError = require('../error/ApiError');
const sequelize = require("express");
const {QueryTypes, Fn, col, fn} = require("sequelize");

class BasketdevController {
    async create(req, res) {
        //const user_id = req.query.userId;
      //  console.log(user_id);
        //const {basketId, booksId} = req.body
        let { bookId,userId} = req.body

        const BasketDev = await Basket.create({ bookId, userId})

        return res.json(BasketDev)

    }
// async getOne (req, res) {
//     let {userId, bookId} = req.query
// let qwe;
//     //let basket_object = await Basket.findAll({where:{userId: user_id , bookId: book_id}});
//     qwe = await Basket.findAndCountAll({where: {userId,bookId}})
// return res.json(qwe)
//
//
// }


    async getAll(req, res) {
       const user_id = req.query.userId;

        const basket_object = await Basket.findOne({where:{userId: user_id}});

        let BasketDev;

        if (basket_object) {
            BasketDev = await Basket.findAll(
                {
                    where:{userId: user_id },
                    include: {model: books, as: 'book'},
                    attributes: {exclude: ['basketId','id','createdAt','updatedAt', 'userId','bookId']}
                }
                )
        }

        return res.json(BasketDev)
    }
    async getAl(req, res) {
        let {userId, bookId} = req.query

        let BasketD;
            BasketD=await Basket.findAll(
                {
                    where:{userId },

                    attributes: ['bookId','count' ],exclude:["bookId"],

                    include: {model: books, as: 'book'}

            })

            // BasketD = await Basket.findAll(
            //     {
            //         where:{userId: user_id },
            //         //if (bookId='2') {bookId='1127735';},
            //         include: {model: books, as: 'book'},
            //         attributes: {exclude: ['basketId','id','createdAt','updatedAt', 'userId','bookId']}
            //     }
            // )



        return res.json(BasketD)
    }

    async getOne(req, res) {
        const {bookId,userId} = req.query

        const basket_object = await Basket.findOne({where: {userId,bookId}});


        return res.json(basket_object)
    }

    async put(req, res) {
        try{
            const {bookId,userId} = req.query
            const basket =await Basket.findOne(
                {
                    where: {userId,bookId}
                })
            await basket.update({
                count: req.body.count,

            })
            await basket.save()
            res.json(basket)

        }catch (e) {
            res.status(500).json(e)

        }

    };




        async delete(req, res) {
        try {
            let {userId, bookId} = req.body

            await Basket.destroy({
                where: {userId,bookId}
            })

            return res.json({})
        } catch (e) {
            res.status(500).json(e)
        }
    }

}

module.exports = new BasketdevController()
