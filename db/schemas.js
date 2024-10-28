const {gql} = require('apollo-server');

const typeDefs = gql`
    
    type Query {
        obtenerCurso:String
    }
    
`;

module.exports = typeDefs;