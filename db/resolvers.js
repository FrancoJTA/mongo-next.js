const Usuario = require("../models/Usuario");
const bcrypt = require('bcryptjs');

require("dotenv").config({path:'variables.env'});
const jwt = require("jsonwebtoken");

const crearToken = (usuario,palabrasecreta,expiresIn) => {
    const {id,nombre,apellido,email,created} = usuario;
    return jwt.sign({id,nombre,apellido,email,created},palabrasecreta,{expiresIn});
}

const resolvers = {
    Query: {
        ObtenerUsuario: async (_,{token})=>{
            return  jwt.verify(token,process.env.FIRMA_SECRETA);
        }
    },

    Mutation: {
        nuevoUsuario:async (_,{input})=>{
            //console.log(input);
            const {email, password} = input;

            const existeUsuario = await Usuario.findOne({email});
            if (existeUsuario) {
                throw new Error('Ya existe')
            }

            const salt = await bcrypt.genSalt(10);
            input.password = await bcrypt.hash(password, salt);

            try {
                const user = new Usuario(input);
                await user.save();
                return user;
            } catch (error){
                console.log(error)
            }

        },
        autenticarUsuario:async (_,{input})=>{
            const {email, password} = input;
            const existeUsuario = await Usuario.findOne({email});
            if (!existeUsuario) {
                throw new Error("No existe")
            }
            const passwordCorrecto = await bcrypt.compare(password, existeUsuario.password);
            if (!passwordCorrecto) {
                throw new Error("incorrect password")
            }

            return {
                token:crearToken(existeUsuario,process.env.FIRMA_SECRETA,'3600000')
            }
        }
    }
}

module.exports = resolvers;