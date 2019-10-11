'use strict'

class DeletePlanetById {
  get rules () {
    return {
      paramPlanet: 'required'
    }
  }
  get data () {
    const requestBody = this.ctx.request.all()
    const paramPlanet = this.ctx.params.planet
    return Object.assign({}, requestBody, { paramPlanet })
  }
}

module.exports = DeletePlanetById
