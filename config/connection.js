const Sequelize =require('sequelize');
require('dotenv').config();
//create a conncection object
const sequelize = new Sequelize(
    //connecting it to .env for password protection
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {

        //Database location
        host:'localhost',
        dialect:'postgres'
    }
);
module.exports=sequelize;
