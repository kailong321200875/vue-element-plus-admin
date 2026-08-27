import type { MockMethod } from 'vite-plugin-mock'
import analysisMocks from './analysis/index.mock'
import roleMocks from './role/index.mock'
import userMocks from './user/index.mock'

const mockList = [...analysisMocks, ...roleMocks, ...userMocks] as MockMethod[]
const originalFetch = window.fetch.bind(window)

const wait = (timeout = 0, signal?: AbortSignal | null) => {
  if (!timeout) return Promise.resolve()

  return new Promise<void>((resolve, reject) => {
    const abort = () => {
      clearTimeout(timer)
      reject(signal?.reason ?? new DOMException('The request was aborted', 'AbortError'))
    }
    const timer = window.setTimeout(() => {
      signal?.removeEventListener('abort', abort)
      resolve()
    }, timeout)

    if (signal?.aborted) abort()
    else signal?.addEventListener('abort', abort, { once: true })
  })
}

const parseBody = async (request: Request) => {
  if (request.method === 'GET' || request.method === 'HEAD') return {}

  const text = await request.clone().text()
  if (!text) return {}

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

const handleMockRequest = async (request: Request, mock: MockMethod, url: URL) => {
  await wait(mock.timeout, request.signal)

  const query = Object.fromEntries(url.searchParams)
  const body = await parseBody(request)
  const data =
    typeof mock.response === 'function'
      ? mock.response({
          url: { path: url.pathname },
          body,
          query,
          headers: Object.fromEntries(request.headers)
        })
      : mock.response

  return new Response(JSON.stringify(data), {
    status: mock.statusCode ?? 200,
    headers: { 'Content-Type': 'application/json' }
  })
}

export const setupProdMockServer = () => {
  window.fetch = async (input, init) => {
    const request = new Request(input, init)
    const url = new URL(request.url)
    const method = request.method.toLowerCase()
    const mock = mockList.find(
      (item) => item.url === url.pathname && (item.method ?? 'get') === method
    )

    return mock ? handleMockRequest(request, mock, url) : originalFetch(request)
  }
}
