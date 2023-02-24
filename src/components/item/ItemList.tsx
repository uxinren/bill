import { defineComponent,PropType, ref} from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from '../../shared/Tabs';
import s from './ItemList.module.scss';
import { ItemSummary } from './ItemSummary';
export const ItemList = defineComponent({
    props:{
      name:{
        type: String as PropType<string>
    }
  },
  setup:(props,context)=>{
    const refSelected = ref('本月')
    return ()=>(
      <MainLayout>{
        {
          title:()=>'彩虹记账',
          icon:()=><Icon name="menu" class={s.icon}/>,
          default:()=>(
            <Tabs classPrefix={'customTabs'} v-model:selected={refSelected.value}>
              <Tab name='本月'>
                <ItemSummary startDate='2000-01-01' endDate='2000-12-31' />
              </Tab>
              <Tab name='上月'>
                <ItemSummary  startDate='2000-01-01' endDate='2000-12-31' /> 
              </Tab>
              <Tab name='今年'>
                <ItemSummary  startDate='2000-01-01' endDate='2000-12-31' />
              </Tab>
              <Tab name='自定义时间'>
                <ItemSummary  startDate='2000-01-01' endDate='2000-12-31' />
              </Tab>
            </Tabs>
          )
        }
      }
      </MainLayout>
    )
  }
})