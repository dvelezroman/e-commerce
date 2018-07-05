const Sequelize = require('sequelize');
const Carrito = require('./carrito');
const Categoria = require('./categoria');
const Estado = require('./estado');
const Imagen = require('./imagen');
const Ordenes = require('./ordenes');
const Producto = require('./producto');
const ProductosOrden = require('./productosOrden');
const Reviews = require('./reviews');
const Users = require('./users');

Producto.belongsToMany(Categoria, {as: 'Category', through: 'productoCategoria'});
Categoria.belongsToMany(Producto, {as: 'Category', through: 'productoCategoria'});

Producto.belongsToMany(Users, {as: 'prodcarrito', through: Carrito }); // crea la tabla Carrito (producto.Id, user.Id, cantidad)
Users.belongsToMany(Producto, {as: 'usercarrito', through: Carrito });

Producto.hasMany(Imagen);

Reviews.belongsTo(Producto, {as: "producto"});

Reviews.belongsTo(Users, {as: "usuario"});

Ordenes.belongsTo(Users, {as: "usuario"});

Ordenes.belongsTo(Estado, {as: "status"});

Ordenes.hasMany(ProductosOrden);

module.exports = {
    Carrito,
    Categoria,
    Estado,
    Imagen,
    Ordenes,
    Producto,
    ProductosOrden,
    Reviews,
    Users
}
