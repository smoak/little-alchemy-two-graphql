import { GraphQLFieldConfig, GraphQLID, GraphQLInterfaceType, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';

import { NodeResolver, NodeResolverArgs } from '../resolvers';
import { Node } from '../types';

export const nodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  description: 'An object with an ID',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the object.',
    },
  }),
});

type Base64 = (i: string) => string;
const base64: Base64 = i => Buffer.from(i, 'utf8').toString('base64');

type ToGlobalId = (type: string, id: string) => string;
const toGlobalId: ToGlobalId = (type, id) => base64([type, id].join(':'));

export type IDFetcher<T extends Node> = (object: T, context: unknown, info: GraphQLResolveInfo) => string;

interface GlobalIdFieldOptions<T extends Node> {
  readonly typeName?: string;
  readonly idFetcher?: IDFetcher<T>;
}
type GlobalIdField = <T extends Node>(options?: GlobalIdFieldOptions<T>) => GraphQLFieldConfig<T, unknown>;
export const globalIdField: GlobalIdField = options => {
  const { typeName, idFetcher } = options || {};
  return {
    description: 'The ID of an object',
    type: new GraphQLNonNull(GraphQLID),
    resolve: (obj, _args, context, info) =>
      toGlobalId(typeName || info.parentType.name, idFetcher ? idFetcher(obj, context, info) : obj.id),
  };
};

export const nodeField: GraphQLFieldConfig<unknown, unknown, NodeResolverArgs> = {
  description: 'Fetches an object given its ID',
  type: nodeInterface,
  resolve: NodeResolver,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The ID of an object',
    },
  },
};
