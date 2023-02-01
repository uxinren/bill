import { defineComponent} from "vue";
import { RouterLink } from "vue-router";
import s from "./First.module.scss";
import save from "../../assets/icons/save.svg";
export const First = defineComponent({
    setup(){
       return ()=>(
        <div class={s.wrapper}>
            <div class={s.card}>
                <img src={save} alt="存钱罐" />
                <h2>会挣钱<br/>还要会省钱</h2>
            </div>
            <div class={s.actions}>
                <RouterLink class={s.fake} to="/start">跳过</RouterLink>
                <RouterLink to="/welcome/2">下一页</RouterLink>
                <RouterLink to="/start">跳过</RouterLink>
            </div>
        </div>
       )
    }
})