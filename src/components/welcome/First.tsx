import { defineComponent} from "vue";
import { RouterLink } from "vue-router";
import s from "./First.module.scss";
import save from "../../assets/icons/save.svg";
import {WelcomeLayout } from "./WelcomeLayout";
export const First = defineComponent({
    setup:(props,context)=>{
        const slots = {
            icon: ()=><img src={save} alt="存钱罐" />,
            title:()=><h2>会挣钱<br/>还要会省钱</h2>,
            button:()=><>
                <RouterLink class={s.fake} to="/start">跳过</RouterLink>
                <RouterLink to="/welcome/2">下一页</RouterLink>
                <RouterLink to="/start">跳过</RouterLink>
            </>
        }
       return ()=>(
        <WelcomeLayout v-slots={slots}></WelcomeLayout>
       )
    }
})
