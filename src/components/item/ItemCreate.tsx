import { defineComponent,PropType} from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import s from './ItemCreate.module.scss';
export const ItemCreate = defineComponent({
    props:{
      name:{
        type: String as PropType<'add'|'chart'|'clock'|'cloud'>
    }
  },
  setup:(props,context)=>{
    return ()=>(
        <MainLayout>{
            {
                title:()=>'记一笔',
                icon:()=><Icon name="left" class={s.icon}/>,
                default:()=><>
                    <div>main</div>
                </>
            }   
            }</MainLayout>
    )
  }
})