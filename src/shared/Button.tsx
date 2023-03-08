import { computed, defineComponent, PropType, ref} from "vue";
import s from "./Button.module.scss";


export const Button = defineComponent({
    props:{
        onClick:{
            type: Function as PropType<() => void>
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
        },
        autoSelfDisabled: {
            type: Boolean,
            default: false,
          },
    },
    setup:(props,context)=>{
        const selfDisabled = ref(false)
        const _disabled = computed(()=>{
            if(props.autoSelfDisabled){
                return selfDisabled.value
            }
            if(selfDisabled.value){
                return true
            }else{
                return props.disabled
            }
        })
        const onClick = () => {
            props.onClick?.();
            selfDisabled.value = true;
            setTimeout(() => {
                selfDisabled.value = false; 
            }, 400);
        }
       return ()=>(
        <button type={props.type} 
            onClick={onClick}
            disabled={_disabled.value}
            class={[s.button,s[props.level],s[props.theme],s[props.size]]}
            >
            {context.slots.default?.()}
        </button>
       )
    }
})