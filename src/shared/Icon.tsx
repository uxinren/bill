import s from './Icon.module.scss';
import { defineComponent, PropType} from 'vue';

export type IconName = 'add'|'chart'|'clock'|'cloud'|'logo'|'rainbow'|'save'|'menu'
export const Icon = defineComponent({
    props:{
        name:{
            type: String as PropType<IconName>,
            required: true
        }
    },
    setup:(props,context)=>{
        return ()=>(
            <svg class={s.icon}>
                <use xlinkHref={'#'+props.name}></use>
            </svg>
        )
    }
    })


