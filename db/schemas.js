const {gql} = require('apollo-server');

const typeDefs = gql`
    
    type Query {
        obtenerCurso:String
    }
    
    type Usuario {
    
        id: ID
        nombre: String
        apellido: String
        email: String
        created: String
    
    }
    
    input inputUsuario {
    
        nombre: String
        apellido: String
        email: String
        password: String
        
    }
    
    type Mutation {
        
        nuevoUsuario(input:inputUsuario): Usuario
        
    }
    
`;

module.exports = typeDefs;