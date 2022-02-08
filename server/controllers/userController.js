const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket,Basketbooks, books, booksInfo} = require('../models/models')
const uuid = require("uuid");
const path = require("path");

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const idd=user.id
        const rol=user.role;
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({idd,rol,token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const idd=user.id
        const rol=user.role;
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({idd,rol,token})
    }



    async check(req, res, next) {
        const idd=req.user.id

        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({idd,token})
    }
}

module.exports = new UserController()
