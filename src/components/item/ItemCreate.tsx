import { defineComponent,PropType} from 'vue';
import s from './ItemCreate.module.scss';
export const ItemCreate = defineComponent({
    props:{
      name:{
        type: String as PropType<'add'|'chart'|'clock'|'cloud'>
    }
  },
  setup:(props,context)=>{
    return ()=>(
    <div>create</div>
    )
  }
})