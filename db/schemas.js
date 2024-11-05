const {gql} = require('apollo-server');

const typeDefs = gql`
    
    type Query {
        ObtenerUsuario(token:String):Usuario
        obtenerProducto: [Producto]
        obtenerProductoPorID (id: ID!): Producto
    }
    
    type Usuario {
    
        id: ID
        nombre: String
        apellido: String
        email: String
        created: String
    
    }
    
    type Token{
        token: String
    }
    
    type Producto {
        id: ID
        nombre: String
        existencia: Int
        precio: Float
        creado: String
    }
    
    input inputUsuario {
    
        nombre: String
        apellido: String
        email: String
        password: String
        
    }
    
    input inputAutenticar{
    
        email: String
        password: String
        
    }
    
    input ProductoInput {
        nombre: String!
        existencia: Int!
        precio: Float!
    }

    
    type Mutation {
        
        nuevoUsuario(input:inputUsuario): Usuario
        autenticarUsuario(input:inputAutenticar): Token 
        nuevoProducto(input: ProductoInput ): Producto
        actualizarProducto(id: ID!, input: ProductoInput): Producto
        eliminarProducto (id: ID!): String

    }
    
`;

module.exports = typeDefs;