import { fromGlobalId, nodeDefinitions } from 'graphql-relay';

import { findById as findItemById } from '../../data/repos/item';

export const { nodeField, nodeInterface } = nodeDefinitions(globalId => {
  const { type, id } = fromGlobalId(globalId);
  if (type === 'Item') {
    return findItemById(id);
  }

  throw new Error(`Unsupported type: ${type}`);
});

// import { NodeResolver, NodeResolverArgs, toGlobalId } from '../resolvers';
// import { Node } from '../types';

// export const nodeInterface = new GraphQLInterfaceType({
//   name: 'Node',
//   description: 'An object with an ID',
//   fields: () => ({
//     id: {
//       type: new GraphQLNonNull(GraphQLID),
//       description: 'The id of the object.',
//     },
//   }),
// });

// type IDFetcher<T extends Node> = (object: T, context: unknown, info: GraphQLResolveInfo) => string;

// interface GlobalIdFieldOptions<T extends Node> {
//   readonly typeName?: string;
//   readonly idFetcher?: IDFetcher<T>;
// }

// type GlobalIdField = <T extends Node>(options?: GlobalIdFieldOptions<T>) => GraphQLFieldConfig<T, unknown>;
// export const globalIdField: GlobalIdField = options => {
//   const { typeName, idFetcher } = options || {};
//   return {
//     description: 'The ID of an object',
//     type: new GraphQLNonNull(GraphQLID),
//     resolve: (obj, _args, context, info) =>
//       toGlobalId(typeName || info.parentType.name, idFetcher ? idFetcher(obj, context, info) : obj.id),
//   };
// };

// export const nodeField: GraphQLFieldConfig<unknown, unknown, NodeResolverArgs> = {
//   description: 'Fetches an object given its ID',
//   type: nodeInterface,
//   resolve: NodeResolver,
//   args: {
//     id: {
//       type: new GraphQLNonNull(GraphQLID),
//       description: 'The ID of an object',
//     },
//   },
// };
