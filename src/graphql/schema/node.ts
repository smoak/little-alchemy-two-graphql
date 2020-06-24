import { fromGlobalId, nodeDefinitions } from 'graphql-relay';

import { findById as findItemById } from '../../data/repos/item';

export const { nodeField, nodeInterface } = nodeDefinitions(globalId => {
  const { type, id } = fromGlobalId(globalId);
  if (type === 'Item') {
    return findItemById(id);
  }

  throw new Error(`Unsupported type: ${type}`);
});
