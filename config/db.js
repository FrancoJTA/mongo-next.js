const {ApolloServer} = require("apollo-server");
const mongoose = require("mongoose");

require("dotenv").config({path:'variables.env'});

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB,{});
        console.log("Connected to DB");
    }catch(err){
        console.error(err);
        console.log('Error al conectar la base de datos');
    }
}

module.exports = conectarDB;