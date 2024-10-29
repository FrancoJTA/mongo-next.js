const resolvers = {
    Query: {
        obtenerCurso:()=>'Bienvenido Estudiantes de Base de Datos III',
    },

    Mutation: {
        nuevoUsuario:async (_,{input})=>{
            console.log(input);
        }
    }
}

module.exports = resolvers;