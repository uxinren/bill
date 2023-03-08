import { defineComponent, PropType} from "vue";
import s from "./Button.module.scss";


export const Button = defineComponent({
    props:{
        onClick:{
            type: Function as PropType<(e: MouseEvent) => void>
        },
        level:{
            type: String as PropType<'default' | 'primary' | 'success'|'warning'|'danger'>,
            default: 'primary'
        },
        size:{
            type: String as PropType<'small' | 'medium' | 'large'>,
            default: 'medium'
        },
        theme:{
            type: String as PropType<'outline' | 'normal' | 'text'>,
            default: 'normal'
            
        },
        type:{
            type: String as PropType<'button' | 'submit'>,
            default: 'button'
        },
        disabled:{
            type: Boolean,
            default: false
        }
    },
    setup:(props,context)=>{
       return ()=>(
        <button type={props.type} 
            onClick={props.onClick}
            disabled={props.disabled}
            class={[s.button,s[props.level],s[props.theme],s[props.size]]}
            >
            {context.slots.default?.()}
        </button>
       )
    }
})