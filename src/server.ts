import express from "express"
import cors from "cors"
import compression from "compression"
import { ApolloServer } from "apollo-server-express"
import expressPlayground from "graphql-playground-middleware-express";
import schema from "./schemas/index"
import DataBase from "./lib/database"
import environment from "./config/environment"
import { IContext } from "./interfaces/context.interface";

// Configuración de las variables de entorno (lectura)
if (process.env.NODE_ENV !== 'production') {
    environment
}

async function init() {
    const app = express()

    app.use(cors())
    app.use(compression())
    const db = await new DataBase().init()
    
    const context = async({req, connection}: IContext)=>{
        const token = (req) ? req.headers.authorization : connection.authorization
        return  {db, token}
    }

    const server = new ApolloServer({
        schema,
        introspection: true,
        context,
    })

    server.applyMiddleware({ app })

    app.get('/', expressPlayground({
        endpoint: '/graphql'
    }))

    app.listen(process.env.PORT || 3000, () => {
        console.log('server on in port', process.env.PORT)
    })

}

init()
