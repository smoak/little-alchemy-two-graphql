import { GraphQLFieldResolver } from 'graphql';

import { ItemCombination, findAll, findById } from '../../data/repos/item';
import { Query } from '../types';

export const ItemsResolver: GraphQLFieldResolver<Query, unknown, unknown> = (_source, _args, _context, _info) =>
  findAll();

export const SourceItemCombinationResolver: GraphQLFieldResolver<ItemCombination, unknown, unknown> = (
  parent,
  _args,
  _context,
  _info
) => findById(parent.source);

export const TargetItemCombinationResolver: GraphQLFieldResolver<ItemCombination, unknown, unknown> = (
  parent,
  _args,
  _context,
  _info
) => findById(parent.target);
