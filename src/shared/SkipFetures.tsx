import { defineComponent,PropType} from 'vue';
import { RouteLocationRaw, RouterLink } from 'vue-router';
import s from './SkipFetures.module.scss';
export const SkipFetures = defineComponent({
  setup:(props,context)=>{
    const onClick = ()=>{
        localStorage.setItem('skipFeatures','yes')
    }
    return ()=>(
        <span onClick={onClick}>
            <RouterLink to='/start' >跳过</RouterLink>
        </span>
    )
  }
})