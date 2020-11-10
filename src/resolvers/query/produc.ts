import { IResolvers } from "graphql-tools"

const productQueryResolver: IResolvers = {
    Query: {
        products(_, __, ___){
            return true
        }
    }
}

export default productQueryResolver