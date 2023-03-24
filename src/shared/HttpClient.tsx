import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { Toast } from "vant";
import { mockItemSummary, mockSession, mockTagEdit, mockTagIndex } from "../mock/mock";
import { mockItemCreate } from "../mock/mockItemCreate";
import { mockItemIndex, mockItemIndexBalance } from "../mock/mockItemIndex";
import { mockTagShow } from "../mock/mockTagShow";

type GetConfig = Omit<AxiosRequestConfig, "params" | "url" | "method">;
type PostConfig = Omit<AxiosRequestConfig, "url" | "data" | "method">;
type PatchConfig = Omit<AxiosRequestConfig, "url" | "data">;
type DeleteConfig = Omit<AxiosRequestConfig, "params">;

export class HttpClient {
  instance: AxiosInstance;
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });
  }
  //查询
  get<R = unknown>(
    url: string,
    query?: Record<string, JSONValue>,
    config?: GetConfig
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      params: query,
      method: "get",
    });
  }
  //创建
  post<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: PostConfig
  ) {
    return this.instance.request<R>({ ...config, url, data, method: "post" });
  }
  //更新
  patch<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: PatchConfig
  ) {
    return this.instance.request<R>({ ...config, url, data, method: "patch" });
  }
  //删除
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'delete' })
  }
}
//接口联调测试
const mock = (response: AxiosResponse) => {
  if (true ||
    location.hostname !== "localhost" &&
    location.hostname !== "127.0.0.1" &&
    location.hostname !== "172.18.0.2"
  ) {
    return false;
  }
  switch (response.config?._mock) {
    case "tagIndex":
      [response.status, response.data] = mockTagIndex(response.config);
      return true;
    case "session":
      [response.status, response.data] = mockSession(response.config);
      return true;
    case "itemCreate":
      [response.status, response.data] = mockItemCreate(response.config);
      return true;
    case "tagShow":
      [response.status, response.data] = mockTagShow(response.config);
      return true;
    case 'tagEdit':
      [response.status, response.data] = mockTagEdit(response.config)
      return true
    case 'itemIndex':
    [response.status, response.data] = mockItemIndex(response.config)
    return true
    case 'itemIndexBalance':
      [response.status, response.data] = mockItemIndexBalance(response.config)
      return true
      case 'itemSummary':
        [response.status, response.data] = mockItemSummary(response.config)
        return true
  }
  return false;
};

export const defaultHttpClient = new HttpClient("/api/v1");

//请求数据
defaultHttpClient.instance.interceptors.request.use((config) => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    config.headers!.Authorization = `Bearer ${jwt}`;
  }
  if(config._autoLoading === true){
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    });
  }
  return config;
});

defaultHttpClient.instance.interceptors.response.use(
  (response) => {
    mock(response);
    if (response.status >= 400) {
      throw { response };
    } else {
      return response;
    }
  },
  (error) => {
    mock(error.response);
    if (error.response.status >= 400) {
      throw error;
    } else {
      return error.response;
    }
  }
);
defaultHttpClient.instance.interceptors.response.use((response)=>{
  if(response.config._autoLoading === true){
    Toast.clear();
  }
  return response
}, (error: AxiosError)=>{
  if(error.response?.config._autoLoading === true){
    Toast.clear();
  }
  throw error
})

//响应数据
defaultHttpClient.instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 429) {
        console.log("请求过于频繁");
      }
    }
    throw error;
  }
);
