
# Adonis Grapple

  

Grapple is an addon for [Adonis](http://adonisjs.com/) that wraps around [apollo-server-adonis](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-adonis) with a some extra bells and whistles. It is also heavily inspired by [adonis-graphql](https://github.com/RomainLanz/adonis-graphql)

## Contents
* [Main Features](#mainfeatures)
* [Setup](#setup)
	* [Install](#install)
	* [Provider](#provider)
	* [Dependencies](#dependencies)
	* [Config](#config)
* [Usage](#usage)
	* [Getting Started](#gettingstarted)
	* [Routing](#routing)
	* [Helpers](#helpers)
	* [DataLoaders](#dataloaders)
* [Commands](#commands)
	* [Schemas](#schemas)
	* [Connections](#connections)
	* [Resolvers](#resolvers)
	* [DataLoaders](#dataloaders)
  

## Main Features
* GraphQL Server
* Schema stitching
* Dataloader
* Helpers
* Commands for generating boiler plate

## Setup
### Install
`npm install --save adonis-grapple`

----------

### Provider
Like any other provider, you need to register the provider inside `start/app.js` file.

```js
const providers = [
	'adonis-grapple/providers/GrappleProvider'
]
```

----------

### Dependencies
This module has dependencies on `@adonisjs/bodyparser`.

----------

### Config
The configuration is saved inside `config/grapple.js` file. Tweak it accordingly.

```js
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
```

## Usage

### Getting Started

Start by creating your schema, resolver and dataloader files, you can do this using [commands](#commands) or create them yourself (see command section for examples)

Once you have your files ready to go, you have to register them through `app/graphql/index.js` (can be changed in config under `schema`)

(uses [Merge GraphQL Schemas](https://github.com/okgrow/merge-graphql-schemas) for stitching, see for more docs on schemas and resolvers.)

##### Example:

```js
exports.types = [
    requireGraphQL('user.type')
]

exports.resolvers = [
    requireResolver('user.resolver')
]

exports.dataLoaders = {
    userLoader: requireLoader('user.loader')
}
````

### Routing

To actually setup your server routers, open `start/routers.php` and use something similar to the following:

(uses [apollo-server-adonis](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-adonis), see for more docs)

##### GraphQL:
```js
const Route = use('Route')
const GraphQLServer = use('Grapple/GraphQLServer')

// GraphQL Endpoint
Route.route('/graphql', (context) => {
  return GraphQLServer.handle(context, {
    // OPTIONS
  })
}, ['GET', 'POST'])
```

##### GraphiQL:
`npm i --save-dev apollo-server-module-graphiql`

(see [here](https://www.apollographql.com/docs/apollo-server/graphiql.html) for docs on options)

```js
const Env = use('Env')
const GraphiQL = require('apollo-server-module-graphiql')

// GraphiQL Endpoint
if (Env.get('NODE_ENV') === 'development') {
  Route.get('/graphiql', ({ request, response }) => {
    const options = {
      endpointURL: '/graphql',
    }

    return GraphiQL.resolveGraphiQLString(request.originalUrl(), options, request).then(graphiqlString => {
      response.header('Content-Type', 'text/html').send(graphiqlString)
    }, error => response.send(error))
  })
}
```

### Helpers
```js
requireGraphQL('user.type') // Imports user.type.graphql from `schema` Folder
requireGraphQL('connections/user.connection') // Imports user.connection.graphql from `schema/connections` folder
requireResolver('user.resolver') // Imports user.resolver.js from `resolvers` folder
requireLoader('user.loader') // Imports user.loader from `dataloaders` folder
```

### DataLoaders

See [DataLoader](https://github.com/facebook/dataloader) for docs.

##### Example:
```js
const User = use('App/Models/User')
const _ = require('lodash')

module.exports = async (keys) => {
    const users = await User.query().whereIn('id', keys).fetch()
    const grouped = _.groupBy(users.rows, 'id')

    return keys.map(k => grouped[k] || [])
}
```

##### Usage:
```js
const DataLoader = use('Grapple/DataLoader')
const userLoader = DataLoader.get('userLoader')
return userLoader.load(1).then(...)
```


## Commands

### Schemas
Create a boilerplate schema file 

##### Usage:

`adonis grapple:schema User`

##### Example:

```graphql
# app/graphql/schema/user.type.graphql
type User {

}

type Query {

}

type Mutation {

}
```


### Connections
Create a boilerplate connection file 

##### Usage:

`adonis grapple:connection User`

##### Example:

```graphql
# app/graphql/schema/connections/user.connection.graphql
type UserConnection {
    edges: [UserEdge]
    pageInfo: PageInfo!
}

type UserEdge {
    cursor: String!
    node: User!
}
```


### Resolvers
Create a boilerplate resolver file 

##### Usage:

`adonis grapple:resolver User`

##### Example:

```graphql
// app/graphql/resolvers/user.resolver.js
'use strict'

module.exports = {
  Query: {
    //
  },

  Mutation: {
    //
  },
}
```


### DataLoaders
Create a boilerplate dataloader file 

##### Usage:

`adonis grapple:resolver User`

##### Example:

```graphql
// app/graphql/dataloaders/user.loader.js
'use strict'

module.exports = async (keys) => {
    
}
```