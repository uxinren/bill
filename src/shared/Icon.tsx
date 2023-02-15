import s from './Icon.module.scss';
import { defineComponent, PropType} from 'vue';

export const Icon = defineComponent({
    props:{
        name:{
            type: String as PropType<'add'|'chart'|'clock'|'cloud'|'logo'|'rainbow'|'save'>
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


