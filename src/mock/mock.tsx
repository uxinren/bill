import { faker } from "@faker-js/faker";
import { AxiosRequestConfig } from "axios";

type Mock = (config: AxiosRequestConfig) => [number, any];

faker.setLocale("zh_CN");

//登录联调
export { mockSession} from "./mockSession";
//标签页联调
export { mockTagIndex} from "./mockTag";


