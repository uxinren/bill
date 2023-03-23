import { defineComponent} from 'vue';
import { Charts } from '../components/statistics/Charts';
import { TimeTabsLayout } from '../layouts/TimeTabsLayout';
export const StatisticsPage = defineComponent({
  setup:(props,context)=>{
   
    return ()=>(
        <TimeTabsLayout onUpdateSelectedTab={true} component={Charts} hideThisYear={true}/>
    )
  }
})