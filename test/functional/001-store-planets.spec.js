'use strict'

const { test, trait } = use('Test/Suite')('Post Planets')

trait('Test/ApiClient')

test('Post without param into body - return 400', async ({ client }) => {
  const response = await client.post('/api/planets').end()
  response.assertStatus(400)
})
test('Post without param name into body - return 400', async ({ client }) => {
  const response = await client.post('/api/planets').accept('json').send({ climate: 'test', terrain: 'test' }).end()
  response.assertStatus(400)
  response.assertJSONSubset([{ message: 'Name is required' }])
})
test('Post PlanetTest1 - return 201', async ({ client }) => {
  const response = await client.post('/api/planet').accept('json').send({ name: 'PlanetTest1', climate: 'test', terrain: 'test' }).end()
  response.assertStatus(201)
})
