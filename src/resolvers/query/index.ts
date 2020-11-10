import { mergeResolvers } from '@graphql-tools/merge';
import productQueryResolver from './produc';
import usersQueryResolver from './users';

const resolvers = [
    usersQueryResolver,
    productQueryResolver
];
  
export default mergeResolvers(resolvers);
