'use strict'
const Axios = require('axios')
const Env = use('Env')
const Logger = use('Logger')

class PlanetService {
  /** -------------------------------------------------
  * @method _getFilmName
  * ---------------------------------------------------
  * @param {Object} filmList
  * @return {Object}
  */
  static async _getFilmName (filmList) {
    try {
      let filmsNameList = []
      for (let filmUrl of filmList) {
        let filmInfo = await Axios.get(filmUrl)
        if (filmInfo.status === 200) {
          filmsNameList.push(filmInfo.data.title)
        }
      }
      return filmsNameList
    } catch (err) {
      Logger.error('Service PlanetService - _getFilmName', { error: err, date: new Date() })
      return []
    }
  }

  /** -------------------------------------------------
  * @method _getMoviesFromPlanetInSwapiApiByAxios
  * ---------------------------------------------------
  * @param {String} name
  * @param {String} url
  * @return {Object or Null}
  */
  static async _getMoviesFromPlanetInSwapiApiByAxios (name, url) {
    try {
      url = url || Env.get('SWAPI_API_URL', 'https://swapi.co/api/') + 'planets'
      let planetListInfo = await Axios.get(url)
      if (planetListInfo.status === 200) {
        for (let planet of planetListInfo.data.results) {
          if (planet.name.toLowerCase() === name.toLowerCase()) {
            let filmList = await this._getFilmName(planet.films)
            return filmList
          }
        }
        if (planetListInfo.data.next) {
          this._getMoviesFromPlanetInSwapiApiByAxios(name, planetListInfo.data.next)
        } else {
          return null
        }
      } else {
        return null
      }
    } catch (err) {
      Logger.error('Service PlanetService - _getMoviesFromPlanetInSwapiApiByAxios', { error: err, date: new Date() })
    }
  }

  /** -------------------------------------------------
  * @method findFimlsByPlanetName
  * ---------------------------------------------------
  * @param {String} name
  * @return {Object}
  */
  static async findFimlsByPlanetName (name) {
    try {
      let resultToFind = await this._getMoviesFromPlanetInSwapiApiByAxios(name)
      return {
        numberOfFilms: resultToFind ? resultToFind.length : 0,
        films: resultToFind || ''
      }
    } catch (err) {
      Logger.error('Service PlanetService - findFimlsByPlanetName', { error: err, date: new Date() })
      return {
        numberOfFilms: 0,
        films: ''
      }
    }
  }
}
module.exports = PlanetService
