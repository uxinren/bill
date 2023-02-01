import { defineComponent} from "vue";
import { RouterLink } from "vue-router";
import s from "./First.module.scss";
import cloud from "../../assets/icons/cloud.svg";
import { WelcomeLayout } from "./WelcomeLayout";

export const Forth = defineComponent({
    setup:(props,context)=>{
        return ()=>(
         <WelcomeLayout>
             {{
                 icon:()=><img src={cloud} alt="云备份" />,
                 title:()=><h2>云备份<br/>再也不怕数据丢失</h2>,
                 button:<>
                   <RouterLink class={s.fake} to="/start">跳过</RouterLink>
                   <RouterLink to="/start">完成</RouterLink>
                   <RouterLink class={s.fake} to="/start">跳过</RouterLink>
                 </>
             }}
         </WelcomeLayout>
        )
     }
})