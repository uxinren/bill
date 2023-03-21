import { defineComponent} from 'vue';
import { useRoute } from 'vue-router';
import { MainLayout } from '../../layouts/MainLayout';
import { BackIcon } from '../../shared/BackIcon';
import { Button } from '../../shared/Button';
import s from './Tag.module.scss';
import { TagForm } from './TagForm';
export const TagEdit = defineComponent({
  setup:(props,context)=>{
    const route = useRoute()
    const numberId = parseInt(route.params.id!.toString())
    if(Number.isNaN(numberId)){
      return ()=>{
        <div>id不存在</div>
      }
    }
    return ()=>(
    <MainLayout>{{
        title:()=>'编辑标签',
        icon: ()=><BackIcon />,
        default:()=><>
            <TagForm id={numberId}/>
            <div class={s.action}>
              <Button level='danger' onClick={()=>{}}>标签删除</Button>
              <Button level='danger' onClick={()=>{}}>全部删除</Button>
            </div>
        </>
    }}</MainLayout>
    )
  }
})