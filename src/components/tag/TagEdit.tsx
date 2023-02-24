import { defineComponent} from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import { Icon } from '../../shared/Icon';
import s from './Tag.module.scss';
import { TagForm } from './TagForm';
export const TagEdit = defineComponent({

  setup:(props,context)=>{
    return ()=>(
    <MainLayout>{{
        title:()=>'新建标签',
        icon:()=><Icon name='left' onClick={()=>{}}/>,
        default:()=><>
            <TagForm />
            <div class={s.action}>
              <Button level='danger' onClick={()=>{}}>标签删除</Button>
              <Button level='danger' onClick={()=>{}}>全部删除</Button>
            </div>
        </>
    }}</MainLayout>
    )
  }
})