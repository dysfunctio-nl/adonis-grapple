'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas')
const { types, resolvers } = use('Grapple/Schema/Setup')
const Config = use('Config')

module.exports = () => {
  const typeDefs = (types === undefined || types.length == 0) ? { Query: {} } : types

  return makeExecutableSchema({
    typeDefs: mergeTypes(
      (types === undefined || types.length == 0) ? { Query: {} } : types, 
      { all: Config.get('grapple.merge') }
    ),
    
    resolvers: mergeResolvers(resolvers)
  })
}