'use strict'
const Planet = use('App/Models/Planet')
const Env = use('Env')
const Logger = use('Logger')
const PlanetService = use('App/Services/PlanetService')
const ModifyStringsHelper = use('App/Helpers/ModifyStrings')

class PlanetController {
  /** ----------------------------------
  * @method Index
  * ------------------------------------
  * @param {Object} ctx
  */
  async Index ({ request, response }) {
    try {
      let { page, limit } = request.all()
      let limitToSend = limit ? parseInt(limit) : 5
      let skip = page ? (parseInt(page) - 1) * limitToSend : 0
      if (isNaN(skip) || isNaN(limitToSend) || parseInt(limit) < 1 || parseInt(page) < 1) {
        return response.status(400).json({ message: 'Bad Request' })
      }
      let resulFromSearch = await Planet.limit(limitToSend).skip(skip).fetch()
      if (!(resulFromSearch.toJSON()).length) {
        return response.status(200).json({
          page: parseInt(page),
          total: await Planet.count(),
          message: 'No results',
          next: null,
          previous: null,
          results: []
        })
      }
      page = page || 1
      return response.status(200).json({
        page: parseInt(page),
        total: await Planet.count(),
        limit: limitToSend,
        next: ((await Planet.limit(limitToSend).skip(parseInt(page) * limitToSend).fetch()).toJSON()).length ? `${Env.get('APP_URL', 'localhost')}${request.url()}?page=${page ? parseInt(page) + 1 : 2}${limit ? '&limit=' + limit : ''}` : null,
        previous: page < 2 ? null : ((await Planet.limit(limitToSend).skip(parseInt(page - 2) * limitToSend).fetch()).toJSON()).length > 1 ? `${Env.get('APP_URL', 'localhost')}${request.url()}?page=${parseInt(page) - 1}${limit ? '&limit=' + limit : ''}` : null,
        results: resulFromSearch
      })
    } catch (err) {
      Logger.error('Controller PlanetController - Index', { error: err, date: new Date() })
      return response.status(500).json('Sorry. There was an error on the server')
    }
  }

  /** ----------------------------------
  * @method Store
  * ------------------------------------
  * @param {Object} ctx
  */
  async Store ({ request, response }) {
    try {
      let { name, climate, terrain } = request.all()
      let findSlugByName = (await Planet.where('slug', ModifyStringsHelper.generateSlug(name)).fetch()).toJSON()
      if (findSlugByName.length) {
        return response.status(400).json([{ 'message': 'Name is registered', 'field': 'name', 'validation': 'unique' }])
      }
      let filmNameFromThisPlanetList = await PlanetService.findFimlsByPlanetName(name)
      let newPlanet = new Planet()
      newPlanet.name = name
      newPlanet.slug = ModifyStringsHelper.generateSlug(name)
      newPlanet.climate = climate
      newPlanet.terrain = terrain
      newPlanet.numberOfFilms = filmNameFromThisPlanetList.numberOfFilms
      newPlanet.films = filmNameFromThisPlanetList.films
      await newPlanet.save()
      return response.status(201).json(newPlanet)
    } catch (err) {
      Logger.error('Controller PlanetController - Store', { error: err, date: new Date() })
      return response.status(500).json('Sorry. There was an error on the server')
    }
  }

  /** ----------------------------------
  * @method Show
  * ------------------------------------
  * @param {Object} ctx
  */
  async Show ({ params, request, response }) {
    try {
      if (params.type === 'name' || params.type === 'id') {
        const planetInfo = (await Planet.where(params.type === 'id' ? '_id' : 'slug', params.type === 'name' ? ModifyStringsHelper.generateSlug(params.planet) : params.planet).fetch()).toJSON()
        if (planetInfo.length) return response.status(200).json(planetInfo)
        return response.status(400).json({ message: `Planet ${params.type} ${ModifyStringsHelper.removeQueryString(params.planet)} not found` })
      }
      return response.status(404).json({ message: `Ops... Url ${request.url()} not found` })
    } catch (err) {
      Logger.error('Controller PlanetController - Show', { error: err, date: new Date() })
      return response.status(500).json('Sorry. There was an error on the server')
    }
  }

  /** ----------------------------------
  * @method Delete
  * ------------------------------------
  * @param {Object} ctx
  */
  async Delete ({ request, response, params }) {
    try {
      if (params.type === 'id' || params.type === 'name') {
        let planetInfo = await Planet.where(params.type === 'id' ? '_id' : 'slug', params.type === 'name' ? ModifyStringsHelper.generateSlug(params.planet) : params.planet).delete()
        if (planetInfo.result.n === 1) return response.status(200).json({ message: `Planet ${params.type} ${ModifyStringsHelper.removeQueryString(params.planet)} was deleted` })
        return response.status(400).json({ message: `Planet ${params.type} ${ModifyStringsHelper.removeQueryString(params.planet)} not found` })
      }
      return response.status(404).json({ message: `Ops... Url ${request.url()} not found` })
    } catch (err) {
      Logger.error('Controller PlanetController - Delete', { error: err, date: new Date() })
      return response.status(500).json('Sorry. There was an error on the server')
    }
  }
}

module.exports = PlanetController
