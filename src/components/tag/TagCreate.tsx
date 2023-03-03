import { defineComponent,PropType} from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { TagForm } from './TagForm';
export const TagCreate = defineComponent({
    props:{
      name:{
        type: String as PropType<string>
    }
  },
  setup:(props,context)=>{
    return ()=>(
    <MainLayout>{{
        title:()=>'新建标签',
        icon:()=><Icon name='left' onClick={()=>{}}/>,
        default:()=><>
            <TagForm />
        </>
    }}</MainLayout>
    )
  }
})