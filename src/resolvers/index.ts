import { IResolvers } from "graphql-tools";
import { DateTimeResolver } from "graphql-scalars";
import query from "./query/index";
import mutation from "./mutation/index"

const resolvers: IResolvers = {
    Date: DateTimeResolver,
    ...query,
    ...mutation
}

export default resolvers