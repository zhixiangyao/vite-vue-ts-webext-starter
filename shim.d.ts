import 'webext-bridge'

declare module 'webext-bridge' {
  export interface ProtocolMap {
    // define message protocol types
    // see https://github.com/antfu/webext-bridge#type-safe-protocols
    'event-activity': { show: boolean }
    'event-fetch-send': { url: string, headers?: Record<string, string>, params?: Record<string, any> }
    'event-fetch-on': { code: number, response?: unknown }
  }
}
