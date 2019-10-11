'use strict'

const { test, trait } = use('Test/Suite')('Show Planet')

trait('Test/ApiClient')

test('Show planet by mane PlanetTest1', async ({ client }) => {
  const response = await client.get('/api/planet/name/PLAneTtEst1').accept('json').end()
  response.assertStatus(200)
})
