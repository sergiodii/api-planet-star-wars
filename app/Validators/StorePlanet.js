'use strict'

class StorePlanet {
  get rules () {
    return {
      name: 'required|unique:planets|string|min:3',
      climate: 'required|string',
      terrain: 'required|string'
    }
  }

  get messages () {
    return {
      'name.required': 'Name is required',
      'name.unique': 'Name is registered',
      'name.min': 'Name must be at least 3 characters',
      'climate.required': 'Climate is required',
      'terrain.required': 'Terrain is required'
    }
  }
}

module.exports = StorePlanet
