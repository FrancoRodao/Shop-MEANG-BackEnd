import { IResolvers } from "graphql-tools";
import User from "../../schemas/models/user.model";
import bcrypt from "bcrypt";

const registerResolverMutation: IResolvers = {
     Mutation: {
        async register(_, {user}, context){
            try {
                const existUser = await User.findOne({email: user.email})
                if(existUser){
                    return {
                        status: false,
                        message: 'El correo ya esta registrado',
                    }
                }
                
                user.password = await bcrypt.hash(user.password,10)
                const newUser = await User.create(user)
                return {
                    status: true,
                    message: 'Usuario registrado',
                    user: newUser
                }
                
            } catch (error) {
                console.log(error)
                return {
                    status: false,
                    message: 'Ocurrio un error inesperado',
                }
            }
            
        }
     }
}

export default registerResolverMutation