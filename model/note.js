// 操作数据库
var Sequelize = require('sequelize')
var path = require('path')

var sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database/database.sqlite')
});

var Note = sequelize.define('note', {
    text: {
        type: Sequelize.STRING
    },
    userID: {
        type: Sequelize.STRING
    }
})

// Note.sync({ force: true })

module.exports.Note = Note