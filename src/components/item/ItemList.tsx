import { Overlay } from 'vant';
import { defineComponent,PropType, reactive, ref, watchEffect} from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import { Form, FormItem } from '../../shared/Form';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from '../../shared/Tabs';
import { Time } from '../../shared/time';
import s from './ItemList.module.scss';
import { ItemSummary } from './ItemSummary';
export const ItemList = defineComponent({
  setup:(props,context)=>{
    const time = new Time();
    const customTime = reactive({
      //format()方法返回一个字符串，表示当前时间的格式化
      start:new Time().format(),
      end: new Time().format()
    })
    const timeList = [
      {start:time.firstDayOfMonth(), end: time.lastDayOfMonth()},
      {start:time.add(-1,'month').firstDayOfMonth(),end:time.add(-1,'month').lastDayOfMonth()},
      {start:time.firstDayOfYear(), end: time.lastDayOfYear()}
    ]
    const refSelected = ref('本月')
    watchEffect(() => {
      if (refSelected.value === '自定义时间') {
        refOverlayVisible.value = true
      }
    })
    const refOverlayVisible = ref(false)
    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault()
      refOverlayVisible.value = false
    }
    return ()=>(
      <MainLayout>{
        {
          title:()=>'彩虹记账',
          icon:()=><Icon name="menu" class={s.icon}/>,
          default:()=><>
            <Tabs classPrefix={'customTabs'} v-model:selected={refSelected.value}>
              <Tab name='本月'>
                <ItemSummary startDate={timeList[0].start.format()} endDate={timeList[0].end.format()} />
              </Tab>
              <Tab name='上月'>
                <ItemSummary  startDate={timeList[1].start.format()} endDate={timeList[1].end.format()} /> 
              </Tab>
              <Tab name='今年'>
                <ItemSummary  startDate={timeList[2].start.format()} endDate={timeList[2].end.format()} />
              </Tab>
              <Tab name='自定义时间'>
                <ItemSummary  startDate={customTime.start} endDate={customTime.end} />
              </Tab>
            </Tabs>
            <Overlay show={refOverlayVisible.value} class={s.overlay}>
              <div class={s.overlay_inner}>
                <header>请选择时间</header>
                <Form onSubmit={onSubmitCustomTime}>
                    <FormItem label='开始时间' v-model={customTime.start} type='date' />
                    <FormItem label='结束时间' v-model={customTime.end} type='date' />
                    <div class={s.submit}>
                     <Button type='button' size='small' theme='text'>取消</Button>
                     <Button type='submit' size='small' theme='text'>确定</Button>
                    </div>
                  </Form>
              </div>
            </Overlay>
          </>
        }
      }
      </MainLayout>
    )
  }
})