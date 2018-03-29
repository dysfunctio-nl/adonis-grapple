'use strict'

/**
 * adonis-grapple
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const _ = require('lodash')
const Config = use('Config')
const Helpers = use('Helpers')
const path = require('path')
const { Command } = require('@adonisjs/ace')

class SetupStructure extends Command {
  /**
   * Command signature required by ace.
   *
   * @return {string}
   */
  static get signature () {
    return `grapple:setup { -r, --router }`
  }

  /**
   * Command description.
   *
   * @return {string}
   */
  static get description () {
    return 'Setup grapple folder structure'
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
  async handle (args, { router }) {
	// Create folder structure
    const resolversDir = this.ensureDir(path.join(Helpers.appRoot(), Config.get('grapple.resolvers')))
    const typesDir = this.ensureDir(path.join(Helpers.appRoot(), Config.get('grapple.types')))
    const connectionsDir = this.ensureDir(path.join(Helpers.appRoot(), Config.get('grapple.connections')))
    const loadersDir = this.ensureDir(path.join(Helpers.appRoot(), Config.get('grapple.loaders')))
	
    // Recreate the routes file
    if (router) {
      const routerPath = path.join(Helpers.appRoot(), 'start', 'routes.js')

      if (await this.pathExists(routerPath)) {
        await this.removeFile(routerPath)
      }

      const routerStub = await this.readFile(path.join(__dirname, './stubs/routes.stub'), 'utf-8')
      await this.generateFile(routerPath, routerStub)
    }

	  // Create the schema file
    let filePath = path.join(Helpers.appRoot(), Config.get('grapple.schema'))

    if (!filePath.endsWith(".js")) {
      filePath = path.join(filePath, "index.js")
    }

    if (!await this.pathExists(filePath)) {
      const stubPath = path.join(__dirname, './stubs/schema.stub')
      const stub = await this.readFile(stubPath, 'utf-8')

      await this.generateFile(filePath, stub)
    }
	
	// Log success
    console.log(`${this.icon('success')} ${this.chalk.green('setup')} Completed setup successfully.`)
  }
}

module.exports = SetupStructure