import assert from 'node:assert/strict'
import { CanceledError } from 'axios'
import { createRequest, type AxiosResponse } from '../src/index'

let receivedHeader: unknown
const client = createRequest({
  axiosConfig: {
    adapter: async (config) => {
      receivedHeader = config.headers.Authorization
      return {
        data: { code: 0, data: 'ok' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      }
    }
  },
  beforeRequest: (config) => ({
    ...config,
    headers: { ...config.headers, Authorization: 'token' }
  }),
  transformResponse: (response: AxiosResponse) => response.data.data
})

assert.equal(await client.get<string>({ url: '/users' }), 'ok')
assert.equal(receivedHeader, 'token')

const businessError = new Error('business failed')
let handledError: unknown
const failingClient = createRequest({
  axiosConfig: {
    adapter: async (config) => ({
      data: { code: 1 },
      status: 200,
      statusText: 'OK',
      headers: {},
      config
    })
  },
  transformResponse: () => {
    throw businessError
  },
  onError: (error) => {
    handledError = error
  }
})

await assert.rejects(failingClient.get({ url: '/failed' }), businessError)
assert.equal(handledError, businessError)

const signals: AbortSignal[] = []
const cancelClient = createRequest({
  axiosConfig: {
    adapter: (config) =>
      new Promise((_resolve, reject) => {
        const signal = config.signal as AbortSignal
        signals.push(signal)
        signal.addEventListener('abort', () => reject(new CanceledError()), { once: true })
      })
  }
})

const first = cancelClient.get({ url: '/slow' })
const second = cancelClient.get({ url: '/slow' })
cancelClient.cancelRequest('/slow')

await assert.rejects(first, { code: 'ERR_CANCELED' })
await assert.rejects(second, { code: 'ERR_CANCELED' })
assert.equal(signals.length, 2)
assert.equal(
  signals.every((signal) => signal.aborted),
  true
)

console.log('✓ covers request hooks, errors and concurrent cancellation')
