import { AxiosResponse } from "axios";
import { onMounted, ref } from "vue";
import { defaultHttpClient } from "./HttpClient";

type Fetcher =(page:number)=> Promise<AxiosResponse<Resources<Tag>>>
export const useTags = (fetcher: Fetcher)=>{
     //初始化类型、是否更多、当前页
     const hasMore = ref(false);
     const tags = ref<Tag[]>([]);
     const page = ref(0);
     //封装变量
     const fetchTags = async ()=>{
        const response = await fetcher(page.value)
       const { resources, pager } = response.data;
       tags.value.push(...resources)
       hasMore.value =(pager.page - 1) * pager.per_page + resources.length < pager.count;
       page.value += 1   
     }
     onMounted(fetchTags)
     return {hasMore,tags,page,fetchTags}
}