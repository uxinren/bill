import { FunctionalComponent} from "vue";
import { RouterLink } from "vue-router";
import s from "./Welcome.module.scss";
import clock from "../../assets/icons/clock.svg";

export const Second: FunctionalComponent = () => {
    return <div class={s.card}>
            <svg>
                <use xlinkHref="#chart"></use>
            </svg>
            <h2>每日提醒<br />不遗漏每一笔账单</h2>
        </div>
}

Second.displayName = 'Second'