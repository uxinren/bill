import { defineComponent,PropType} from 'vue';
import { RouterLink } from 'vue-router';
import { Button } from '../shared/Button';
import { Center } from '../shared/Center';
import { Icon } from '../shared/Icon';
import { Navbar } from '../shared/Navbar';
import s from './MainLayout.module.scss';
export const MainLayout = defineComponent({
  setup:(props,context)=>{
    return ()=>(
    <div>
        <nav class={s.nav_wrapper}>
                <Navbar>{
                    {default:()=>context.slots.title?.(),
                    icon:()=>context.slots.icon?.() }
                }
                </Navbar>
        </nav>
        {context.slots.default?.()}
    </div>
    )
  }
})