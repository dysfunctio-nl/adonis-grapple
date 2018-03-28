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

class MakeLoader extends Command {
  /**
   * Command signature required by ace.
   *
   * @return {string}
   */
  static get signature () {
    return `grapple:loader { name: Name of loader }`
  }

  /**
   * Command description.
   *
   * @return {string}
   */
  static get description () {
    return 'Make a new DataLoader'
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
    const stubPath = path.join(__dirname, './stubs/loader.stub')
    const loadersLocation = Config.get('grapple.loaders')
    const filePath = path.join(loadersLocation, camelName) + '.loader.js'
    const stub = await this.readFile(stubPath, 'utf-8')
    name = _.upperFirst(camelName)

    await this.generateFile(filePath, stub, { name })

    const createdFile = `${loadersLocation}/${camelName}.loader.js`

    console.log(`${this.icon('success')} ${this.chalk.green('create')}  ${createdFile}`)
  }
}

module.exports = MakeLoader