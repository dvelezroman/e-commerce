var db = require('./db.js');
var Sequelize = require('sequelize');

const Reviews = db.define('productosOrden', {    
    comentario: {
        type: Sequelize.TEXT("long"),
        allowNull: false
    },
    rating: {
        type: Sequelize.NUMBER,
        allowNull: false
    }
});

module.exports = Reviews;