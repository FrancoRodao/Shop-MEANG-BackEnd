import { IResolvers } from "graphql-tools";
import { DateTimeResolver } from "graphql-scalars";
import query from "./query";
import mutation from "./mutation"

const resolvers: IResolvers = {
    Date: DateTimeResolver,
    ...query,
    ...mutation
}

export default resolvers