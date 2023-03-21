import { faker } from "@faker-js/faker";

faker.setLocale("zh_CN");

//登录联调
export { mockSession} from "./mockSession";
//标签页联调
export { mockTagIndex} from "./mockTag";
//创建标签页
export { mockItemCreate} from "./mockItemCreate";
//编辑标签页
export { mockTagShow} from "./mockTagShow";


