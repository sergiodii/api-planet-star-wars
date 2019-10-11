'use strict'

const { test, trait } = use('Test/Suite')('Get Planets')

trait('Test/ApiClient')

test('Get list from planets - return 200', async ({ client }) => {
  let response = await client.get('/api/planets').end()
  response.assertStatus(200)
  response.assertJSONSubset({ page: 1, previous: null })
})
test('Get list from planets with param limit - return 200', async ({ client }) => {
  let response = await client.get('/api/planets?limit=30').end()
  response.assertStatus(200)
  response.assertJSONSubset({ page: 1, limit: 30 })
})
test('Get list from planets with params limit and page - return 200', async ({ client }) => {
  let response = await client.get('/api/planets?limit=30&page=1').end()
  response.assertStatus(200)
  response.assertJSONSubset({ page: 1, limit: 30 })
})
test('Get list from planet with wrong param (page String) - return 400', async ({ client }) => {
  let response = await client.get('/api/planets?page=asdfdssdf').end()
  response.assertStatus(400)
  response.assertJSONSubset({ message: 'Bad Request' })
})
test('Get list from planet with wrong param (limit String) - return 400', async ({ client }) => {
  let response = await client.get('/api/planets?limit=asdfadasdsadasdadssdf').end()
  response.assertStatus(400)
  response.assertJSONSubset({ message: 'Bad Request' })
})
