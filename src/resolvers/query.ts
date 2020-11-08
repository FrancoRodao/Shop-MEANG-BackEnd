import { IResolvers } from "graphql-tools";
import { MESSAGES } from "../config/constants";
import Jwt from "../lib/jwt";
import User from "../schemas/models/user.model";

const queryResolver: IResolvers = {
    Query: {
        async users(root, args, context, info) {
            try {

                return {
                    status: true,
                    message: "Lista de usuarios cargada correctamente",
                    users: await User.find()
                }

            } catch (error) {
                return {
                    status: false,
                    message: "Error al cargar los usuarios",
                    users: []
                }
            }
        },

        async login(_, {email, password}, __, ___){
            try {
                const user = await User.findOne({email})
                if(!user){
                    return  {
                        status: false,
                        message: "Usuario invalido, revisa tus credenciales",
                        token: null
                    }
                }

                //compare encrypted password with password input
                const comparePasswords = await user.comparePasswords(password, user.password)
                if(!comparePasswords){
                    return {
                        status: false,
                        message: "Usuario invalido, revisa tus credenciales",
                        token: null
                    }
                }
                
                const token = new Jwt().sign({user})
                return {
                    status: true,
                    message: "Logeado correctamente",
                    token
                }

            } catch (error) {
                return {
                    status: false,
                    message: "Error al cargar el usuario, comprueba los campos",
                    token: null
                }
            }
        },

        me(_, __, {token}){

            let payload = new Jwt().verify(token)
            //invalid token
            if(payload === false){
                return {
                    status: false,
                    message: MESSAGES.TOKEN_VERIFICATION_INVALID,
                    user: null
                }
            }
            return {
                status: true,
                message: "Usuario autenticado",
                user: Object.values(payload)[0]
            }
        }

    }
}

export default queryResolver