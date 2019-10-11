'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlanetSchema extends Schema {
  up () {
    this.create('planets', (collection) => {
      collection.index('name_index', { name: 1 }, { unique: true })
      collection.index('slug_index', { slug: 1 }, { unique: true })
    })
  }

  down () {
    this.drop('planets')
  }
}

module.exports = PlanetSchema
