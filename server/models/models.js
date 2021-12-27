const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "ADMIN"},
})

const Basket = sequelize. define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},  
})

// const Basketbooks = sequelize.define('basket_books', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// })

const books = sequelize.define('books', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})




const booksInfo = sequelize.define('books_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

books.hasMany(Basket)
Basket.belongsTo(books)

User.hasOne(Basket)
Basket.belongsTo(User)

// Basket.hasMany(books)
// books.belongsTo(Basket)

Type.hasMany(books)
books.belongsTo(Type)

Brand.hasMany(books)
books.belongsTo(Brand)


books.hasMany(booksInfo, {as: 'info'});
booksInfo.belongsTo(books)



module.exports = {
    User,
    Basket,
    books,
    Type,
    Brand,
    booksInfo
}





