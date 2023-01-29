const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const Emp =require('./empModel.js');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect:dbConfig.dialect,

        pool: {
            max: dbConfig.max,
            min: dbConfig.min
        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected...to..db...')
})
.catch(err => {
    console.log('Error'+err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize=sequelize

db.data = require('./dataModel.js')(sequelize,DataTypes)
db.emps = require('./empModel.js')(sequelize,DataTypes)

db.sequelize                                               
.sync({force: false}) 
.then(() => {
    console.log('yes re-sync done!')
})
.catch((err) => {
    console.log(err);
});

module.exports = db