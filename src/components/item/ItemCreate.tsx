import { defineComponent,PropType, ref} from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from '../../shared/Tabs';
import { InputPad } from './InputPad';
import s from './ItemCreate.module.scss';
export const ItemCreate = defineComponent({
    props:{
      name:{
        type: String as PropType<string>
    }
  },
  setup:(props,context)=>{
    const refKind = ref('支出')
    const refExpensesTags = ref([
      {id: 1 , name: '餐费' , sign:'￥' , category:'expenses'},
      {id: 2 , name: '打车' , sign:'￥' ,category:'expenses'},
      {id: 3 , name: '买零食' , sign:'￥' , category:'expenses'},
    ])
    const refIncomeTags = ref([
      {id: 4 , name: '工资' , sign:'￥', category:'income'},
      {id: 5 , name: '股票' , sign:'￥', category:'income'},
      {id: 6 , name: '基金' , sign:'￥', category:'income'},
    ])
    return ()=>(
        <MainLayout>{
            {
                title:()=>'记一笔',
                icon:()=><Icon name="left" class={s.icon}/>,
                default:()=><>
                    {/* <Tabs selected = {refKind.value} onUpdateSelected={name=> refKind.value = name}> */}
                    <Tabs v-model:selected={refKind.value}>
                      <Tab name="支出">
                        {refExpensesTags.value.map(tag=>{
                          return <span>{tag.name}</span>
                        })}
                      </Tab>
                      <Tab name="收入">
                      {refIncomeTags.value.map(tag=>{
                          return <span>{tag.name}</span>
                        })}
                      </Tab>
                    </Tabs>
                    <div class={s.inputPad_wrapper}>
                      <InputPad/>
                    </div>
                </>
            }   
            }</MainLayout>
    )
  }
})