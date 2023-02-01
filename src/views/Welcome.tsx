import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import s from "./Welcome.module.scss"
import  logo from "../assets/icons/rainbow.svg"
export const Welcome = defineComponent({
    setup(props, context) {
       return ()=>
        <div class={s.wrapper}>
            <header>
                <div class={s.logo}>
                    <img src={logo} alt="logo" />
                </div>
                <h1>彩虹记账</h1>
            </header>
            <main class={s.main}><RouterView/></main>
       </div>
    }
})