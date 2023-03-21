import { AxiosResponse } from "axios";
import { defaultHttpClient } from "./HttpClient";

export let mePromise: Promise<AxiosResponse<Resource<User>>> | undefined

//每个路由都做登录检查
export const refreshMe = () => {
  mePromise = defaultHttpClient.get<Resource<User>>('/me')
  return mePromise
}

export const fetchMe = refreshMe