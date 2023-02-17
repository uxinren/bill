import { defineComponent} from 'vue';
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