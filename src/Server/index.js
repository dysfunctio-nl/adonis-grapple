'use strict'

const { graphqlAdonis } = require('apollo-server-adonis')
const Env = use('Env')
const schema = use('Grapple/Schema')

class Grapple {
  constructor() {
    this._schema = schema
  }

  _handleError(error) {
    let response = {
      message: error.message,
    }

    if (Env.get('NODE_ENV' === 'development')) {
      reponse.locations = error.locations
      response.path = error.path
    }

    return response;
  }

  handle(context, options = {}) {
    return graphqlAdonis({
      context,
      schema: this._schema,
      formatError: this._handleError,
      ...options,
    })(context)
  }
}

module.exports = Grapple