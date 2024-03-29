import { defineComponent} from 'vue';
import { TimeTabsLayout } from '../../layouts/TimeTabsLayout';
import { hasError } from '../../shared/validate';
import { ItemSummary } from './ItemSummary';
export const ItemList = defineComponent({
  setup:(props,context)=>{
    return ()=>(
      <TimeTabsLayout component={ItemSummary}/>
    )
  }
})