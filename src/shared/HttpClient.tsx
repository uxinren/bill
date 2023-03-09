import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };
export class HttpClient {
    instance : AxiosInstance
    constructor(baseURL:string){
        this.instance = axios.create({
            baseURL
        })
    }
    //查询
    get<R = unknown>(url:string,query?:Record<string,string>,config?: Omit<AxiosRequestConfig,'params'|'url'|'method'>){
        return this.instance.request<R>({
            ...config,
            url,
            params:query,
            method:'get'
        })
    }
    //创建
    post<R = unknown>(url:string,data?:Record<string,JSONValue>,config?:Omit<AxiosRequestConfig,'data'|'url'|'method'>){
        return this.instance.request<R>({
            ...config,
            url,
            data,
            method:'post'
        })
    }
    //更新
    patch<R = unknown>(url:string,data?:Record<string,JSONValue>,
        config?:Omit<AxiosRequestConfig,'data'|'url'>){
            return this.instance.request<R>({
                ...config,
                url,
                data,
                method:'patch'
            })
        }
    //删除
    delete<R = unknown>(url:string,data?:Record<string,string>,
        config?:Omit<AxiosRequestConfig,'params'>){
            return this.instance.request<R>({
                ...config,
                url,
                data,
                method:'delete'
            })
        }
}

export const defaultHttpClient = new HttpClient('/api/v1')
defaultHttpClient.instance.interceptors.request.use(config => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      config.headers!.Authorization = `Bearer ${jwt}`
    }
    return config
  })
defaultHttpClient.instance.interceptors.response.use(response=>{
    return response
},(error)=>{
    if(error.response){
        const axiosError = error as AxiosError
        if(axiosError.response?.status === 429){
            console.log('请求过于频繁');
        }
    }
        throw error
    })