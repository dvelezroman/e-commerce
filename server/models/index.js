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

Producto.belongsToMany(Categoria, {through: 'productoCategoria'});
Categoria.belongsToMany(Producto, {through: 'productoCategoria'});

Producto.belongsToMany(Carrito, {through: 'productoCarrito'});
Carrito.belongsToMany(Producto, {through: 'productoCarrito'});

Producto.hasMany(Imagen);

Producto.hasMany(Reviews);

Users.hasMany(Reviews);

Carrito.belongsTo(Users);

Ordenes.hasMany(Estado);

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