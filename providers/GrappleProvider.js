'use strict'

const { ServiceProvider } = use('@adonisjs/fold')

class GrappleProvider extends ServiceProvider {
  boot () {
    if (!(use('Helpers')).isAceCommand()) {
      this._registerAlias()
      this._registerGlobals()
      this._bindDataLoaders()
    }

    const ace = use('@adonisjs/ace')
    ace.addCommand('Grapple/Commands/Make/Schema')
    ace.addCommand('Grapple/Commands/Make/Connection')
    ace.addCommand('Grapple/Commands/Make/Resolver')
    ace.addCommand('Grapple/Commands/Make/Loader')
  }

  register () {
    this._registerCommands()
  }

  _registerGlobals () {
    global.requireGraphQL = use('Grapple/Require/GraphQL')
    global.requireResolver = use('Grapple/Require/Resolver')
    global.requireConnection = use('Grapple/Require/Connection')
    global.requireLoader = use('Grapple/Require/DataLoader')
  }

  _registerAlias () {
    this._registerLoaders()
    this._registerDataLoader()
    this._registerSchema()
    this._registerServer()
  }

  _registerDataLoader() {
    this.app.singleton('Grapple/DataLoader', () => {      
      return new (require('../src/Dataloader'))()
    })
  }

  _registerCommands() {
    this.app.bind('Grapple/Commands/Make/Schema', () => require('../commands/MakeSchema'))
    this.app.bind('Grapple/Commands/Make/Connection', () => require('../commands/MakeConnection'))
    this.app.bind('Grapple/Commands/Make/Resolver', () => require('../commands/MakeResolver'))
    this.app.bind('Grapple/Commands/Make/Loader', () => require('../commands/MakeLoader'))
  }

  _bindDataLoaders() {
    const DataLoader = use('Grapple/DataLoader')
    const { dataLoaders } = use('Grapple/Schema/Setup')

    Object.keys(dataLoaders).forEach((key) => {
      DataLoader.set(key, dataLoaders[key])
    })
  }

  _registerServer() {
    this.app.singleton('Grapple/GraphQLServer', () => {      
      return new (require('../src/Server'))()
    })
  }

  _registerSchema() {
    this.app.singleton('Grapple/Schema/Setup', () => {
      return require('../src/loaders/setup')
    })

    this.app.singleton('Grapple/Schema', () => {
      return (require('../src/loaders/schema'))()
    })
  }

  _registerLoaders() {
    this.app.singleton('Grapple/Require/GraphQL', () => {
      return require('../src/loaders/graphql')
    })

    this.app.singleton('Grapple/Require/Resolver', () => {
      return require('../src/loaders/resolver')
    })

    this.app.singleton('Grapple/Require/Connection', () => {
      return require('../src/loaders/connection')
    })

    this.app.singleton('Grapple/Require/DataLoader', () => {
      return require('../src/loaders/loader')
    })
  }
}

module.exports = GrappleProvider