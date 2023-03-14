import { AxiosResponse } from "axios";
import { defaultHttpClient } from "./HttpClient";

export let mePromise: Promise<AxiosResponse<{
  resource: {
    id: number;
  };
}>> | undefined

//每个路由都做登录检查
export const refreshMe = () => {
  mePromise = defaultHttpClient.get<{ resource: { id: number } }>('/me')
  return mePromise
}

export const fetchMe = refreshMe