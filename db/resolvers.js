const Usuario = require("../models/Usuario");
const Producto = require('../models/Product');
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
            const usuarioId = await jwt.verify(token, process.env.FIRMA_SECRETA);
            return usuarioId;
        },
        obtenerProducto: async () => {
            try {
                const productos = await Producto.find({});
                return productos;
            } catch (error){
                console.log(error);
            }
        },
        obtenerProductoPorID: async (_, { id })=>{
            //Verificar que el producto existe
            const producto = await Producto.findById(id);
            if(!producto){
                throw new Error(`El producto con ese ID: ${id},  no existe.`);
            }
            return producto;
        }
    },

    Mutation: {
        nuevoUsuario:async (_,{input})=>{
            console.log(input);
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
            return 'Creando Usuario';
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
                token:crearToken(existeUsuario,process.env.FIRMA_SECRETA,'300000')
            }
        },
        nuevoProducto: async (_, { input })=> {
            try {
                const producto = new Producto(input);

                //Grabar en la Base de Datos
                const  resultado = await producto.save();

                return resultado;

            } catch (error) {
                console.log(error);
            }
        },
        actualizarProducto: async (_, { id, input }) => {
            //Verificar que el producto existe
            let producto = await Producto.findById(id);
            if(!producto){
                throw new Error(`El producto con ese ID: ${id},  no existe.`);
            }
            //Guardarlo en la Base de Datos
            producto = await Producto.findOneAndUpdate({_id: id},input,{new: true});

            return producto;
        },
        eliminarProducto: async (_, { id } ) => {
            //Verificar que el producto existe
            let producto = await Producto.findById(id);
            if(!producto){
                throw new Error(`El producto con ese ID: ${id},  no existe.`);
            }
            //Eliminarlo de la Base de Datos
            await  Producto.findOneAndDelete({_id: id});
            return 'Producto Eliminado!!!'
        }
    }
}

module.exports = resolvers;