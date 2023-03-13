/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
//告诉Ts,vue是个组件
type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>
type Mock = (config: AxiosRequestConfig) => [number, any]

type Tag = {
  id: number,
  user_id: number,
  name: string,
  sign: string,
  kind: expenses | income
}