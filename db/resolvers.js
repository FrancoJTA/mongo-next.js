const Usuario = require("../models/Usuario");

const resolvers = {
    Query: {
        obtenerCurso:()=>'Bienvenido Estudiantes de Base de Datos III',
    },

    Mutation: {
        nuevoUsuario:async (_,{input})=>{
            //console.log(input);
            const {email, password} = input;

            const existeUsuario = await Usuario.findOne({email});
            if (existeUsuario) {
                throw new Error('Ya existe')
            }

            try {
                const user = new Usuario(input);
                await user.save();
                return user;
            } catch (error){
                console.log(error)
            }
        }
    }
}

module.exports = resolvers;