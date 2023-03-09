import { AxiosResponse } from "axios";
import { defaultHttpClient } from "./HttpClient";

export let mePromise: Promise<AxiosResponse<{
  resource: {
    id: number;
  };
}>> | undefined

export const refreshMe = () => {
  mePromise = defaultHttpClient.get<{ resource: { id: number } }>('/me')
  return mePromise
}

export const fetchMe = refreshMe