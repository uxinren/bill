import { defineComponent,PropType} from 'vue';
import s from './Tabs.module.scss';
export const Tabs = defineComponent({
    props:{
      selected:{
        type: String as PropType<string>
    },
    onUpdateSelected:{
        type: Function as PropType<(name:string)=>void>
    }
  },
  setup:(props,context)=>{
   
    return ()=>{
    const tabs = context.slots.default?.()
    if(!tabs) return ()=>null
    for (let i = 0; i < tabs.length; i++){
        if(tabs[i].type !== Tab ){
            throw new Error("Tabs只接受Tab子组件")
        }
    }
    return <div class={s.tabs}>
            <ol class={s.tabs_nav}>
                {tabs.map(item =><li class={item.props?.name === props.selected?s.selected:''}
                // onClick={()=>props.onUpdateSelected?.(item.props?.name)}
                onClick={()=>context.emit('update:selected', item.props?.name)}
                >
                    {item.props?.name}
                </li>)}
            </ol>
            <div>
                {tabs.find(item => item.props?.name === props.selected)}
            </div>
    </div>
    }
  }
})


import c from './Tab.module.scss';
export const Tab = defineComponent({
    props:{
      name:{
        type: String as PropType<string>
    }
  },
  setup:(props,context)=>{
    return ()=>(
    <div>{context.slots.default?.()}</div>
    )
  }
})