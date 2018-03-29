'use strict'

/**
 * adonis-grapple
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const _ = require('lodash')
const Config = use('Config')
const path = require('path')
const { Command } = require('@adonisjs/ace')

class MakeSchema extends Command {
  /**
   * Command signature required by ace.
   *
   * @return {string}
   */
  static get signature () {
    return `grapple:schema { name: Name of the schema } 
    { -r, --resolver : Create a resolver } 
    { -d, --dataloader : Create a dataloader } 
    { -c, --connection : Create a connection }`
  }

  /**
   * Command description.
   *
   * @return {string}
   */
  static get description () {
    return 'Make a new GraphQL Schema'
  }

  /**
   * Method called when command is executed. This method will
   * require all files from the migrations directory
   * and execute all pending schema files.
   *
   * @param  {object}   args
   *
   * @return {void}
   */
  async handle ({ name }, { resolver, dataloader, connection }) {
    const camelName = _.camelCase(name)
    const stubPath = path.join(__dirname, './stubs/type.stub')
    const typesLocation = Config.get('grapple.types')
    const filePath = path.join(typesLocation, camelName) + '.type.graphql'
    const stub = await this.readFile(stubPath, 'utf-8')
    name = _.upperFirst(camelName)

    await this.generateFile(filePath, stub, { name })

    const createdFile = `${typesLocation}/${camelName}.type.graphql`

    console.log(`${this.icon('success')} ${this.chalk.green('create')}  ${createdFile}`)

    const ace = require('@adonisjs/ace')

    if (resolver) {
      await ace.call('grapple:resolver', {name})
    }

    if (dataloader) {
      await ace.call('grapple:loader', {name})
    }

    if (connection) {
      await ace.call('grapple:connection', {name})
    }
  }
}

module.exports = MakeSchema