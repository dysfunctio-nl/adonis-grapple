'use strict'

var Loader = require('dataloader')

class Dataloader {
  constructor() {
    this._dataLoaders = {}
  }

  has(key) {
    return this._dataLoaders.hasOwnProperty(key)
  }

  get(key) {
    if (this.has(key)) {
      return this._dataLoaders[key]
    }

    throw Error(`Dataloader ${key} does not exist`)
  }

  set(key, dataLoader) {
    this._dataLoaders[key] = new Loader(keys => dataLoader(keys))
  }

  unset(key) {
    if (this.has(key)) {
      delete this._dataLoaders[key]
      return true
    }

    return false
  }
}

module.exports = Dataloader