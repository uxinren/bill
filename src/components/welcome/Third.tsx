import { FunctionalComponent} from "vue";
import { RouterLink } from "vue-router";
import s from "./Welcome.module.scss";
import chart from "../../assets/icons/chart.svg";

export const Third: FunctionalComponent = () => {
    return <div class={s.card}>
            <svg>
                <use xlinkHref="#cloud"></use>
            </svg>
            <h2>会挣钱<br/>还要会省钱</h2>
        </div>
}

Third.displayName = 'Third'
