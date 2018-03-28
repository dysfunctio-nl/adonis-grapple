'use strict'

module.exports = {
	// Resolvers directory
  'resolvers': 'app/GraphQL/Resolvers',

  // Schma types directory
  'types': 'app/GraphQL/Schema',

  // Connections directory
  'connections': 'app/GraphQL/Schema/connections',

  // DataLoaders folder
  'loaders': 'app/GraphQL/DataLoaders',

  // Schema stitching file
  'schema': 'app/GraphQL',

  // Only use if you have defined the same type multiple times in
  // different files and wish to attempt merging them together.
  'merge': false
}