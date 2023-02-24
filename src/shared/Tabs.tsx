import { defineComponent,PropType} from 'vue';
import s from './Tabs.module.scss';
export const Tabs = defineComponent({
    props:{
      classPrefix:{
        type: String
      },
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
    const cp = props.classPrefix
    return <div class={[s.tabs , cp+'_tabs']}>
            <ol class={[s.tabs_nav, cp+'_tabs_nav']}>
              {tabs.map(item =><li class={[
                item.props?.name === props.selected?[s.selected , cp+'selected']:'',
                cp+'_tabs_nav_item'  
            ]}
              //另一种写法 onClick={()=>props.onUpdateSelected?.(item.props?.name)}
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