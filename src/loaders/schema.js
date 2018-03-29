'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas')
const { types, resolvers } = use('Grapple/Schema/Setup')
const Config = use('Config')

module.exports = () => {
  const typeDefs = (types === undefined || types.length == 0) ? ["type Query { missingSchema: Int }"] : types

  return makeExecutableSchema({
    typeDefs: mergeTypes(
      typeDefs, 
      { all: Config.get('grapple.merge') }
    ),
    
    resolvers: mergeResolvers(resolvers)
  })
}