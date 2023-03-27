import { routes } from './config/routes';
import { createApp } from 'vue'
import { App } from './App'
import { createRouter } from 'vue-router'
import { history } from './shared/history';
import { createPinia, storeToRefs } from 'pinia';
import { useMeStore } from './stores/useMeStore';
import '@svgstore';

const router = createRouter({ history, routes })
const whiteList:Record<string,'exact'|'startsWith'> = {
    '/':'exact',
    '/items':'exact',
    '/welcome':'startsWith',
    '/sign_in':'startsWith'
}



const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')

const meStore = useMeStore()
const {mePromise} = storeToRefs(meStore)
meStore.fetchMe()
router.beforeEach((to,from)=>{
    //遍历白名单，如果在白名单中，直接返回true
    for(const key in whiteList){
        if(whiteList[key] === 'exact' && to.path === key){
            return true
        }else if(whiteList[key] === 'startsWith' && to.path.startsWith(key)){
            return true
        }
    }
        return mePromise!.value!.then(
            ()=>true,
            ()=> '/sign_in?return_to=' + to.path
        )
})