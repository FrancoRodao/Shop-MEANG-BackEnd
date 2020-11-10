import { mergeResolvers } from '@graphql-tools/merge';
import registerResolverMutation from './register';

const resolvers = [
    registerResolverMutation
];
  
export default mergeResolvers(resolvers);