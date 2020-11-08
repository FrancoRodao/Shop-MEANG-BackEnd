import jwt from "jsonwebtoken"
import { MESSAGES, SECRET_KEY } from "../config/constants"
import { IJwt } from "../interfaces/jwt.interface"

class Jwt{

    sign(data: IJwt){

        const user = data.user.toObject()

        delete user.password
        delete user.birthday
        delete user.registerDate
        delete user.updatedAt

        return jwt.sign({
            user
        }, SECRET_KEY, {
            expiresIn: 24*60*60 //24 horas
        })
    }

    verify(token: string){
        try {
            return jwt.verify(token, SECRET_KEY)
        } catch (error) {
            return false
        }
    }
}

export default Jwt