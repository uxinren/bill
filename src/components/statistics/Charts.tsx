import { defineComponent,PropType, ref} from 'vue';
import { FormItem } from '../../shared/Form';
import s from './Charts.module.scss';
import { LineCharts } from './lineCharts';
import { PieCharts } from './PieCharts';
import { Bars } from './Bars';

export const Charts = defineComponent({
    props:{
      startDate:{
          type: String as PropType<string>,
          required:false
      },
      endDate:{
          type: String as PropType<string>,
          required:false
      }
    },
  setup:(props,context)=>{
    const category = ref('expenses')


    return ()=>(
    <div class={s.wrapper}>
        <FormItem label='类型' v-model={category.value} 
        type='select' class={s.formItem}
        options={[
            {value:'expenses',text:'支出'},
            {value:'income',text:'收入'}
        ]}
        />  

        <LineCharts /> 
        <PieCharts />
        <Bars />
    </div>
    )
  }
})