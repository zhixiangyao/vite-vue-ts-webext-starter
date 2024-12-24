import type { ProtocolMap } from 'webext-bridge'
import { onMessage, sendMessage } from 'webext-bridge/content-script'
import { EnumResponseCode } from '~/enum'

export function useBackgroundFetch() {
  async function post<T extends Record<string, any>>(
    url: string,
    options: Pick<ProtocolMap['event-fetch-send'], 'headers' | 'params'>,
  ) {
    const { promise, resolve, reject } = Promise.withResolvers<T | undefined>()

    sendMessage(
      'event-fetch-send',
      {
        url,
        headers: options.headers,
        params: options.params,
      },
      'background',
    )

    onMessage('event-fetch-on', async ({ data }) => {
      switch (data.code) {
        case EnumResponseCode.Success: {
          resolve(data.response as T)
          break
        }
        case EnumResponseCode.Error: {
          reject()
          break
        }
        case EnumResponseCode.AbortError: {
          reject()
          break
        }
      }
    })

    return promise
  }

  return { post }
}
