import { defineComponent, PropType} from 'vue';
import { Icon,IconName } from './Icon';
import s from './FloatButton.module.scss';
export const FloatButton = defineComponent({
    props:{
        IconName:{
            type: String as PropType<IconName>,
            required: true
        }
    },
    setup:(props,context)=>{
        return ()=>(
            <div class={s.floatButton}>
               <Icon name={props.IconName} class={s.icon}></Icon>
            </div>
        )
    }
})
