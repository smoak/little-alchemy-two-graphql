import { GraphQLFieldResolver } from 'graphql';

import { findById as findTeamById } from '../../data/repos/item';

const unbase64 = (i: string) => Buffer.from(i, 'base64').toString('utf8');

interface ResolvedGlobalId {
  readonly type: string;
  readonly id: string;
}
type FromGlobalId = (id: string) => ResolvedGlobalId;
const fromGlobalId: FromGlobalId = id => {
  const unbasedGlobalId = unbase64(id);
  const delimiterPos = unbasedGlobalId.indexOf(':');
  return {
    type: unbasedGlobalId.substring(0, delimiterPos),
    id: unbasedGlobalId.substring(delimiterPos + 1),
  };
};

export interface NodeResolverArgs {
  readonly id: string;
}
export const NodeResolver: GraphQLFieldResolver<unknown, unknown, NodeResolverArgs> = (
  _source,
  args,
  _context,
  _info
) => {
  const { type, id } = fromGlobalId(args.id);
  if (type === 'Item') {
    return findTeamById(id);
  }

  throw new Error(`Type ${type} not supported`);
};
