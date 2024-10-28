const {ApolloServer} = require('apollo-server');

const conectarDb = require('./config/db');

const typeDefs = require('./db/schemas');

const resolvers = require('./db/resolvers');


// levantamos la base de datos

conectarDb();

//coniguramos el servidor

const servidor = new ApolloServer({
    typeDefs,
    resolvers,
})

//levantamos el servidor

servidor.listen().then(({url})=>{
    console.log(`Base de datos conectaddad en la url: ${url}`)
})
