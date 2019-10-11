'use strict'

/*
|--------------------------------------------------------------------------
| GetSwapiPlanetSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')
const Axios = require('axios')
const Planet = use('App/Models/Planet')
const ModifyStringsHelper = use('App/Helpers/ModifyStrings')
const Env = use('Env')

let counter = 0

class GetSwapiPlanetSeeder {
  /** ----------------------------------
  * @method AxiosGet
  * ------------------------------------
  * @param {String} url
  * @return {Array or Null}
  */
  async AxiosGet (url) {
    try {
      return await Axios.get(url)
    } catch (err) {
      console.log(err)
      return ''
    }
  }

  /** ----------------------------------
  * @method getFilmName
  * ------------------------------------
  * @param {String} url
  * @return {Void}
  */
  async getFilmName (urlList) {
    try {
      let filmsNameList = []
      for (let film of urlList) {
        let filmInfo = await this.AxiosGet(film)
        if (filmInfo.status === 200) {
          filmsNameList.push(filmInfo.data.title)
        }
      }
      return filmsNameList
    } catch (err) {
      console.log(`Error: Houve um erro.\n\nErro: ${err}`)
    }
  }

  /** ----------------------------------
  * @method SavePlanetsIntoDataBase
  * ------------------------------------
  * @param {String} url
  * @return {Void}
  */
  async SavePlanetsIntoDataBase (url) {
    try {
      let planetListInfo = await this.AxiosGet(url)
      if (planetListInfo.status === 200) {
        for (let result of planetListInfo.data.results) {
          let newPlanet = new Planet()
          newPlanet.name = result.name
          newPlanet.slug = ModifyStringsHelper.generateSlug(result.name)
          newPlanet.climate = result.climate
          newPlanet.terrain = result.terrain
          newPlanet.numberOfFilms = result.films.length
          newPlanet.films = result.films.length > 0 ? await this.getFilmName(result.films) : ''
          await newPlanet.save()
          console.log(++counter, result.name, 'Inserido')
        }
        planetListInfo.data.next ? this.SavePlanetsIntoDataBase(planetListInfo.data.next) : console.log('Inserções finalizadas: Ctrl + C')
      } else {
        console.log(`Error: Status HTTP do erro ${planetListInfo.status}, \nURL: ${url}`)
      }
    } catch (err) {
      console.log(`Error: Houve um erro.\n\nErro: ${err}`)
    }
  }

  /** ----------------------------------
  * @method run
  * ------------------------------------
  * @return {Void}
  */
  async run () {
    const SwapiUrl = Env.get('SWAPI_API_URL', 'https://swapi.co/api/') + 'planets'
    await this.SavePlanetsIntoDataBase(SwapiUrl)
  }
}

module.exports = GetSwapiPlanetSeeder
