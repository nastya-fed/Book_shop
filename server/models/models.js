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

const Basketbooks = sequelize.define('basket_books', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const books = sequelize.define('books', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
<<<<<<< HEAD
=======
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
>>>>>>> 5fad94f69f0194390d0de0bd7ef1c05af507a286
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

<<<<<<< HEAD
=======
const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

>>>>>>> 5fad94f69f0194390d0de0bd7ef1c05af507a286
const booksInfo = sequelize.define('books_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.hasOne(Basket)
Basket.belongsTo(User)

<<<<<<< HEAD
=======
User.hasMany(Rating)
Rating.belongsTo(User)

>>>>>>> 5fad94f69f0194390d0de0bd7ef1c05af507a286
Basket.hasMany(Basketbooks)
Basketbooks.belongsTo(Basket)

Type.hasMany(books)
books.belongsTo(Type)

Brand.hasMany(books)
books.belongsTo(Brand)

<<<<<<< HEAD
=======
books.hasMany(Rating)
Rating.belongsTo(books)
>>>>>>> 5fad94f69f0194390d0de0bd7ef1c05af507a286

books.hasMany(Basketbooks)
Basketbooks.belongsTo(books)

books.hasMany(booksInfo, {as: 'info'});
booksInfo.belongsTo(books)

Type.belongsToMany(Brand, {through: TypeBrand })
Brand.belongsToMany(Type, {through: TypeBrand })

module.exports = {
    User,
    Basket,
    Basketbooks,
    books,
    Type,
    Brand,
<<<<<<< HEAD
=======
    Rating,
>>>>>>> 5fad94f69f0194390d0de0bd7ef1c05af507a286
    TypeBrand,
    booksInfo
}




