'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('/planets', 'PlanetController.Index')
  Route.get('/planet/:type/:planet', 'PlanetController.Show')
  Route.post('/planets', 'PlanetController.Store').validator('StorePlanet')
  Route.post('/planet', 'PlanetController.Store').validator('StorePlanet')
  Route.delete('/planet/:type/:planet', 'PlanetController.Delete')
}).prefix('api')
