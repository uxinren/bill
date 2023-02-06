import { FunctionalComponent} from "vue";
import s from "./Welcome.module.scss";

export const Forth: FunctionalComponent = () => {
    return <div class={s.card}>
            <svg>
                <use xlinkHref="#clock"></use>
            </svg>
            <h2>每日提醒<br />不遗漏每一笔账单</h2>
        </div>
}

Forth.displayName = 'Forth'