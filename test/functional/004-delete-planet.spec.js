'use strict'

const { test, trait } = use('Test/Suite')('Delete Planets')

trait('Test/ApiClient')

test('Delete planet by name - return 200', async ({ client }) => {
  const response = await client.delete('/api/planet/name/PlanetTest1').end()
  response.assertStatus(200)
})

test('Delete wrong planet by name - return 400', async ({ client }) => {
  const response = await client.delete('/api/planet/name/planet+inexistent').end()
  response.assertStatus(400)
})
