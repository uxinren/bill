import { defineComponent,PropType} from 'vue';
import s from './ItemList.module.scss';
export const ItemList = defineComponent({
    props:{
      name:{
        type: String as PropType<'add'|'chart'|'clock'|'cloud'>
    }
  },
  setup:(props,context)=>{
    return ()=>(
    <div>list</div>
    )
  }
})