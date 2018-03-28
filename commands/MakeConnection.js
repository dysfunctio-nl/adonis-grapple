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

class MakeConnection extends Command {
  /**
   * Command signature required by ace.
   *
   * @return {string}
   */
  static get signature () {
    return `grapple:connection { name: Name of type to make the connection for }`
  }

  /**
   * Command description.
   *
   * @return {string}
   */
  static get description () {
    return 'Make a new GraphQL Connection'
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
  async handle ({ name }) {
    const camelName = _.camelCase(name)
    const stubPath = path.join(__dirname, './stubs/connection.stub')
    const connectionsLocation = Config.get('grapple.connections')
    const filePath = path.join(connectionsLocation, camelName) + '.connection.graphql'
    const stub = await this.readFile(stubPath, 'utf-8')
    name = _.upperFirst(camelName)

    await this.generateFile(filePath, stub, { name })

    const createdFile = `${connectionsLocation}/${camelName}.connection.graphql`

    console.log(`${this.icon('success')} ${this.chalk.green('create')}  ${createdFile}`)
  }
}

module.exports = MakeConnection